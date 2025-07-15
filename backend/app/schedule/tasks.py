import os
from flask import current_app
from app import scheduler, db
from app.api.calendar.service import CalendarService
from app.api.productionCost.service import ProductionCostService
from app.api.maintenance.service import MaintenanceService
from app.api.lysErp.service import LyService

@scheduler.task(
    "cron",
    id="update_calendar",
    month='*',
    max_instances=1,
)
def update_calendar():
    with scheduler.app.app_context():
        try:
            CalendarService.update_calendar()
        except Exception as error:
            current_app.logger.error(error)


@scheduler.task(
    "cron",
    id="create_productionCost_realTime",
    minute='*',
    max_instances=1,
    )
def create_productionCost_realTime():
    with scheduler.app.app_context():
        try:
            ProductionCostService.create_productionCost_realTime()
        except Exception as error:
            current_app.logger.error(error)


@scheduler.task(
    "cron",
    id="create_machineMaintenances_weekly",
    week='*',
    day_of_week='sun', # Sunday
    hour=1,            # 1:00 AM
    minute=0,          # At the start of the hour
    max_instances=1,
    )
def create_machineMaintenances_weekly():
    with scheduler.app.app_context():
        try:
            MaintenanceService.create_machineMaintenances_weekly()
        except Exception as error:
            current_app.logger.error(error)


@scheduler.task(
    "cron",
    id="create_moldMaintenances_weekly",
    week='*',
    day_of_week='sun', # Sunday
    hour=1,            # 1:00 AM
    minute=0,          # At the start of the hour
    max_instances=1,
    )
def create_moldMaintenances_weekly():
    with scheduler.app.app_context():
        try:
            MaintenanceService.create_moldMaintenances_weekly()
        except Exception as error:
            current_app.logger.error(error)


LY_ERP_ON = os.getenv("LY_ERP_ON", "False")
if LY_ERP_ON.lower() == "true":
    @scheduler.task(
    "interval",
    id="sync_ly_00000R",
    minutes=30,
    max_instances=1,
    )
    def sync_ly_00000R():
        with scheduler.app.app_context():
            try:
                LyService.sync_ly_00000R()
            except Exception as error:
                current_app.logger.error(error)

    
    @scheduler.task(
    "interval",
    id="sync_ly_0000AB",
    minutes=30,
    max_instances=1,
    )
    def sync_ly_0000AB():
        with scheduler.app.app_context():
            try:
                LyService.sync_ly_0000AB()
            except Exception as error:
                current_app.logger.error(error)

    @scheduler.task(
    "interval",
    id="sync_ly_0000AO",
    minutes=30,
    max_instances=1,
    )
    def sync_ly_0000AO():
        with scheduler.app.app_context():
            try:
                LyService.sync_ly_0000AO()
            except Exception as error:
                current_app.logger.error(error)

