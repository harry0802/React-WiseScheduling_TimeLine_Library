import sys
from app import db
from flask import request,current_app
from flask_restx import Resource
from flask_restx import inputs
from app.utils_log import controller_entrance_log
from .service import SmartScheduleService
from .dto import SmartScheduleDto
api = SmartScheduleDto.api


@api.route("/")
class SmartScheduleController(Resource):
    smartSchedule_resp = SmartScheduleDto.smartSchedule_resp

    # GET
    @api.doc(description="""取得某一地區、預計上機日的某一時段，全部機台的排程""")
    @api.doc(
        "Get smartSchedules",
        responses={
            200: ("smartSchedule data successfully sent", smartSchedule_resp),
            404: "smartSchedule not found",
        },
    )
    @api.param("productionArea", "機台區域", type=str, required=True, enum=["A", "B", "C", "D"])
    @api.param("startTime", "Search range from planOnMachineDate/machineStatusPlanStartTime")
    @api.param("endTime", "Search range to planOnMachineDate/machineStatusPlanEndTime")
    @controller_entrance_log(description="Get smartSchedules")
    def get(self):
        productionArea = request.args.get('productionArea', default=None, type=str)
        startTime = request.args.get('startTime', default=None, type=str)
        endTime = request.args.get('endTime', default=None, type=str)
        return SmartScheduleService.get_smartSchedule(productionArea, startTime, endTime)
    

@api.route("/changeWorkOrder")
class SmartScheduleController(Resource):
    smartSchedule_resp = SmartScheduleDto.smartSchedule_resp
    # PUT
    @api.doc(description="""修改某個機台多個排程。當某個機台改變製令單的預計開始時間之後，系統自動計算出新的預計結束時間，並更新其他行程的預計開始時間和預計結束時間。""")
    @api.doc(
        "Update WorkOrder Schedule",
        responses={
            200: ("smartSchedule data successfully updated"),
            400: "Invalid input",
        },
    )
    @api.expect(SmartScheduleDto.smartSchedule_workorder_put, validate=True)
    @controller_entrance_log(description="Update WorkOrder smartSchedule")
    def put(self):
        return SmartScheduleService.update_work_order_schedule(api.payload)
    