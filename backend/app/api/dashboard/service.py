import copy
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

def _get_machineStatus_statistics(start_time, end_time) -> tuple:
    """取得所有機台在指定時間範圍內的狀態統計。

    Args:
        start_time (_type_): _description_
        end_time (_type_): _description_

    Returns:
        tuple: 包含機台列表和每個機台的狀態時間統計。
    """
    # Time from midnight to current time (used for per-machine idle time)
    day_seconds = Decimal((end_time - start_time).total_seconds())

    # Get all machines
    machines = db.session.query(Machine.id).all()
    if not machines:
        return message(True, "No machines found"), 200
    
    # 統計所有機台的狀態時間
    total_status_times = {
        MachineStatusEnum.RUN.value: Decimal('0'),
        MachineStatusEnum.TUNING.value: Decimal('0'),
        MachineStatusEnum.OFFLINE.value: Decimal('0'),
        MachineStatusEnum.TESTING.value: Decimal('0'),
        MachineStatusEnum.IDLE.value: Decimal('0')
    }

    # 記錄每一個機台各個狀態時間
    each_machine_status_times = []

    # Process each machine
    for machine_id, in machines:
        # Query production time for this machine
        # 利用distinct避免重複計算同一個機台多張製令單生產的情況
        production_time_subquery = db.session.query(
            ProductionScheduleOngoing.startTime,
            func.timestampdiff(
                text('SECOND'),
                ProductionScheduleOngoing.startTime,
                func.coalesce(ProductionScheduleOngoing.endTime, func.now())
            ).label('production_seconds')
        ).join(
            ProductionSchedule,
            ProductionScheduleOngoing.productionScheduleId == ProductionSchedule.id
        ).join(
            Machine,
            ProductionSchedule.machineSN == Machine.machineSN
        ).filter(
            Machine.id == machine_id,
            ProductionScheduleOngoing.startTime >= start_time,
            or_(
                ProductionScheduleOngoing.endTime < end_time,
                ProductionScheduleOngoing.endTime.is_(None)
            )
        ).distinct().subquery()

        production_time_query = db.session.query(
            func.sum(production_time_subquery.c.production_seconds).label('total_production_seconds')
        )
        production_time = (
            production_time_query.scalar() or Decimal('0')
        )
        
        # Query machine status times for this machine
        machine_status_times = (
            db.session.query(
                MachineStatus.status,
                func.sum(
                    func.timestampdiff(text('SECOND'), MachineStatus.actualStartDate, func.coalesce(MachineStatus.actualEndDate, func.now()))
                ).label('status_seconds')
            )
            .filter(
                MachineStatus.machineId == machine_id,
                MachineStatus.actualStartDate >= start_time,
                or_(
                    MachineStatus.actualEndDate < end_time,
                    MachineStatus.actualEndDate.is_(None)
                )
            )
            .group_by(MachineStatus.status)
            .all()
        )

        # Initialize status times for this machine
        status_times = {
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

        # Add to total status times
        for status, seconds in status_times.items():
            total_status_times[status] += seconds
        
        each_machine_status_times.append({
            "machineSN": Machine.query.get(machine_id).machineSN,
            MachineStatusEnum.RUN.value: status_times[MachineStatusEnum.RUN.value],
            MachineStatusEnum.TUNING.value: status_times[MachineStatusEnum.TUNING.value],
            MachineStatusEnum.OFFLINE.value: status_times[MachineStatusEnum.OFFLINE.value],
            MachineStatusEnum.TESTING.value: status_times[MachineStatusEnum.TESTING.value],
            MachineStatusEnum.IDLE.value: status_times[MachineStatusEnum.IDLE.value]
        })

    return machines, total_status_times, each_machine_status_times

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

            # Subquery for machine status
            machine_status_subquery = (
                select(
                    MachineStatus.machineId,
                    MachineStatus.actualStartDate,
                    MachineStatus.actualEndDate,
                    MachineStatus.status,
                )
                .where(
                    and_(
                        MachineStatus.actualStartDate >= midnight,
                        MachineStatus.actualStartDate.isnot(None),
                        MachineStatus.actualEndDate <= current_time,
                        MachineStatus.actualEndDate.isnot(None)
                    )
                )
                .subquery('machine_status')
            )

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
                                (machine_status_subquery.c.status == MachineStatusEnum.TUNING.value, 
                                func.timestampdiff(text('SECOND'), MachineStatus.actualStartDate, MachineStatus.actualEndDate)),
                                else_=0
                            )
                        )
                    ).label('tuningTime'),
                    func.sec_to_time(
                        func.sum(
                            case(
                                (machine_status_subquery.c.status == MachineStatusEnum.OFFLINE.value, 
                                func.timestampdiff(text('SECOND'), MachineStatus.actualStartDate, MachineStatus.actualEndDate)),
                                else_=0
                            )
                        )
                    ).label('offlineTime'),
                    func.sec_to_time(
                        func.sum(
                            case(
                                (machine_status_subquery.c.status == MachineStatusEnum.TESTING.value, 
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

            # Get all machines and their status times
            machines, total_status_times, each_machine_status_times = _get_machineStatus_statistics(midnight, current_time)

            # Calculate total seconds for proportion denominator
            total_seconds = sum(total_status_times.values())

            # Calculate proportions
            proportions = {
                status: round(float(seconds / total_seconds * 100), 1) if total_seconds > 0 else Decimal('0')
                for status, seconds in total_status_times.items()
            }

            # Prepare result list with hours
            result_list = [
                {"status": MachineStatusEnum.RUN.value, "percentage": proportions.get(MachineStatusEnum.RUN.value, 0.0), "hours": math.ceil(float(total_status_times[MachineStatusEnum.RUN.value] / Decimal('3600')))},
                {"status": MachineStatusEnum.TUNING.value, "percentage": proportions.get(MachineStatusEnum.TUNING.value, 0.0), "hours": math.ceil(float(total_status_times[MachineStatusEnum.TUNING.value] / Decimal('3600')))},
                {"status": MachineStatusEnum.OFFLINE.value, "percentage": proportions.get(MachineStatusEnum.OFFLINE.value, 0.0), "hours": math.ceil(float(total_status_times[MachineStatusEnum.OFFLINE.value] / Decimal('3600')))},
                {"status": MachineStatusEnum.TESTING.value, "percentage": proportions.get(MachineStatusEnum.TESTING.value, 0.0), "hours": math.ceil(float(total_status_times[MachineStatusEnum.TESTING.value] / Decimal('3600')))},
                {"status": MachineStatusEnum.IDLE.value, "percentage": proportions.get(MachineStatusEnum.IDLE.value, 0.0), "hours": math.ceil(float(total_status_times[MachineStatusEnum.IDLE.value] / Decimal('3600')))}
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

            # Get all machines and their status times
            machines, total_status_times, each_machine_status_times = _get_machineStatus_statistics(midnight, current_time)

            result_list = []
            for status_times in each_machine_status_times:
                result_list.append({
                    'machineSN': status_times.get('machineSN', ''),
                    'run': round(status_times.get(MachineStatusEnum.RUN.value)/ Decimal('3600'), 1),
                    'idle': round(status_times.get(MachineStatusEnum.IDLE.value)/ Decimal('3600'), 1),
                    'tuning': round(status_times.get(MachineStatusEnum.TUNING.value)/ Decimal('3600'), 1),
                    'testing': round(status_times.get(MachineStatusEnum.TESTING.value)/ Decimal('3600'), 1),
                    'offline': round(status_times.get(MachineStatusEnum.OFFLINE.value)/ Decimal('3600'), 1)
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
            # Get all machines and their status times
            machines, total_status_times, each_machine_status_times = _get_machineStatus_statistics(midnight, current_time)

            # 1.「稼動時間 」=當天所有機台「生產時間 」(機)的總合，將秒數轉成格式 hh:mm
            total_run_time_seconds = total_status_times[MachineStatusEnum.RUN.value]
            total_run_time_str = f"{int(total_run_time_seconds // 3600):02}時{int((total_run_time_seconds % 3600) // 60):02}分"
            
            # 2. 「稼動率」=「所有機台「生產中」時間」(機)/(「所有機台*24*60」(機)-「所有上模調機的時間」(機))*100%
            total_run_time_minutes = total_status_times[MachineStatusEnum.RUN.value] / 60 / 2
            total_tuning_time_minutes = total_status_times[MachineStatusEnum.TUNING.value] / 60
            total_utilization_rate = (total_run_time_minutes / ((len(machines) * 24 * 60) - total_tuning_time_minutes)) * 100
            total_utilization_rate = round(float(total_utilization_rate), 1)  

            # 3.「生產機台數」=目前為「生產中」的機台數總合
            total_production_machines = sum(1 for status in total_status_times if status == MachineStatusEnum.RUN.value and total_status_times[status] > 0)
            
            # 4.「停機次數」=累計當天所有機台「停機」的次數
            total_offline_count = (
                db.session.query(func.count(MachineStatus.id))
                .filter(
                    MachineStatus.status == MachineStatusEnum.OFFLINE.value,
                    MachineStatus.actualStartDate >= midnight,
                    MachineStatus.actualEndDate <= current_time
                )
            ).scalar() or 0
            
            # Prepare the result
            result = {
                "utilizationTime": total_run_time_str,
                "utilizationRate": total_utilization_rate,
                "runCount": total_production_machines,
                "offlineCount": total_offline_count
            }

            resp = message(True, "dashboard data sent")
            resp["data"] = result
            return resp, 200
        except Exception as error:
            raise error
        
    
    @staticmethod
    def get_dailyOEE():
        try:
            # 列出今天以及過去六天的日期範圍
            current_time = datetime.now(pytz.timezone(TZ))
            date_ranges = []
            for i in range(6, 0, -1):
                day = current_time.date() - timedelta(days=i)
                # 使用 datetime.combine 建立 naive datetime，然後用 localize 附加時區
                start_time = datetime.combine(day, datetime.min.time())
                start_time = pytz.timezone(TZ).localize(start_time)
                end_time = start_time + timedelta(days=1)
                date_ranges.append({
                    'date': start_time.date(),
                    'start_time': start_time,
                    'end_time': end_time
                })
                
            # First day: from midnight to current time
            first_day_start = current_time.replace(hour=0, minute=0, second=0, microsecond=0)
            date_ranges.append({
                'date': first_day_start.date(),
                'start_time': first_day_start,
                'end_time': current_time
            })
            
            oee_data = []
            for date in date_ranges:
                start_time = date['start_time']
                end_time = date['end_time']
                # Get all machines and their status times
                machines, total_status_times, each_machine_status_times = _get_machineStatus_statistics(start_time, end_time)

                # 1. 「稼動率」=「所有機台「生產中」時間」(機)/(「所有機台*24*60」(機)-「所有上模調機的時間」(機))*100%
                total_run_time_minutes = total_status_times[MachineStatusEnum.RUN.value] / 60 / 2
                total_tuning_time_minutes = total_status_times[MachineStatusEnum.TUNING.value] / 60
                total_utilization_rate = (total_run_time_minutes / ((len(machines) * 24 * 60) - total_tuning_time_minutes)) * 100
                total_utilization_rate = round(float(total_utilization_rate), 1)  

                # 2. 「產能效率」=「所有機台的「良品數(productionQuantity)」(ProductionReport)+「不良品數(defectiveQuantity)」(ProductionReport)」/(所有機台的「穴數(moldCavity)」(ProductionSchedule)*「產能小時(hourlyCapacity)」(ProductionSchedule))
                total_good_quantity = (
                    db.session.query(func.sum(ProductionReport.productionQuantity))
                    .filter(
                        ProductionReport.startTime >= start_time,
                        ProductionReport.endTime <= end_time
                    )
                ).scalar() or 0
                total_defective_quantity = (
                    db.session.query(func.sum(ProductionReport.defectiveQuantity))
                    .filter(
                        ProductionReport.startTime >= start_time,
                        ProductionReport.endTime <= end_time
                    )
                ).scalar() or 0
                total_mold_cavity = (
                    db.session.query(func.sum(ProductionSchedule.moldCavity))
                    .filter(
                        ProductionSchedule.planOnMachineDate >= start_time,
                        ProductionSchedule.planOnMachineDate < end_time
                    )
                ).scalar() or 0
                total_hourly_capacity = (
                    db.session.query(func.sum(ProductionSchedule.hourlyCapacity))
                    .filter(
                        ProductionSchedule.planOnMachineDate >= start_time,
                        ProductionSchedule.planOnMachineDate < end_time
                    )
                ).scalar() or 0
                if total_mold_cavity > 0 and total_hourly_capacity > 0:
                    total_capacity_efficiency = ((total_good_quantity + total_defective_quantity) / (total_mold_cavity * total_hourly_capacity))
                else:
                    total_capacity_efficiency = 0.0
                total_capacity_efficiency = round(float(total_capacity_efficiency), 2)

                # 3. 「良率」= 「良品數量(productionQuantity)」(ProductionReport)/(「不良數(defectiveQuantity)」(ProductionReport)+「良品數量」(派))
                if total_good_quantity + total_defective_quantity > 0:
                    total_yield = (total_good_quantity / (total_good_quantity + total_defective_quantity))
                else:
                    total_yield = 0.0
                total_yield = round(float(total_yield), 2)

                # 4. 「OEE」=「稼動率」*「產能效率」*「良率」
                total_oee = (total_utilization_rate * total_capacity_efficiency * total_yield)
                total_oee = round(float(total_oee), 2)

                oee_data.append({
                    'date': date['date'].isoformat(),
                    'OEE': total_oee,
                })
            
            resp = message(True, "dashboard data sent")
            resp["data"] = oee_data
            return resp, 200
        except Exception as error:
            raise error
        
    
    def get_machineOverview(productionArea="A"):
        try:
            # Current time
            current_time = datetime.now(pytz.timezone(TZ))
            overview_data_list = []

            # 1. 列出某區域的所有機台
            machine_query = Machine.query
            machine_query = machine_query.filter_by(productionArea=productionArea) if productionArea is not None else machine_query
            machine_db_list = machine_query.all()

            # 2. 機台生產中，列出productionSchedule中，某區域的所有狀態為On-going的生產排程，並取得產品編號、良率(良品數量 /(不良數+良品數量))、計算完成率
            productionSchedule_query = ProductionSchedule.query
            productionSchedule_query = productionSchedule_query.with_entities(ProductionSchedule.machineSN, ProductionSchedule.workOrderQuantity,
                ProductionSchedule.productionArea, ProductionReport.productionQuantity, ProductionReport.defectiveQuantity,Product.productSN,
            )
            productionSchedule_query = productionSchedule_query.outerjoin(ProductionReport, ProductionSchedule.id == ProductionReport.pschedule_id)
            productionSchedule_query = productionSchedule_query.outerjoin(Product, ProductionSchedule.productId == Product.id)
            productionSchedule_query = productionSchedule_query.filter(ProductionSchedule.status == WorkOrderStatusEnum.ON_GOING.value)
            productionSchedule_query = productionSchedule_query.filter(ProductionSchedule.productionArea == productionArea)
            productionSchedule_query = productionSchedule_query.group_by(ProductionSchedule.machineSN)
            productionSchedule_db_list = productionSchedule_query.all()
            for productionSchedule_db in productionSchedule_db_list:
                # 計算良率，「良率」=「良品數量(派)」/(「不良數」(派)+「良品數量」(派))
                good_quantity = productionSchedule_db.productionQuantity
                defective_quantity = productionSchedule_db.defectiveQuantity
                yield_rate = Decimal(good_quantity) / (Decimal(good_quantity) + Decimal(defective_quantity)) if (good_quantity + defective_quantity) > 0 else Decimal(0)
                yield_rate = round(float(yield_rate), 2)
                # 計算完成率，「完成率」=「良品數量」(派)/「製令數量」(派)
                completion_rate = Decimal(good_quantity) / Decimal(productionSchedule_db.workOrderQuantity) if productionSchedule_db.workOrderQuantity > 0 else Decimal(0)
                completion_rate = round(float(completion_rate), 2)
                overview_data_list.append( {
                    "machineStatus": MachineStatusEnum.RUN.value,
                    "productionArea": productionSchedule_db.productionArea,
                    "machineSN": productionSchedule_db.machineSN,
                    "productSN": productionSchedule_db.productSN,
                    "yield": yield_rate,
                    "completionRate": completion_rate,
                })
            
            # 從productionSchedule_db_list列出所有machineSN
            ongoing_machineSN_list = [productionSchedule_db.machineSN for productionSchedule_db in productionSchedule_db_list]

            # 3. 機台已開始某個狀態，從machineStatus找出當日，有actualStartDate，且無actualFinishDate的 (machineStatusId)，並排除productionSchedule中的machineSN
            machineStatus_query = MachineStatus.query
            machineStatus_query = machineStatus_query.with_entities(MachineStatus.status, Machine.machineSN, Machine.productionArea)
            machineStatus_query = machineStatus_query.join(Machine, Machine.id == MachineStatus.machineId)
            machineStatus_query = machineStatus_query.filter(Machine.productionArea == productionArea)
            machineStatus_query = machineStatus_query.filter(MachineStatus.actualStartDate <= current_time)
            machineStatus_query = machineStatus_query.filter(MachineStatus.actualEndDate == None)
            machineStatus_query = machineStatus_query.filter(Machine.machineSN.notin_(ongoing_machineSN_list))
            machineStatus_query = machineStatus_query.group_by(MachineStatus.machineId)
            machineStatus_db_list = machineStatus_query.all()
            for machineStatus_db in machineStatus_db_list:
                overview_data_list.append({
                    "machineStatus": machineStatus_db.status,
                    "productionArea": machineStatus_db.productionArea,
                    "machineSN": machineStatus_db.machineSN,
                    "productSN": None,
                    "yield": None,
                    "completionRate": None,
                })
            started_machineSN_list = [machineStatus_db.machineSN for machineStatus_db in machineStatus_db_list]
            
            # 整理出所有機台的machineSN
            all_machineSN_list = [machine.machineSN for machine in machine_db_list]
            # 整理出生產中機台的machineSN和已開始某個狀態的機台的machineSN
            ongoing_machineSN_list = [productionSchedule_db.machineSN for productionSchedule_db in productionSchedule_db_list]
            started_machineSN_list = [machineStatus_db.machineSN for machineStatus_db in machineStatus_db_list]
            # 所有機台machineSN 排除掉生產中和已開始某個狀態的機台
            idle_machineSN_list = list(set(all_machineSN_list) - set(ongoing_machineSN_list) - set(started_machineSN_list))
            # 剩下機台都顯示為待機
            for machineSN in idle_machineSN_list:
                overview_data_list.append({
                    "machineStatus": MachineStatusEnum.IDLE.value,
                    "productionArea": productionArea,
                    "machineSN": machineSN,
                    "productSN": None,
                    "yield": None,
                    "completionRate": None,
                })  

            
            # 依照machineSN排序
            overview_data_list.sort(key=lambda x: (x['machineSN'][0], int(x['machineSN'][1:])))
            

            resp = message(True, "machineStatus data sent")
            resp["data"] = overview_data_list
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error