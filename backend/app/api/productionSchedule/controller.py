from datetime import datetime
import sys
from flask import request
from flask_restx import Resource

from app.utils_log import controller_entrance_log
from app.api.option.optionEnum import WorkOrderStatusEnum
from .service import productionScheduleService
from .dto import productionScheduleDto
from .schemas import productionScheduleSchema


api = productionScheduleDto.api
control_schema = productionScheduleSchema()

"""API Documentation
1. Get productionSchedules
Get /api/productionSchedule/?page={page}&size={size}&sort={sort}&xx_filter={xx_filter}
2. Create a productionSchedule
Post /api/productionSchedule/
3. Get a productionSchedule record by id
Get /api/productionSchedule/{id}
4. Update a productionSchedule record by id
Put /api/productionSchedule/{id}
4. delete a productionSchedule record by id
Delete /api/productionSchedule/{id}
5. Get machineSN
Get /api/productionSchedule/machineSN
"""

@api.route("/")
class productionScheduleController(Resource):
    productionSchedule_resp = productionScheduleDto.productionSchedule_paging
    control_input = productionScheduleDto.productionSchedule_post
    control_resp = productionScheduleDto.productionSchedule_resp

    @api.doc(
        "Get productionSchedules",
        responses={
            200: ("productionSchedule data successfully sent", productionSchedule_resp),
            404: "productionSchedule not found",
        },
    )
    @api.param("page", "Page number")
    @api.param("size", "Size of the page")
    @api.param("sort", "Sort by a column")
    @api.param("start_planOnMachineDate", "Search range from planOnMachineDate")
    @api.param("end_planOnMachineDate", "Search range to planOnMachineDate")
    @api.param("status", type="string", enum=[WorkOrderStatusEnum.NOT_YET.value, WorkOrderStatusEnum.ON_GOING.value, WorkOrderStatusEnum.DONE.value, 
                  WorkOrderStatusEnum.PAUSE.value, "all"])
    @api.param("expiry", "無限期, 即將到期, 已經過期")
    @api.param("workOrderSN", "workOrderSN")
    @api.param("productName", "productName")
    @api.param("machineSNs", "machineSN List", default="A1,B2,C3")
    @controller_entrance_log(description="Get productionSchedules")
    def get(self):
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=10, type=int)
        sort = request.args.get('sort', default="id", type=str)
        start_planOnMachineDate = request.args.get('start_planOnMachineDate', default=None, type=str)
        end_planOnMachineDate = request.args.get('end_planOnMachineDate', default=None, type=str)
        status = request.args.get('status', default="all", type=str)
        expiry = request.args.get('expiry', default="無限期", type=str)
        workOrderSN = request.args.get('workOrderSN', default=None, type=str)
        productName = request.args.get('productName', default=None, type=str)
        machineSNs = request.args.get('machineSNs', default=None, type=str)

        return productionScheduleService.get_productionSchedules(
            page=page, size=size, sort=sort, start_planOnMachineDate=start_planOnMachineDate,
            end_planOnMachineDate=end_planOnMachineDate, status=status, expiry=expiry,workOrderSN=workOrderSN,
            productName=productName, machineSNs=machineSNs)
    
    @api.doc(
        "Create the current productionSchedule",
        responses={
            200: ("productionSchedule data successfully created", control_resp),
            404: "productionSchedule not found",
        },
    )
    @api.expect(control_input, validate=True)
    @controller_entrance_log(description="Create the current productionSchedule")
    def post(self):
        payload = api.payload
        return productionScheduleService.create_productionSchedule(payload)
    

@api.route("/createProductionSchedules")
class productionScheduleController(Resource):
    control_input = productionScheduleDto.productionSchedule_post
    control_resp = productionScheduleDto.control_resp

    @api.doc(
        "Create single or multiple productionSchedules",
        responses={
            200: ("productionSchedules data successfully created", control_resp),
            404: "productionSchedules not found",
        },
    )
    @api.expect([control_input], validate=True)
    @controller_entrance_log(description="Create single or multiple productionSchedules")
    def post(self):
        payload = api.payload
        return productionScheduleService.create_productionSchedules(payload)


