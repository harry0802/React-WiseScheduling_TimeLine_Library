"""update_smartSchedulingView

Revision ID: 080af255e8b4
Revises: 67d52448d1fc
Create Date: 2025-07-04 00:46:52.919682

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '080af255e8b4'
down_revision = '67d52448d1fc'
branch_labels = None
depends_on = None


def upgrade():
    # ALTER smartSchedulingView view
    # 從 productionScheduleOngoing 獲取資料On-going的製令單要考慮到同一個製令單會有多筆紀錄
    op.execute("""
    ALTER VIEW `smartSchedulingView` AS
        -- 從 machineStatus 獲取資料
        SELECT
            CONCAT('ms', ROW_NUMBER() OVER ()) AS fakeId, -- 第一分區：ms + ROW_NUMBER()
            ms.status AS timeLineStatus,
            ms.id AS machineStatusId,
            m.productionArea AS productionArea,
            m.machineSN AS machineSN,
            ms.planStartDate AS machineStatusPlanStartTime,
            ms.planEndDate AS machineStatusPlanEndTime,
            ms.actualStartDate AS machineStatusActualStartTime,
            ms.actualEndDate AS machineStatusActualEndTime,
            ms.reason AS machineStatusReason,
            ms.product AS machineStatusProduct,
            NULL AS productionScheduleId,
            NULL AS planOnMachineDate,
            NULL AS planFinishDate,
            NULL AS actualOnMachineDate,
            NULL AS actualFinishDate,
            NULL AS postponeTime,
            NULL AS workOrderSN,
            NULL AS productSN,
            NULL AS productName,
            NULL AS workOrderQuantity,
            NULL AS productionQuantity,
            NULL AS processName,
            NULL AS productionScheduleStatus
        FROM 
            machineStatus ms
        INNER JOIN 
            machine m
        ON 
            ms.machineId = m.id
        WHERE 
            ms.planStartDate > current_timestamp() - interval 6 month

        UNION ALL

        -- 從 productionScheduleOngoing 獲取資料On-going的製令單
        SELECT 
            CONCAT('pso', ROW_NUMBER() OVER ()) AS fakeId, -- 第二分區：pso + ROW_NUMBER()
            '製令單' AS timeLineStatus,
            NULL AS machineStatusId,
            psrv.productionArea AS productionArea,
            psrv.machineSN AS machineSN,
            NULL AS machineStatusPlanStartTime,
            NULL AS machineStatusPlanEndTime,
            NULL AS machineStatusActualStartTime,
            NULL AS machineStatusActualEndTime,
            NULL AS machineStatusReason,
            NULL AS machineStatusProduct,
            pso.ProductionScheduleId AS productionScheduleId,
            psrv.planOnMachineDate AS planOnMachineDate,
            psrv.planFinishDate AS planFinishDate,
            psrv.actualOnMachineDate AS actualOnMachineDate,
            psrv.actualFinishDate AS actualFinishDate,
            pso.postponeTime AS postponeTime,
            psrv.workOrderSN AS workOrderSN,
            psrv.productSN AS productSN,
            psrv.productName AS productName,
            psrv.workOrderQuantity AS workOrderQuantity,
            psrv.productionQuantity AS productionQuantity,
            psrv.processName AS processName,
            psrv.status AS productionScheduleStatus
        FROM 
            (SELECT productionScheduleId, startTime, endTime, postponeTime
            FROM plastic.productionScheduleOngoing
            WHERE (productionScheduleId, startTime) IN (
                SELECT productionScheduleId, MAX(startTime)
                FROM plastic.productionScheduleOngoing
                WHERE startTime > current_timestamp() - INTERVAL 6 MONTH
                GROUP BY productionScheduleId
            )) pso
        INNER JOIN 
            (SELECT * FROM productionScheduleReportView WHERE serialNumber = 0) psrv
        ON 
            pso.ProductionScheduleId = psrv.ProductionScheduleId
        WHERE
            psrv.status != '暫停生產'
        GROUP BY 
            pso.ProductionScheduleId

        UNION ALL

        -- 從 productionScheduleReportView 獲取尚未上機的製令單
        SELECT 
            CONCAT('ps', ROW_NUMBER() OVER ()) AS fakeId, -- 第三分區：ps + ROW_NUMBER()
            '製令單' AS timeLineStatus,
            NULL AS machineStatusId,
            ps.productionArea AS productionArea,
            ps.machineSN AS machineSN,
            NULL AS machineStatusPlanStartTime,
            NULL AS machineStatusPlanEndTime,
            NULL AS machineStatusActualStartTime,
            NULL AS machineStatusActualEndTime,
            NULL AS machineStatusReason,
            NULL AS machineStatusProduct,
            ps.id AS productionScheduleId,
            ps.planOnMachineDate AS planOnMachineDate,
            ps.planFinishDate AS planFinishDate,
            ps.actualOnMachineDate AS actualOnMachineDate,
            ps.actualFinishDate AS actualFinishDate,
            NULL AS postponeTime,
            ps.workOrderSN AS workOrderSN,
            p.productSN AS productSN,
            p.productName AS productName,
            ps.workOrderQuantity AS workOrderQuantity,
            NULL AS productionQuantity,
            po.processName AS processName,
            ps.status AS productionScheduleStatus
        FROM 
            productionSchedule ps
        LEFT JOIN
            product p ON ps.productId = p.id 
        LEFT JOIN
            process proc ON ps.processId = proc.id
        LEFT JOIN
            processOption po ON proc.processOptionId = po.id
        WHERE 
            ps.status = '尚未上機'
            OR ps.status = '暫停生產';
    """)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
