from datetime import datetime
import os
from app.api.lysErp.xmlEnum import DataKind
from app.api.lysErp.xmlRequest import LyDataOutRequestParameter
from flask_restx import Api
from flask import Blueprint

from .user.controller import api as user_ns
from .device.controller import api as device_ns
from .house.controller import api as house_ns
from .calendar.controller import api as calendar_ns
from .productionSchedule.controller import api as productionSchedule_ns
from .productionReport.controller import api as productionReport_ns
from .product.controller import api as product_ns
from .processOption.controller import api as processOption_ns
from .materialOption.controller import api as materialOption_ns
from .process.controller import api as process_ns
from .material.controller import api as material_ns
from .option.controller import api as option_ns
from .lysErp.controller import api as lysErp_ns
from .qualityInspection.controller import api as qualityInspection_ns
from .machine.controller import api as machine_ns
from .customer.controller import api as customer_ns
from .salesQuotation.controller import api as salesQuotation_ns
from .factoryQuotation.controller import api as factoryQuotation_ns
from .productionCost.controller import api as productionCost_ns
from app.api.calendar.service import CalendarService
from app.api.lysErp.service import LyService
from app.api.productionSchedule.service import shift_by_holiday
import click

import sys

# Import controller APIs as namespaces.
api_bp = Blueprint("api", __name__)

authorizations = {
    'api_key': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

api = Api(api_bp, title="API", authorizations=authorizations,
          description="Main routes.", security='api_key')

# API namespaces
api.add_namespace(user_ns)
# api.add_namespace(device_ns)
# api.add_namespace(house_ns)
api.add_namespace(calendar_ns)
api.add_namespace(productionSchedule_ns)
api.add_namespace(productionReport_ns)
api.add_namespace(product_ns)
api.add_namespace(processOption_ns)
api.add_namespace(materialOption_ns)
api.add_namespace(process_ns)
api.add_namespace(material_ns)
api.add_namespace(option_ns)
api.add_namespace(lysErp_ns)
api.add_namespace(qualityInspection_ns)
api.add_namespace(machine_ns)
api.add_namespace(customer_ns)
api.add_namespace(salesQuotation_ns)
api.add_namespace(factoryQuotation_ns)
api.add_namespace(productionCost_ns)

@api_bp.cli.command('update_calendar')
def update_calendar():
    """Update calendar"""
    print("update_calendar")
    return CalendarService.update_calendar()


@api_bp.cli.command('shift_by_holiday')
@click.argument('start_date', type=click.DateTime(formats=["%Y-%m-%d"]))
@click.argument('workdays', type=click.INT)
def shift_test(start_date, workdays):
    """shift_by_holiday"""
    # format = '%Y-%m-%d'
    # start_date = datetime.strptime("2023-01-09", format)
    # end_date = datetime.strptime("2023-01-13", format)
    # workdays = (end_date - start_date).days
    return shift_by_holiday(start_date=start_date.date(), workdays=workdays)

LY_ERP_ON = os.getenv("LY_ERP_ON", "False")
if LY_ERP_ON.lower() == "true":
    @api_bp.cli.command('sync_ly_00000R')
    def sync_ly_data():
        """Sync 00000R Data from LY ERP"""
        print("sync_ly_00000R")
        return LyService.sync_ly_00000R()
    
    
    @api_bp.cli.command('sync_ly_0000AB')
    def sync_ly_data():
        """Sync 0000AB Data from LY ERP"""
        print("sync_ly_0000AB")
        return LyService.sync_ly_0000AB()
    

    @api_bp.cli.command('sync_ly_0000AO')
    def sync_ly_data():
        """Sync 0000AO Data from LY ERP"""
        print("sync_ly_0000AO")
        return LyService.sync_ly_0000AO()
