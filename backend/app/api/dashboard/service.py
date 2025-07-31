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
    """取得所有機台目前的狀態統計，包含之前就已經開始，但還沒結束的機台狀態。

    Args:
        start_time (_type_): _description_
        end_time (_type_): _description_

    Returns:
        tuple: 包含機台列表和每個機台的狀態時間統計。
    """
    # Time from midnight to current time (used for per-machine idle time)
    day_seconds = Decimal((end_time - start_time).total_seconds())
    utc_start_time = func.convert_tz(start_time, start_time.tzinfo.zone, 'UTC')

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
            ProductionScheduleOngoing.startTime, func.max(
                func.timestampdiff(
                    text('SECOND'),
                    utc_start_time,
                    func.coalesce(ProductionScheduleOngoing.endTime, func.now())
                )
            ).label('production_seconds')
        ).join(
            ProductionSchedule,
            ProductionScheduleOngoing.productionScheduleId == ProductionSchedule.id
        ).join(
            Machine,
            ProductionSchedule.machineSN == Machine.machineSN
        ).filter(
            Machine.id == machine_id,
            ProductionSchedule.status == WorkOrderStatusEnum.ON_GOING.value,
            ProductionScheduleOngoing.startTime.isnot(None),
            or_(
                ProductionScheduleOngoing.endTime > utc_start_time,
                ProductionScheduleOngoing.endTime.is_(None)
            )
        ).group_by(
            ProductionScheduleOngoing.startTime
        ).subquery()

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
                    func.timestampdiff(text('SECOND'), 
                    utc_start_time, 
                    func.coalesce(MachineStatus.actualEndDate, func.now()))
                ).label('status_seconds')
            )
            .filter(
                MachineStatus.machineId == machine_id,
                MachineStatus.actualStartDate.isnot(None),
                or_(
                    MachineStatus.actualEndDate > utc_start_time,
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


def _get_machineStatus_statistics_within_period(start_time, end_time) -> tuple:
    """取得所有機台在指定時間範圍內的狀態統計。

    Args:
        start_time (_type_): _description_
        end_time (_type_): _description_

    Returns:
        tuple: 包含機台列表和每個機台的狀態時間統計。
    """
    # Time from midnight to current time (used for per-machine idle time)
    day_seconds = Decimal((end_time - start_time).total_seconds())
    utc_start_time = func.convert_tz(start_time, start_time.tzinfo.zone, 'UTC')
    utc_end_time = func.convert_tz(end_time, end_time.tzinfo.zone, 'UTC')

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
            func.max(
                func.timestampdiff(
                    text('SECOND'),
                    utc_start_time,
                    # IF ProductionScheduleOngoing.endTime < end_time, count to ProductionScheduleOngoing.endTime, else count to end_time
                    case(
                        (ProductionScheduleOngoing.endTime < utc_end_time, ProductionScheduleOngoing.endTime),
                        else_=utc_end_time
                    )
                )
            ).label('production_seconds'),
        ).join(
            ProductionSchedule,
            ProductionScheduleOngoing.productionScheduleId == ProductionSchedule.id
        ).join(
            Machine,
            ProductionSchedule.machineSN == Machine.machineSN
        ).filter(
            Machine.id == machine_id,
            ProductionSchedule.status == WorkOrderStatusEnum.ON_GOING.value,
            ProductionScheduleOngoing.startTime.isnot(None),
            or_(
                ProductionScheduleOngoing.endTime > utc_start_time,
                ProductionScheduleOngoing.endTime.is_(None)
            )
        ).group_by(
            ProductionScheduleOngoing.startTime
        ).subquery()

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
                    func.timestampdiff(text('SECOND'), 
                    utc_start_time, 
                    case(
                        (MachineStatus.actualEndDate < utc_end_time, MachineStatus.actualEndDate),
                        else_=utc_end_time
                    ))
                ).label('status_seconds')
            )
            .filter(
                MachineStatus.machineId == machine_id,
                MachineStatus.actualStartDate.isnot(None),
                or_(
                    MachineStatus.actualEndDate > utc_start_time,
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


def _get_machineStatus_count():
    """取得目前所有機台狀態的台數統計。

    Returns:
        _type_: _description_
    """
    current_time = datetime.now(pytz.timezone(TZ))
    midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)
        # 從ProductionScheduleOngoin資料表找出所有生產中的製令單數量
    query = (
            db.session.query(
                literal("生產中").label("status"),
                func.count(func.distinct(ProductionSchedule.machineSN)).label('count')
            )
            .select_from(ProductionScheduleOngoing)
            .join(ProductionSchedule, ProductionScheduleOngoing.productionScheduleId == ProductionSchedule.id)
            .filter(
                ProductionSchedule.status == WorkOrderStatusEnum.ON_GOING.value,
                ProductionScheduleOngoing.startTime.isnot(None),
                or_(
                    ProductionScheduleOngoing.endTime > func.convert_tz(midnight, midnight.tzinfo.zone, 'UTC'),
                    ProductionScheduleOngoing.endTime.is_(None)  # Only count ongoing production schedules
                )
            )
        )
    production_schedule_counts = query.all()

        # 從MachineStatus資料表找出目前所有狀態的機台數量
    query = (
            db.session.query(
                MachineStatus.status,
                func.count(MachineStatus.machineId).label('count')
            )
            .select_from(MachineStatus)
            .join(Machine, MachineStatus.machineId == Machine.id)
            .filter(
                MachineStatus.actualStartDate.isnot(None),
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
    return machine_status_counts


class DashboardService:
    @staticmethod
    def get_todayWorkOrder():
        try:
            # Query the database to fetch the required fields from the specified tables
            current_time = datetime.now(pytz.timezone(TZ))
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)
            next_day = current_time + timedelta(days=1)

            # Create the subquery for ProductionReport where serialNumber = 0
            production_report_subquery = select(
                ProductionReport.productionQuantity,
                ProductionReport.pschedule_id
            ).where(ProductionReport.serialNumber == 0).subquery()
            
            # main query
            query = ProductionSchedule.query
            query = query.with_entities(ProductionSchedule.machineSN, ProductionSchedule.workOrderSN, 
                                        ProductionSchedule.planFinishDate, ProductionSchedule.status,
                                        production_report_subquery.c.productionQuantity,
                                        Product.productSN, Product.productName, ProcessOption.processName)
            # Joins
            query = query.outerjoin(production_report_subquery, ProductionSchedule.id == production_report_subquery.c.pschedule_id) # left outer join
            query = query.outerjoin(Product, ProductionSchedule.productId == Product.id) # left outer join
            query = query.outerjoin(Process, ProductionSchedule.processId == Process.id) # left outer join
            query = query.outerjoin(ProcessOption, Process.processOptionId == ProcessOption.id) # left outer join
            # Filters planOnMachineDate < now < planFinishDate
            query = query.filter(ProductionSchedule.planOnMachineDate <= func.convert_tz(current_time, current_time.tzinfo.zone, 'UTC'))
            query = query.filter(ProductionSchedule.planFinishDate > func.convert_tz(current_time, current_time.tzinfo.zone, 'UTC'))
            query = query.filter(ProductionSchedule.status != WorkOrderStatusEnum.CANCEL.value)
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
            # Create the subquery for ProductionReport where serialNumber = 0
            production_report_subquery = select(
                ProductionReport.unfinishedQuantity,
                ProductionReport.pschedule_id
            ).where(ProductionReport.serialNumber == 0).subquery()

            # main query
            query = ProductionSchedule.query
            query = query.with_entities(ProductionSchedule.machineSN, ProductionSchedule.workOrderSN, 
                                        ProductionSchedule.planFinishDate, production_report_subquery.c.unfinishedQuantity, 
                                        Product.productSN)
            # Joins
            query = query.outerjoin(production_report_subquery, ProductionSchedule.id == production_report_subquery.c.pschedule_id) # left outer join
            query = query.outerjoin(Product, ProductionSchedule.productId == Product.id) # left outer join
            # Filters
            # 列出所有預計完成日前七天或者過了預計完成日還沒完成的的製令單。
            query = query.filter(ProductionSchedule.status != WorkOrderStatusEnum.CANCEL.value)
            query = query.filter(ProductionSchedule.status != WorkOrderStatusEnum.DONE.value)
            query = query.filter(ProductionSchedule.planFinishDate.between(datetime.now(), datetime.now() + timedelta(days=7)))
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
            # 1. 準備動態參數
            # Current time
            current_time = datetime.now(pytz.timezone(TZ))
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)
            # 當天的開始時間 (00:00:00)， midnight 轉成utc時區，再轉字串
            start_of_day_str = midnight.astimezone(pytz.utc).strftime('%Y-%m-%d %H:%M:%S')
            # 當下時間 (現在時間)，轉成utc時區，再轉字串
            end_of_workday_str = current_time.astimezone(pytz.utc).strftime('%Y-%m-%d %H:%M:%S')
            
            # 2. 定義 Raw SQL
            sql_query = text("""
                WITH 
                -- 步驟 1: 預先篩選出指定日期範圍內所有相關的機台狀態紀錄
                RelevantStatus AS (
                    SELECT
                        machineId,
                        status,
                        TIMESTAMPDIFF(SECOND, actualStartDate, COALESCE(actualEndDate, NOW())) AS duration_seconds
                    FROM
                        machineStatus
                    WHERE
                        actualStartDate IS NOT NULL
                        AND (actualEndDate > :start_of_day OR actualEndDate IS NULL)
                ),

                -- 步驟 2: 一次性聚合計算各種狀態的時間總和
                AggregatedStatusTimes AS (
                    SELECT
                        machineId,
                        SUM(CASE WHEN status = '上模與調機' THEN duration_seconds ELSE 0 END) AS tuningSeconds,
                        SUM(CASE WHEN status = '機台停機' THEN duration_seconds ELSE 0 END) AS offlineSeconds,
                        SUM(CASE WHEN status = '產品試模' THEN duration_seconds ELSE 0 END) AS testingSeconds
                    FROM
                        RelevantStatus
                    GROUP BY
                        machineId
                ),

                -- 步驟 3: 計算 runTime (生產時間)
                RunTime AS (
                    SELECT
                        ps.machineSN,
                        SUM(TIMESTAMPDIFF(SECOND, pso.startTime, COALESCE(pso.endTime, NOW()))) AS runTimeSeconds
                    FROM
                        productionScheduleOngoing pso
                    INNER JOIN 
                        productionSchedule ps ON pso.productionScheduleId = ps.id
                    WHERE
                        ps.status = 'On-going'
                        AND pso.startTime IS NOT NULL
                        AND (pso.endTime > :start_of_day OR pso.endTime IS NULL)
                    GROUP BY
                        ps.machineSN
                ),

                -- 步驟 4: 取得每台機器的最新(非生產)狀態
                LatestStatus AS (
                    SELECT
                        machineId,
                        status,
                        ROW_NUMBER() OVER (PARTITION BY machineId ORDER BY actualStartDate DESC) AS rn
                    FROM
                        machineStatus
                    WHERE
                        actualStartDate IS NOT NULL
                        AND (actualEndDate > :start_of_day OR actualEndDate IS NULL)
                ),

                -- 步驟 5: 獨立找出目前正在「生產中」的機台
                ProductionStatus AS (
                    SELECT DISTINCT machineSN
                    FROM productionSchedule
                    WHERE status = 'On-going'
                )

                -- 最終組合: 將主表與上面準備好的 CTE 進行關聯
                SELECT
                    m.id AS machineId,
                    m.machineSN AS machineSN,
                    DATE(:start_of_day) AS status_date,
                    SEC_TO_TIME(COALESCE(rt.runTimeSeconds, 0)) AS runTime,
                    SEC_TO_TIME(COALESCE(ast.tuningSeconds, 0)) AS tuningTime,
                    SEC_TO_TIME(COALESCE(ast.offlineSeconds, 0)) AS offlineTime,
                    SEC_TO_TIME(COALESCE(ast.testingSeconds, 0)) AS testingTime,
                    SEC_TO_TIME(
                        GREATEST(
                            (TIMESTAMPDIFF(SECOND, :start_of_day, :end_of_workday) - COALESCE(rt.runTimeSeconds, 0)) - 
                            (COALESCE(ast.tuningSeconds, 0) + COALESCE(ast.offlineSeconds, 0) + COALESCE(ast.testingSeconds, 0)),
                            0
                        )
                    ) AS idleTime,
                    
                    -- 機台目前狀態判斷邏輯
                    CASE
                        WHEN ps.machineSN IS NOT NULL THEN '生產中'
                        WHEN ls.status IS NOT NULL THEN ls.status
                        ELSE '待機中'
                    END AS status

                FROM
                    machine m
                LEFT JOIN AggregatedStatusTimes ast ON m.id = ast.machineId
                LEFT JOIN RunTime rt ON m.machineSN = rt.machineSN
                LEFT JOIN LatestStatus ls ON m.id = ls.machineId AND ls.rn = 1
                LEFT JOIN ProductionStatus ps ON m.machineSN = ps.machineSN
                ORDER BY
                    m.id;
            """)

            # 3. 執行查詢
            result = db.session.execute(sql_query, {
                "start_of_day": start_of_day_str,
                "end_of_workday": end_of_workday_str
            })
            
            # 轉換結果為可序列化的格式 (通常 .execute() 回傳的是 ResultProxy)
            # 使用 .mappings().all() 可以將結果轉換成 list of dictionaries
            machine_accumulated_time = result.mappings().all()

            # 4. 處理回傳結果
            machine_accumulated_time_dump = MachineAccumulatedTimeSchema().dump(machine_accumulated_time, many=True)
            resp = message(True, "dashboard data sent")
            resp["data"] = machine_accumulated_time_dump
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
                    MachineStatus.actualStartDate.isnot(None),
                    or_(
                        MachineStatus.actualEndDate.is_(None),
                        MachineStatus.actualEndDate > func.convert_tz(midnight, midnight.tzinfo.zone, 'UTC')
                    )
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
            machine_status_counts = _get_machineStatus_count()

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
            # 1. 定義 Raw SQL
            sql_query = text("""
            -- Step 1: CTE 用於準備每個工單的最新製程步驟
            WITH LatestProcessSteps AS (
                SELECT
                    id,
                    status,
                    workOrderDate,
                    workOrderSN,
                    workOrderQuantity,
                    planOnMachineDate,
                    planFinishDate,
                    processName,
                    productName,
                    ROW_NUMBER() OVER(PARTITION BY workOrderSN ORDER BY planOnMachineDate, id) as process_sequence
                FROM (
                    -- 子查詢：取得每個製程(processId)的最新一筆記錄
                    SELECT
                        ps.id,
                        ps.status,
                        ps.workOrderDate,
                        ps.workOrderSN,
                        ps.workOrderQuantity,
                        ps.planOnMachineDate,
                        ps.planFinishDate,
                        po.processName,
                        p.productName,
                        ROW_NUMBER() OVER(PARTITION BY ps.processId ORDER BY ps.id) as row_num
                    FROM
                        productionSchedule AS ps
                    LEFT OUTER JOIN
                        product AS p ON ps.productId = p.id
                    LEFT OUTER JOIN
                        process ON ps.processId = process.id
                    LEFT OUTER JOIN
                        processOption AS po ON process.processOptionId = po.id
                    WHERE
                        ps.workOrderSN IN (
                            SELECT workOrderSN FROM productionSchedule WHERE status = 'On-going'
                        )
                        AND ps.status != '取消生產'
                ) AS RankedSchedules
                WHERE
                    row_num = 1 -- 只選擇每個獨立製程的最新一筆
            )
            -- Step 2: 使用 CTE 的結果並根據 status 條件化顯示製程名稱
            SELECT
                p1.workOrderDate,
                p1.workOrderSN,
                p1.workOrderQuantity,
                p1.productName,
                p1.planFinishDate,
                p1.status,
                -- 如果 p1 的狀態是 'Done'，則顯示 '已完成'，否則顯示原始製程名稱
                CASE 
                    WHEN p1.status = 'Done' THEN '已完成' 
                    ELSE p1.processName 
                END AS 'processOne',
                
                p2.status AS 'P2 status',
                -- 同樣的邏輯應用在 p2。COALESCE 確保在沒有次站時顯示 'N/A'
                COALESCE(
                    CASE 
                        WHEN p2.status = 'Done' THEN '已完成' 
                        ELSE p2.processName 
                    END, 
                    'N/A'
                ) AS 'processTwo'
            FROM
                LatestProcessSteps p1
            LEFT JOIN
                LatestProcessSteps p2
                ON p1.workOrderSN = p2.workOrderSN AND p2.process_sequence = 2
            WHERE
                p1.process_sequence = 1
            ORDER BY
                p1.workOrderSN;
            """)

            # 2. 執行查詢
            result = db.session.execute(sql_query)

            # 轉換結果為可序列化的格式 (通常 .execute() 回傳的是 ResultProxy)
            # 使用 .mappings().all() 可以將結果轉換成 list of dictionaries
            today_work_order_with_process = result.mappings().all()

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

            # 查詢 status 為 '機台停機' 的記錄，並計算各種停機原因的機台數量
            query = db.session.query(
                MachineStatus.reason.label('reason'),
                db.func.count(
                    MachineStatus.machineId
                ).label('count'),
            ).filter(
                MachineStatus.status == MachineStatusEnum.OFFLINE.value,
                MachineStatus.reason.isnot(None),
                MachineStatus.actualStartDate.isnot(None),
                or_(
                    MachineStatus.actualEndDate.is_(None),
                    MachineStatus.actualEndDate > func.convert_tz(midnight, midnight.tzinfo.zone, 'UTC'),
                )
            ).group_by(
                MachineStatus.reason
            ).order_by(
                db.desc('count')
            )
            
            machine_offline_reason = query.all()

            result_list = [
                {
                    'reason': result.reason,
                    'count': float(result.count)
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
            total_run_time_minutes = total_status_times[MachineStatusEnum.RUN.value] / 60
            total_tuning_time_minutes = total_status_times[MachineStatusEnum.TUNING.value] / 60
            total_utilization_rate = (total_run_time_minutes / ((len(machines) * 24 * 60) - total_tuning_time_minutes)) * 100
            total_utilization_rate = round(float(total_utilization_rate), 2)  

            # 取得所有機台狀態的台數統計
            machine_status_counts = _get_machineStatus_count()
            machine_status_count_list = [{"status": status, "count": count} for status, count in machine_status_counts]
            # 3.「生產機台數」= 目前為「生產中」的機台數總合
            total_production_machines = next((item['count'] for item in machine_status_count_list if item['status'] == MachineStatusEnum.RUN.value), 0)

            # 4.「停機台數」= 目前為「機台停機」的機台數總合
            total_offline_count = next((item['count'] for item in machine_status_count_list if item['status'] == MachineStatusEnum.OFFLINE.value), 0)
            
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
                machines, total_status_times, each_machine_status_times = _get_machineStatus_statistics_within_period(start_time, end_time)

                # 1. 「稼動率」=「所有機台「生產中」時間」(機)/(「所有機台*24*60」(機)-「所有上模調機的時間」(機))*100%
                total_run_time_minutes = total_status_times[MachineStatusEnum.RUN.value] / 60
                total_tuning_time_minutes = total_status_times[MachineStatusEnum.TUNING.value] / 60
                total_utilization_rate = (total_run_time_minutes / ((len(machines) * 24 * 60) - total_tuning_time_minutes))
                total_utilization_rate = round(float(total_utilization_rate), 2)  

                # 2. 「產能效率」=「所有機台的「良品數(productionQuantity)」(ProductionReport)」 / ((所有機台的「產能小時(hourlyCapacity)」(ProductionSchedule) *「日工時(dailyWorkingHours)」(ProductionSchedule))
                # 在productionReport資料表統計startTime == date所有的productionQuantity
                total_good_quantity = (
                    db.session.query(func.sum(ProductionReport.productionQuantity))
                    .filter(
                        func.date(ProductionReport.startTime) == date['date'],
                    )
                ).scalar() or 0
                # 在productionSchedule資料表統計status == ongoing的 hourlyCapacity * dailyWorkingHours
                total_expected_quantity = (
                    db.session.query(func.sum(ProductionSchedule.hourlyCapacity * ProductionSchedule.dailyWorkingHours))
                    .filter(
                        ProductionSchedule.status == WorkOrderStatusEnum.ON_GOING.value,
                    )
                ).scalar() or 0
                if total_expected_quantity > 0:
                    total_capacity_efficiency = total_good_quantity / total_expected_quantity
                else:
                    total_capacity_efficiency = 0.0
                total_capacity_efficiency = round(float(total_capacity_efficiency), 2)
                

                # 3. 「良率」= 「良品數量(productionQuantity)」(ProductionReport)/(「不良數(defectiveQuantity)」(ProductionReport)+「良品數量」(派))
                total_defective_quantity = (
                    db.session.query(func.sum(ProductionReport.defectiveQuantity))
                    .filter(
                        func.date(ProductionReport.startTime) == date['date'],
                    )
                ).scalar() or 0
                if total_good_quantity + total_defective_quantity > 0:
                    total_yield = (total_good_quantity / (total_good_quantity + total_defective_quantity))
                else:
                    total_yield = 0.0
                total_yield = round(float(total_yield), 2)

                # 4. 「OEE」=「稼動率」*「產能效率」*「良率」
                total_oee = (total_utilization_rate * total_capacity_efficiency * total_yield) * 100
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
            midnight = current_time.replace(hour=0, minute=0, second=0, microsecond=0)
            overview_data_list = []

            # Create the subquery for ProductionReport where serialNumber = 0
            production_report_subquery = select(
                ProductionReport.productionQuantity,
                ProductionReport.defectiveQuantity,
                ProductionReport.pschedule_id
            ).where(ProductionReport.serialNumber == 0).subquery()

            # 1. 列出某區域的所有機台
            machine_query = Machine.query
            machine_query = machine_query.filter_by(productionArea=productionArea) if productionArea is not None else machine_query
            machine_db_list = machine_query.all()

            # 2. 機台生產中，列出productionSchedule中，某區域的所有狀態為On-going的生產排程，並取得產品編號、良率(良品數量 /(不良數+良品數量))、計算完成率
            productionSchedule_query = ProductionSchedule.query
            productionSchedule_query = productionSchedule_query.with_entities(ProductionSchedule.machineSN, ProductionSchedule.workOrderQuantity,
                ProductionSchedule.productionArea, production_report_subquery.c.productionQuantity, production_report_subquery.c.defectiveQuantity,
                Product.productSN,
            )
            productionSchedule_query = productionSchedule_query.outerjoin(production_report_subquery, ProductionSchedule.id == production_report_subquery.c.pschedule_id) # left outer join
            productionSchedule_query = productionSchedule_query.outerjoin(Product, ProductionSchedule.productId == Product.id)
            productionSchedule_query = productionSchedule_query.filter(ProductionSchedule.status == WorkOrderStatusEnum.ON_GOING.value)
            productionSchedule_query = productionSchedule_query.filter(ProductionSchedule.productionArea == productionArea)
            productionSchedule_query = productionSchedule_query.group_by(ProductionSchedule.machineSN)
            productionSchedule_db_list = productionSchedule_query.all()
            for productionSchedule_db in productionSchedule_db_list:
                # 計算良率，「良率」=「良品數量(派)」/(「不良數」(派)+「良品數量」(派))
                good_quantity = productionSchedule_db.productionQuantity if productionSchedule_db.productionQuantity is not None else 0
                defective_quantity = productionSchedule_db.defectiveQuantity if productionSchedule_db.defectiveQuantity is not None else 0
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
            machineStatus_query = machineStatus_query.filter(MachineStatus.actualStartDate != None)
            machineStatus_query = machineStatus_query.filter(or_(MachineStatus.actualEndDate == None,
                                                                MachineStatus.actualEndDate > func.convert_tz(midnight, midnight.tzinfo.zone, 'UTC'))
                                                            )
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