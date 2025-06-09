from datetime import datetime, timedelta
import sys
import os
import pytz
import math
from app import db
from sqlalchemy import func, case, text, and_, select, or_, literal
from sqlalchemy.orm import aliased
from decimal import Decimal
from app.models.processOption import ProcessOption
from app.models.process import Process
from app.models.product import Product
from app.models.productionSchedule import ProductionSchedule
from app.models.productionScheduleOngoing import ProductionScheduleOngoing
from app.models.productionReport import ProductionReport
from app.models.machineStatus import MachineStatus
from app.models.machine import Machine  # Import Machine model
from app.api.option.optionEnum import MachineStatusEnum, WorkOrderStatusEnum
from app.utils_log import message, err_resp, internal_err_resp
from .schemas import (TodayWorkOrderSchema, OverdueWorkOrderSchema, MachineAccumulatedTimeSchema, 
MachineOfflineEventSchema, TodayWorkOrderWithProcess, MachineStatusHoursStatisticsSchema)
TZ = os.getenv("TIMEZONE","Asia/Taipei")


class DashboardService:
    @staticmethod
    def get_todayWorkOrder():
        try:
            # Query the database to fetch the required fields from the specified tables
            current_time = datetime.now(pytz.timezone(TZ))
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)
            next_day = current_time + timedelta(days=1)
            # main query
            query = ProductionSchedule.query
            query = query.with_entities(ProductionSchedule.machineSN, ProductionSchedule.workOrderSN, 
                                        ProductionSchedule.planFinishDate, ProductionReport.productionQuantity, ProductionSchedule.status,
                                        Product.productSN, Product.productName, ProcessOption.processName)
            # Joins
            query = query.outerjoin(ProductionReport, ProductionSchedule.productId == ProductionReport.pschedule_id) # left outer join
            query = query.outerjoin(Product, ProductionSchedule.productId == Product.id) # left outer join
            query = query.outerjoin(Process, ProductionSchedule.processId == Process.id) # left outer join
            query = query.outerjoin(ProcessOption, Process.processOptionId == ProcessOption.id) # left outer join
            # Filters
            query = query.filter(ProductionSchedule.planOnMachineDate >= midnight)
            query = query.filter(ProductionSchedule.planOnMachineDate < next_day)
            today_work_orders = query.all()
            
            today_work_order_dump = TodayWorkOrderSchema().dump(today_work_orders, many=True)
            resp = message(True, "dashboard data sent")
            resp["data"] = today_work_order_dump
            return resp, 200

        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    @staticmethod
    def get_overdueWorkOrder():
        try:
            # Query the database to fetch the required fields from the specified tables
            # main query
            query = ProductionSchedule.query
            query = query.with_entities(ProductionSchedule.machineSN, ProductionSchedule.workOrderSN, 
                                        ProductionSchedule.planFinishDate, ProductionReport.unfinishedQuantity, 
                                        Product.productSN)
            # Joins
            query = query.outerjoin(ProductionReport, ProductionSchedule.productId == ProductionReport.pschedule_id) # left outer join
            query = query.outerjoin(Product, ProductionSchedule.productId == Product.id) # left outer join
            query = query.outerjoin(Process, ProductionSchedule.processId == Process.id) # left outer join
            query = query.outerjoin(ProcessOption, Process.processOptionId == ProcessOption.id) # left outer join
            # Filters
            # 列出所有預計完成日前七天或者過了預計完成日還沒完成的的製令單。
            query = query.filter(ProductionSchedule.status != WorkOrderStatusEnum.CANCEL.value)
            query = query.filter(ProductionSchedule.status != WorkOrderStatusEnum.DONE.value)
            query = query.filter(ProductionSchedule.planFinishDate.between(datetime.now(), datetime.now() + timedelta(days=7)) |
                                 ProductionSchedule.planFinishDate < datetime.now())
            overdue_work_orders = query.all()
            
            overdue_work_order_dump = OverdueWorkOrderSchema().dump(overdue_work_orders, many=True)
            resp = message(True, "dashboard data sent")
            resp["data"] = overdue_work_order_dump
            return resp, 200

        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    @staticmethod
    def get_machineAccumulatedTime():
        """從machineStatus資料表中取得當天的設備即時狀態，並計算上模與調機/機台停機/產品試模時間累積。
        從productionScheduleOngoing資料表中取得當天的設備生產時間累積。
        當天目前時間 - 當天00:00:00時間 - 生產時間累積 - 非閒置時間累積 = 待機時間累積。

        Raises:
            error: _description_

        Returns:
            _type_: _description_
        """
        try:
            # Current time
            current_time = datetime.now(pytz.timezone(TZ))
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)

            # Define the CTE for LatestStatus
            latest_status_cte = (
                select(
                    MachineStatus.machineId,
                    MachineStatus.status,
                    func.row_number().over(
                        partition_by=MachineStatus.machineId,
                        order_by=MachineStatus.actualStartDate.desc()
                    ).label('rn')
                )
                .where(
                    and_(
                        MachineStatus.actualStartDate >= midnight,
                        MachineStatus.actualStartDate.isnot(None),
                        MachineStatus.actualEndDate <= current_time,
                        MachineStatus.actualEndDate.isnot(None)
                    )
                )
                .cte(name='LatestStatus')
            )

            # Alias for the CTE
            ls = latest_status_cte.alias('ls')

            # Subquery for runTime from productionScheduleOngoing
            run_time_subquery = (
                select(
                    ProductionSchedule.machineSN,
                    func.sum(
                        func.timestampdiff(text('SECOND'), ProductionScheduleOngoing.startTime, ProductionScheduleOngoing.endTime)
                    ).label('run_time_seconds')
                )
                .join(
                    ProductionSchedule,
                    ProductionScheduleOngoing.productionScheduleId == ProductionSchedule.id
                )
                .where(
                    and_(
                        ProductionScheduleOngoing.startTime >= midnight,
                        ProductionScheduleOngoing.startTime.isnot(None),
                        ProductionScheduleOngoing.endTime <= current_time,
                        ProductionScheduleOngoing.endTime.isnot(None)
                    )
                )
                .group_by(ProductionSchedule.machineSN)
                .subquery('run_time')
            )

            # Subquery for non-idle seconds from machineStatus (tuning, offline, testing)
            non_idle_subquery = (
                select(
                    MachineStatus.machineId,
                    func.sum(
                        case(
                            (MachineStatus.status == MachineStatusEnum.TUNING.value, 
                            func.timestampdiff(text('SECOND'), MachineStatus.actualStartDate, MachineStatus.actualEndDate)),
                            (MachineStatus.status == MachineStatusEnum.OFFLINE.value, 
                            func.timestampdiff(text('SECOND'), MachineStatus.actualStartDate, MachineStatus.actualEndDate)),
                            (MachineStatus.status == MachineStatusEnum.TESTING.value, 
                            func.timestampdiff(text('SECOND'), MachineStatus.actualStartDate, MachineStatus.actualEndDate)),
                            else_=0
                        )
                    ).label('non_idle_seconds')
                )
                .where(
                    and_(
                        MachineStatus.actualStartDate >= midnight,
                        MachineStatus.actualStartDate.isnot(None),
                        MachineStatus.actualEndDate <= current_time,
                        MachineStatus.actualEndDate.isnot(None)
                    )
                )
                .group_by(MachineStatus.machineId)
                .subquery('non_idle')
            )

            # Main query
            query = (
                db.session.query(
                    Machine.id.label('machineId'),
                    Machine.machineSN,
                    func.date(midnight).label('status_date'),
                    func.sec_to_time(
                        func.coalesce(run_time_subquery.c.run_time_seconds, 0)
                    ).label('runTime'),
                    func.sec_to_time(
                        func.sum(
                            case(
                                (MachineStatus.status == MachineStatusEnum.TUNING.value, 
                                func.timestampdiff(text('SECOND'), MachineStatus.actualStartDate, MachineStatus.actualEndDate)),
                                else_=0
                            )
                        )
                    ).label('tuningTime'),
                    func.sec_to_time(
                        func.sum(
                            case(
                                (MachineStatus.status == MachineStatusEnum.OFFLINE.value, 
                                func.timestampdiff(text('SECOND'), MachineStatus.actualStartDate, MachineStatus.actualEndDate)),
                                else_=0
                            )
                        )
                    ).label('offlineTime'),
                    func.sec_to_time(
                        func.sum(
                            case(
                                (MachineStatus.status == MachineStatusEnum.TESTING.value, 
                                func.timestampdiff(text('SECOND'), MachineStatus.actualStartDate, MachineStatus.actualEndDate)),
                                else_=0
                            )
                        )
                    ).label('testingTime'),
                    func.sec_to_time(
                        func.greatest(
                            func.timestampdiff(text('SECOND'), midnight, current_time) - 
                            func.coalesce(run_time_subquery.c.run_time_seconds, 0) - 
                            func.coalesce(non_idle_subquery.c.non_idle_seconds, 0),
                            0
                        )
                    ).label('idleTime'),
                    ls.c.status.label('status')
                )
                .outerjoin(MachineStatus, Machine.id == MachineStatus.machineId)
                .outerjoin(run_time_subquery, Machine.machineSN == run_time_subquery.c.machineSN)
                .outerjoin(non_idle_subquery, Machine.id == non_idle_subquery.c.machineId)
                .outerjoin(ls, and_(Machine.id == ls.c.machineId, ls.c.rn == 1))
                # .filter(
                #     or_(
                #         MachineStatus.id.isnot(None),  # Include machines with MachineStatus records
                #         run_time_subquery.c.machineSN.isnot(None)  # Include machines with productionSchedule records
                #     )
                # )
                .group_by(
                    Machine.machineSN
                )
                .order_by(Machine.id)
            )

            # Execute the query and fetch results
            machine_accumulatedTime = query.all()
            machine_accumulatedTime_dump = MachineAccumulatedTimeSchema().dump(machine_accumulatedTime, many=True)
            resp = message(True, "dashboard data sent")
            resp["data"] = machine_accumulatedTime_dump
            return resp, 200
        except Exception as error:
            raise error
        
    
    @staticmethod
    def get_machineStatusProportion():
        try:
            # Current time
            current_time = datetime.now(pytz.timezone(TZ))
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)

            # Time from midnight to current time (used for per-machine idle time)
            day_seconds = Decimal((current_time - midnight).total_seconds())

            # Get all machines
            machines = db.session.query(Machine.id).all()
            if not machines:
                return message(True, "No machines found"), 200

            # Initialize aggregated status times
            total_status_times = {
                '生產中': Decimal('0'),
                '上模與調機': Decimal('0'),
                '機台停機': Decimal('0'),
                '產品試模': Decimal('0'),
                '待機中': Decimal('0')
            }

            # Process each machine
            for machine_id, in machines:
                # Query production time for this machine
                production_time = (
                    db.session.query(
                        func.sum(
                            func.timestampdiff(text('SECOND'), ProductionScheduleOngoing.startTime, ProductionScheduleOngoing.endTime)
                        ).label('production_seconds')
                    )
                    .join(ProductionSchedule, ProductionScheduleOngoing.productionScheduleId == ProductionSchedule.id)
                    .join(Machine, ProductionSchedule.machineSN == Machine.machineSN)
                    .filter(
                        Machine.id == machine_id,
                        ProductionScheduleOngoing.startTime >= midnight,
                        ProductionScheduleOngoing.startTime < current_time,
                        ProductionScheduleOngoing.endTime > midnight,
                        ProductionScheduleOngoing.endTime <= current_time
                    )
                    .scalar() or Decimal('0')
                )

                # Query machine status times for this machine
                machine_status_times = (
                    db.session.query(
                        MachineStatus.status,
                        func.sum(
                            func.timestampdiff(text('SECOND'), MachineStatus.actualStartDate, MachineStatus.actualEndDate)
                        ).label('status_seconds')
                    )
                    .filter(
                        MachineStatus.machineId == machine_id,
                        MachineStatus.actualStartDate >= midnight,
                        MachineStatus.actualStartDate < current_time,
                        MachineStatus.actualEndDate > midnight,
                        MachineStatus.actualEndDate <= current_time
                    )
                    .group_by(MachineStatus.status)
                    .all()
                )

                # Initialize status times for this machine
                status_times = {
                    '生產中': production_time,
                    '上模與調機': Decimal('0'),
                    '機台停機': Decimal('0'),
                    '產品試模': Decimal('0'),
                    '待機中': Decimal('0')
                }

                # Update status times from machineStatus
                for status, seconds in machine_status_times:
                    if status in status_times:
                        status_times[status] = seconds if seconds is not None else Decimal('0')

                # Calculate idle time for this machine
                used_seconds = status_times['生產中'] + status_times['上模與調機'] + status_times['機台停機'] + status_times['產品試模']
                idle_seconds = day_seconds - used_seconds
                if idle_seconds < 0:
                    idle_seconds = Decimal('0')  # Clamp to zero if negative
                status_times['待機中'] = idle_seconds

                # Add to total status times
                for status, seconds in status_times.items():
                    total_status_times[status] += seconds

            # Calculate total seconds for proportion denominator
            total_seconds = sum(total_status_times.values())

            # Calculate proportions
            proportions = {
                status: (seconds / total_seconds * 100) if total_seconds > 0 else Decimal('0')
                for status, seconds in total_status_times.items()
            }

            # Round to one decimal place
            proportions = {status: round(float(proportion), 1) for status, proportion in proportions.items()}

            # Prepare result list with hours
            result_list = [
                {"status": "生產", "percentage": proportions.get('生產中', 0.0), "hours": math.ceil(float(total_status_times['生產中'] / Decimal('3600')))},
                {"status": "上模與調機", "percentage": proportions.get('上模與調機', 0.0), "hours": math.ceil(float(total_status_times['上模與調機'] / Decimal('3600')))},
                {"status": "機台停機", "percentage": proportions.get('機台停機', 0.0), "hours": math.ceil(float(total_status_times['機台停機'] / Decimal('3600')))},
                {"status": "產品試模", "percentage": proportions.get('產品試模', 0.0), "hours": math.ceil(float(total_status_times['產品試模'] / Decimal('3600')))},
                {"status": "待機", "percentage": proportions.get('待機中', 0.0), "hours": math.ceil(float(total_status_times['待機中'] / Decimal('3600')))}
            ]

            resp = message(True, "dashboard data sent")
            resp["data"] = result_list
            return resp, 200
        except Exception as error:
            raise error
    

    @staticmethod
    def get_machineOfflineEvent():
        try:
            # 從MachineStatus資料表找出當天所有狀態為"機台停機"的記錄
            current_time = datetime.now(pytz.timezone(TZ))
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)

            query = (
                db.session.query(
                    MachineStatus.actualStartDate,
                    Machine.machineSN,
                    MachineStatus.reason
                )
                .join(Machine, MachineStatus.machineId == Machine.id)
                .filter(
                    MachineStatus.status == MachineStatusEnum.OFFLINE.value,
                    MachineStatus.actualStartDate >= midnight
                )
            )
            machine_offline_events = query.all()
            
            machine_offline_events_dump = MachineOfflineEventSchema().dump(machine_offline_events, many=True)
            resp = message(True, "dashboard data sent")
            resp["data"] = machine_offline_events_dump
            return resp, 200
        except Exception as error:
            raise error
        
    
    @staticmethod
    def get_currentMachineStatusCount():
        try:
            current_time = datetime.now(pytz.timezone(TZ))
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)
            # 從ProductionScheduleOngoin資料表找出當天所有生產中的製令單數量
            query = (
                db.session.query(
                    literal("生產中").label("status"),
                    func.count(ProductionSchedule.machineSN).label('count')
                )
                .select_from(ProductionScheduleOngoing)
                .join(ProductionSchedule, ProductionScheduleOngoing.productionScheduleId == ProductionSchedule.id)
                .filter(
                    ProductionSchedule.status == WorkOrderStatusEnum.ON_GOING.value,
                    ProductionScheduleOngoing.startTime >= midnight,
                    ProductionScheduleOngoing.endTime.is_(None)  # Only count ongoing production schedules
                )
                .group_by(ProductionSchedule.machineSN)
            )
            production_schedule_counts = query.all()

            # 從MachineStatus資料表找出當天所有狀態的機台數量
            query = (
                db.session.query(
                    MachineStatus.status,
                    func.count(MachineStatus.machineId).label('count')
                )
                .select_from(MachineStatus)
                .join(Machine, MachineStatus.machineId == Machine.id)
                .filter(
                    MachineStatus.actualStartDate >= midnight,
                    MachineStatus.actualEndDate.is_(None)  # Only count machines that are currently active
                )
                .group_by(MachineStatus.status)
            )
            machine_status_counts = query.all()
            
            # 從Machine資料表找出所有機台數量
            all_machines = (
                db.session.query(Machine.machineSN)
                .filter(Machine.machineSN.isnot(None))
                .all()
            )
            all_machines_count = len(all_machines)
            
            # 待機機台 = 所有機台數量 - 生產機台數 - 其他狀態機台數
            production_machine_count = sum(count for status, count in production_schedule_counts)
            other_status_counts = sum(count for status, count in machine_status_counts)
            idle_machine_count = all_machines_count - production_machine_count - other_status_counts
            # 如果待機機台數量小於0，則設為0    
            idle_machine_count = idle_machine_count if idle_machine_count > 0 else 0
            # 將待機機台數量加入到機台狀態統計中
            machine_status_counts.append((MachineStatusEnum.RUN.value, production_machine_count))
            machine_status_counts.append((MachineStatusEnum.IDLE.value, idle_machine_count))

            # Convert the result to a list of dictionaries
            machine_status_counts_dump = [
                {"status": status, "count": count} for status, count in machine_status_counts
            ]
            resp = message(True, "dashboard data sent")
            resp["data"] = machine_status_counts_dump
            return resp, 200
        except Exception as error:
            raise error
    
    
    @staticmethod
    def get_todayWorkOrderWithProcess():
        try:
            current_time = datetime.now(pytz.timezone(TZ))
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)
            next_day = current_time + timedelta(days=1)
            """
            WITH ps as (
            SELECT productionSchedule.id, productionSchedule.workOrderSN, productionSchedule.planOnMachineDate, processOption.processName, product.productName
            FROM productionSchedule
            LEFT OUTER JOIN product ON productionSchedule.productId = product.id
            LEFT OUTER JOIN process ON productionSchedule.processId = process.id
            LEFT OUTER JOIN processOption ON process.processOptionId = processOption.id
            WHERE productionSchedule.workOrderSN in (
            SELECT workOrderSN FROM productionSchedule WHERE status = 'On-going'
            )
            )
            SELECT
            p1.workOrderSN,
            COALESCE(p1.processName, 'N/A') AS 'P1',
            COALESCE(p2.processName, 'N/A') AS 'P2'
            FROM
            ps p1
            LEFT JOIN
            ps p2
            ON p1.workOrderSN = p2.workOrderSN
            AND p1.planOnMachineDate < p2.planOnMachineDate
            WHERE
            p1.planOnMachineDate = (
            SELECT MIN(planOnMachineDate)
            FROM ps p3
            WHERE p3.workOrderSN = p1.workOrderSN
            )
            ORDER BY
            p1.id;    
            """
            
            # Step 1: Subquery (ps) with required joins and filter
            ps_subq = db.session.query(
                ProductionSchedule.id,
                ProductionSchedule.workOrderDate,
                ProductionSchedule.workOrderSN,
                ProductionSchedule.workOrderQuantity,
                ProductionSchedule.planOnMachineDate,
                ProductionSchedule.planFinishDate,
                ProductionSchedule.status,
                ProcessOption.processName,
                Product.productName
            ).outerjoin(
                Product, ProductionSchedule.productId == Product.id
            ).outerjoin(
                Process, ProductionSchedule.processId == Process.id
            ).outerjoin(
                ProcessOption, Process.processOptionId == ProcessOption.id
            ).filter(
                ProductionSchedule.workOrderSN.in_(
                    select(ProductionSchedule.workOrderSN).distinct().filter(
                        ProductionSchedule.planOnMachineDate >= midnight,
                        ProductionSchedule.planOnMachineDate < next_day,
                    )
                )
            ).subquery('ps')

            # Step 2: Aliases for self-join
            ps1 = aliased(ps_subq)
            ps2 = aliased(ps_subq)

            # Step 3: Main query with self-join and COALESCE
            min_plan_date_subq = db.session.query(
                ps1.c.workOrderSN,
                func.min(ps1.c.planOnMachineDate).label('min_planOnMachineDate')
            ).group_by(ps1.c.workOrderSN).subquery('min_plan_date')

            main_query = db.session.query(
                ps1.c.workOrderDate,
                ps1.c.workOrderSN,
                ps1.c.workOrderQuantity,
                ps1.c.productName,
                ps1.c.planFinishDate,
                ps1.c.status,
                func.coalesce(ps1.c.processName, 'N/A').label('processOne'),
                func.coalesce(ps2.c.processName, 'N/A').label('processTwo')
            ).outerjoin(
                ps2,
                (ps1.c.workOrderSN == ps2.c.workOrderSN) & (ps1.c.planOnMachineDate < ps2.c.planOnMachineDate)
            ).join(
                min_plan_date_subq,
                (ps1.c.workOrderSN == min_plan_date_subq.c.workOrderSN) &
                (ps1.c.planOnMachineDate == min_plan_date_subq.c.min_planOnMachineDate)
            ).order_by(ps1.c.id)

            today_work_order_with_process = main_query.all()
            today_work_order_with_process_dump = TodayWorkOrderWithProcess().dump(today_work_order_with_process, many=True)
            resp = message(True, "dashboard data sent")
            resp["data"] = today_work_order_with_process_dump
            return resp, 200
        except Exception as error:
            raise error


    @staticmethod
    def get_machineOfflineReasonProportion():
        try:
            # Current time
            current_time = datetime.now(pytz.timezone(TZ))
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)
            next_day = current_time + timedelta(days=1)

            # 查詢 status 為 '機台停機' 的記錄，並計算各種停機原因的總停機時間
            query = db.session.query(
                MachineStatus.reason.label('reason'),
                db.func.round(
                    db.func.sum(
                        db.func.timestampdiff(
                            db.text('MINUTE'), 
                            MachineStatus.actualStartDate, 
                            MachineStatus.actualEndDate
                        )
                    ) / 60.0, 2).label('hours')
            ).filter(
                MachineStatus.status == MachineStatusEnum.OFFLINE.value,
                MachineStatus.reason.isnot(None),
                MachineStatus.actualStartDate >= midnight,
                MachineStatus.actualEndDate <= next_day
            ).group_by(
                MachineStatus.reason
            ).order_by(
                db.desc('hours')
            )
            
            machine_offline_reason = query.all()

            result_list = [
                {
                    'reason': result.reason,
                    'hours': float(result.hours)
                }
                for result in machine_offline_reason
            ]

            resp = message(True, "dashboard data sent")
            resp["data"] = result_list
            return resp, 200
        except Exception as error:
            raise error
        

    @staticmethod
    def get_machineStatusHoursStatistics():
        try:
            # Current time
            current_time = datetime.now(pytz.timezone(TZ))
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)

            # Time from midnight to current time (used for per-machine idle time)
            day_seconds = Decimal((current_time - midnight).total_seconds())

            # Get all machines
            machines = db.session.query(Machine.id).all()
            if not machines:
                return message(True, "No machines found"), 200

            # Initialize aggregated status times
            result_list = []    

            # Process each machine
            for machine_id, in machines:
                # Query production time for this machine
                production_time = (
                    db.session.query(
                        func.sum(
                            func.timestampdiff(text('SECOND'), ProductionScheduleOngoing.startTime, ProductionScheduleOngoing.endTime)
                        ).label('production_seconds')
                    )
                    .join(ProductionSchedule, ProductionScheduleOngoing.productionScheduleId == ProductionSchedule.id)
                    .join(Machine, ProductionSchedule.machineSN == Machine.machineSN)
                    .filter(
                        Machine.id == machine_id,
                        ProductionScheduleOngoing.startTime >= midnight,
                        ProductionScheduleOngoing.startTime < current_time,
                        ProductionScheduleOngoing.endTime > midnight,
                        ProductionScheduleOngoing.endTime <= current_time
                    )
                    .scalar() or Decimal('0')
                )

                # Query machine status times for this machine
                machine_status_times = (
                    db.session.query(
                        MachineStatus.status,
                        func.sum(
                            func.timestampdiff(text('SECOND'), MachineStatus.actualStartDate, MachineStatus.actualEndDate)
                        ).label('status_seconds')
                    )
                    .filter(
                        MachineStatus.machineId == machine_id,
                        MachineStatus.actualStartDate >= midnight,
                        MachineStatus.actualStartDate < current_time,
                        MachineStatus.actualEndDate > midnight,
                        MachineStatus.actualEndDate <= current_time
                    )
                    .group_by(MachineStatus.status)
                    .all()
                )

                print(f"Machine ID: {machine_id}, Production Time: {production_time}, Machine Status Times: {machine_status_times}", file=sys.stderr)

                # Initialize status times for this machine
                status_times = {
                    'machineSN': str(''),
                    MachineStatusEnum.RUN.value: production_time,
                    MachineStatusEnum.TUNING.value: Decimal('0'),
                    MachineStatusEnum.OFFLINE.value: Decimal('0'),
                    MachineStatusEnum.TESTING.value: Decimal('0'),
                    MachineStatusEnum.IDLE.value: Decimal('0')
                }

                # Update status times from machineStatus
                for status, seconds in machine_status_times:
                    if status in status_times:
                        status_times[status] = seconds if seconds is not None else Decimal('0')

                # Calculate idle time for this machine
                used_seconds = status_times[MachineStatusEnum.RUN.value] + status_times[MachineStatusEnum.TUNING.value] + status_times[MachineStatusEnum.OFFLINE.value] + status_times[MachineStatusEnum.TESTING.value]
                idle_seconds = day_seconds - used_seconds
                if idle_seconds < 0:
                    idle_seconds = Decimal('0')  # Clamp to zero if negative
                status_times[MachineStatusEnum.IDLE.value] = idle_seconds

                result_list.append({
                    'machineSN': Machine.query.filter(Machine.id == machine_id).first().machineSN,
                    'run': round(status_times[MachineStatusEnum.RUN.value]/ Decimal('3600'), 1),
                    'idle': round(status_times[MachineStatusEnum.IDLE.value]/ Decimal('3600'), 1),
                    'tuning': round(status_times[MachineStatusEnum.TUNING.value]/ Decimal('3600'), 1),
                    'testing': round(status_times[MachineStatusEnum.TESTING.value]/ Decimal('3600'), 1),
                    'offline': round(status_times[MachineStatusEnum.OFFLINE.value]/ Decimal('3600'), 1)
                })

            machine_status_hours_statistics_dump = MachineStatusHoursStatisticsSchema().dump(result_list, many=True)

            resp = message(True, "dashboard data sent")
            resp["data"] = machine_status_hours_statistics_dump
            return resp, 200
        except Exception as error:
            raise error
        
    
    @staticmethod
    def get_machineUtilizationStatistics():
        try:
            # Current time
            current_time = datetime.now(pytz.timezone(TZ))
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)

            # Time from midnight to current time (used for per-machine idle time)
            day_seconds = Decimal((current_time - midnight).total_seconds())

            # Get all machines
            machines = db.session.query(Machine.id).all()
            if not machines:
                return message(True, "No machines found"), 200
            
            # Initialize aggregated status times
            total_status_times = {
                '生產中': Decimal('0'),
                '上模與調機': Decimal('0'),
                '機台停機': Decimal('0'),
                '產品試模': Decimal('0'),
                '待機中': Decimal('0')
            }
            
            # Process each machine
            for machine_id, in machines:
                # Query production time for this machine
                production_time = (
                    db.session.query(
                        func.sum(
                            func.timestampdiff(text('SECOND'), ProductionScheduleOngoing.startTime, 
                                               func.coalesce(ProductionScheduleOngoing.endTime, func.now()))
                        ).label('production_seconds')
                    )
                    .join(Machine, ProductionSchedule.machineSN == Machine.machineSN)
                    .filter(
                        Machine.id == machine_id,
                        ProductionScheduleOngoing.startTime >= midnight,
                        ProductionScheduleOngoing.startTime < current_time
                    )
                    .scalar() or Decimal('0')
                )

                # Query machine status times for this machine
                machine_status_times = (
                    db.session.query(
                        MachineStatus.status,
                        func.sum(
                            func.timestampdiff(text('SECOND'), MachineStatus.actualStartDate, MachineStatus.actualEndDate)
                        ).label('status_seconds')
                    )
                    .filter(
                        MachineStatus.machineId == machine_id,
                        MachineStatus.actualStartDate >= midnight,
                        MachineStatus.actualStartDate < current_time,
                        MachineStatus.actualEndDate > midnight,
                        MachineStatus.actualEndDate <= current_time
                    )
                    .group_by(MachineStatus.status)
                    .all()
                )

                # Initialize status times for this machine
                status_times = {
                    '生產中': production_time,
                    '上模與調機': Decimal('0'),
                    '機台停機': Decimal('0'),
                    '產品試模': Decimal('0'),
                    '待機中': Decimal('0')
                }

                # Update status times from machineStatus
                for status, seconds in machine_status_times:
                    if status in status_times:
                        status_times[status] = seconds if seconds is not None else Decimal('0')

                # Calculate idle time for this machine
                used_seconds = status_times['生產中'] + status_times['上模與調機'] + status_times['機台停機'] + status_times['產品試模']
                idle_seconds = day_seconds - used_seconds
                if idle_seconds < 0:
                    idle_seconds = Decimal('0')  # Clamp to zero if negative
                status_times['待機中'] = idle_seconds

                # Add to total status times
                for status, seconds in status_times.items():
                    total_status_times[status] += seconds

            # 1.「稼動時間 」=當天所有機台「生產時間 」(機)的總合
            # 2. 「稼動率」=「所有機台「生產中」時間」(機)/(「所有機台*24*60」(機)-「所有待機中的機台待機時間」(機)-「所有上模調機的時間」(機))*100%
            # 3.「生產機台數」=目前為「生產中」的機台數總合
            # 4.「停機次數」=累計當天所有機台「停機」的次數

            resp = message(True, "dashboard data sent")
            resp["data"] = None
            return resp, 200
        except Exception as error:
            raise error