@api.route("/<int:id>")
@api.param("id", "id of the productionSchedule")
class productionScheduleController(Resource):
    productionSchedule_resp = productionScheduleDto.productionSchedule_resp
    control_input = productionScheduleDto.productionSchedule_put
    control_resp = productionScheduleDto.control_resp

    @api.doc(
        "Get a specific productionSchedule",
        responses={
            200: ("productionSchedule data successfully sent", productionSchedule_resp),
            404: "productionSchedule not found",
        },
    )
    @controller_entrance_log(description="Get a specific productionSchedule")
    def get(self, id):
        return productionScheduleService.get_productionSchedule(id)

    @api.doc(
        "update the current productionSchedule",
        responses={
            200: ("productionSchedule data successfully updated", productionSchedule_resp),
            404: "productionSchedule not found",
        },
    )
    @api.expect(control_input, validate=True)
    @controller_entrance_log(description="update the current productionSchedule")
    def put(self, id):
        payload = api.payload
        remove_props = ["id"]
        for prop in remove_props:
            payload.pop(prop, None)
        return productionScheduleService.update_productionSchedule(id, payload)

    @api.doc(
        "delete the current productionSchedule",
        responses={
            200: ("productionSchedule data successfully deleted", control_resp),
            404: "productionSchedule not found",
        },
    )
    @controller_entrance_log(description="delete the current productionSchedule")
    def delete(self, id):
        return productionScheduleService.delete_productionSchedule(id)


@api.route("/<int_list:ids>")
@api.param("ids", "ids of the productionSchedule", required=True, default="[1,2,3]", type="int_list")
class productionScheduleController(Resource):
    control_input = productionScheduleDto.productionSchedule_put
    control_resp = productionScheduleDto.control_resp

    @api.doc(
        "Update the current productionSchedules",
        responses={
            200: ("productionSchedules data successfully updated", control_resp),
            404: "productionSchedules not found",
        },
    )
    @api.expect(control_input, validate=True)
    @controller_entrance_log(description="Update the current productionSchedules")
    def put(self, ids):
        payload = api.payload
        remove_props = ["id"]
        for prop in remove_props:
            payload.pop(prop, None)
        return productionScheduleService.update_productionSchedules(ids, payload)

    @api.doc(
        "delete the current productionSchedules",
        responses={
            200: ("productionSchedules data successfully deleted", control_resp),
            404: "productionSchedules not found",
        },
    )
    @controller_entrance_log(description="delete the current productionSchedules")
    def delete(self, ids):
        return productionScheduleService.delete_productionSchedules(ids)


@api.route("/getProductionScheduleThroughLY/")
@api.param("id", "id of the productionSchedule", required=True)
@api.param("workOrderSN", "workOrderSN", required=True)
class productionScheduleController(Resource):
    productionSchedule_resp = productionScheduleDto.productionSchedule_resp

    @api.doc(
        "Get single productionSchedule through LY",
        responses={
            200: ("productionSchedule data found", productionSchedule_resp),
            404: "productionSchedule not found",
        },
    )
    @controller_entrance_log(description="Get single productionSchedule through LY")
    def get(self):
        id = request.args.get('id', default=None, type=int)
        workOrderSN = request.args.get('workOrderSN', default=None, type=str)
        return productionScheduleService.get_productionSchedule_through_LY(id, workOrderSN)


@api.route("/machineSN")
class productionScheduleController(Resource):
    machineSN_object = productionScheduleDto.machineSN_object
    machineSN_resp = productionScheduleDto.machineSN_resp

    @api.doc(
        "Get machineSNs",
        responses={
            200: ("machineSN data successfully sent", machineSN_resp),
            404: "machineSN not found",
        },
    )
    @controller_entrance_log(description="Get machineSNs")
    def get(self):
        return productionScheduleService.get_machineSNs()


@api.route("/checkStartEligibility")
class productionScheduleController(Resource):
    eligibility_resp = productionScheduleDto.eligibility_resp

    @api.doc(
        """製令單需按照製程順序產生母批，例如: 「廠內-成型-1I」的製令單必須進入「On-going」狀態後，「廠內-成型-2I」的製令單才能產生母批。
        後端確認可以產生母批，會回傳True，不能產生則回傳False""",
        responses={
            200: ("data successfully sent", eligibility_resp),
            404: "not found",
        },
    )
    @api.param("workOrderSN", "workOrderSN", required=True)
    @api.param("processId", "id of the process", required=True)
    @controller_entrance_log(description="Check the eligibility of starting the workOrder")
    def get(self):
        workOrderSN = request.args.get('workOrderSN', default=None, type=str)
        processId = request.args.get('processId', default=None, type=int)
        return productionScheduleService.check_start_eligibility(workOrderSN, processId)
    