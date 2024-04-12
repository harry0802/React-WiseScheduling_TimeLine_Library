from array import array
from datetime import datetime, timedelta
import sys
from flask import request
from flask_restx import Resource

from app.utils import controller_entrance_log

from .service import productionReportService
from .dto import productionReportDto
from .schemas import productionReportSchema


api = productionReportDto.api
control_schema = productionReportSchema()

"""API Documentation
1. Get productionReports
Get /api/productionReport/?machineSN={machineSN}&machineSNs={machineSNs}&start_planOnMachineDate={start_planOnMachineDate}
&end_planOnMachineDate={end_planOnMachineDate}&status={status}&expiry={expiry}&workOrderSN={workOrderSN}&productName={productName}
2. Create a productionReport
Post /api/productionReport/
3. Get a productionReport record by id
Get /api/productionReport/{id}
4. Update a productionReport record by id
Put /api/productionReport/{id}
4. delete a productionReport record by id
Delete /api/productionReport/{id}
"""

@api.route("/")
class productionReportController(Resource):
    productionReport_resp = productionReportDto.productionReport_paging
    productionReport_post = productionReportDto.productionReport_post
    productionReport_put = productionReportDto.productionReport_put
    control_resp = productionReportDto.productionReport_resp

    @api.doc(
        "Get productionReports",
        responses={
            200: ("productionReport data successfully sent", productionReport_resp),
            404: "productionReport not found",
        },
    )
    @api.param("machineSN", "machineSN")
    @api.param("start_planOnMachineDate", "Search range from planOnMachineDate")
    @api.param("end_planOnMachineDate", "Search range to planOnMachineDate")
    @api.param("status", "尚未上機, On-going, Done, 暫停生產, all")
    @api.param("expiry", "無限期, 即將到期, 已經過期")
    @api.param("workOrderSN", "workOrderSN")
    @api.param("productName", "productName")
    @api.param("motherOnly", "是否只顯示母批")
    @api.param("productionSchedule_ids", "productionSchedule_ids")
    @controller_entrance_log(description="Get productionReports")
    def get(self):
        machineSN = request.args.get('machineSN', default=None, type=str)
        start_planOnMachineDate = request.args.get('start_planOnMachineDate', default=None, type=str)
        end_planOnMachineDate = request.args.get('end_planOnMachineDate', default=None, type=str)
        status = request.args.get('status', default="all", type=str)
        expiry = request.args.get('expiry', default="無限期", type=str)
        workOrderSN = request.args.get('workOrderSN', default=None, type=str)
        productName = request.args.get('productName', default=None, type=str)
        motherOnly = request.args.get('motherOnly', default=False, type=bool)
        productionSchedule_ids = request.args.get('productionSchedule_ids', default=None, type=str)

        return productionReportService.get_workOrders(
            machineSN=machineSN, start_planOnMachineDate=start_planOnMachineDate, 
            end_planOnMachineDate=end_planOnMachineDate, status=status, expiry=expiry, workOrderSN=workOrderSN,
            productName=productName, motherOnly=motherOnly, productionSchedule_ids=productionSchedule_ids)
    

@api.route("/motherLot")
class productionReportController(Resource):
    productionReport_resp = productionReportDto.productionReport_paging
    productionReport_post = productionReportDto.productionReport_post
    productionReport_put = productionReportDto.productionReport_put
    control_resp = productionReportDto.productionReport_resp

    @api.doc(
        "Create single or multiple productionReports",
        responses={
            200: ("productionReport data successfully created", control_resp),
            404: "productionReport created failed",
        },
    )
    @api.expect([productionReport_post], validate=True)
    @controller_entrance_log(description="Create single or multiple productionReports")
    def post(self):
        payload = api.payload
        print(f"payload mode: {payload}", file=sys.stderr)
        return productionReportService.create_productionReports("motherLot", payload)

    @api.doc(
        "Update single or multiple productionReports",
        responses={
            200: ("productionReports data successfully updated", control_resp),
            404: "productionReports not found",
        },
    )
    @api.expect([productionReport_put], validate=True)
    @controller_entrance_log(description="Update single or multiple productionReports")
    def put(self):
        payload = api.payload
        return productionReportService.update_productionReports("motherLot", payload)

@api.route("/childLot")
class productionReportController(Resource):
    productionReport_resp = productionReportDto.productionReport_paging
    productionReport_post = productionReportDto.productionReport_post
    productionReport_put = productionReportDto.productionReport_put
    control_resp = productionReportDto.productionReport_resp

    @api.doc(
        "Create single or multiple productionReports",
        responses={
            200: ("productionReport data successfully created", control_resp),
            404: "productionReport created failed",
        },
    )
    @api.expect([productionReport_post], validate=True)
    @controller_entrance_log(description="Create single or multiple productionReports")
    def post(self):
        payload = api.payload
        print(f"payload mode: {payload}", file=sys.stderr)
        resp, code = productionReportService.create_productionReports("childLot", payload)
        productionReportService.update_motherLotsAfterChildChanged(payload)
        return resp, code

    @api.doc(
        "Update single or multiple productionReports",
        responses={
            200: ("productionReports data successfully updated", control_resp),
            404: "productionReports not found",
        },
    )
    @api.expect([productionReport_put], validate=True)
    @controller_entrance_log(description="Update single or multiple productionReports")
    def put(self):
        payload = api.payload
        resp, code = productionReportService.update_productionReports("childLot", payload)
        productionReportService.update_motherLotsAfterChildChanged(payload)
        return resp, code



@api.route("/<int:id>")
@api.param("id", "id of the productionReport")
class productionReportController(Resource):
    productionReport_resp = productionReportDto.productionReport_resp
    control_input = productionReportDto.productionReport_put_withoutID
    control_resp = productionReportDto.control_resp

    @api.doc(
        "Get a specific productionReport",
        responses={
            200: ("productionReport data successfully sent", productionReport_resp),
            404: "productionReport not found",
        },
    )
    @controller_entrance_log(description="Get a specific productionReport")
    def get(self, id):
        return productionReportService.get_productionReport(id)

    @api.doc(
        "update the current productionReport",
        responses={
            200: ("productionReport data successfully updated", productionReport_resp),
            404: "productionReport not found",
        },
    )
    @api.expect(control_input, validate=True)
    @controller_entrance_log(description="update the current productionReport")
    def put(self, id):
        payload = api.payload
        remove_props = ["id"]
        for prop in remove_props:
            payload.pop(prop, None)
        return productionReportService.update_productionReport(id, payload)

    @api.doc(
        "delete the current productionReport",
        responses={
            200: ("productionReport data successfully deleted", control_resp),
            404: "productionReport not found",
        },
    )
    @controller_entrance_log(description="delete the current productionReport")
    def delete(self, id):
        return productionReportService.delete_productionReport(id)


@api.route("/<int_list:ids>")
@api.param("ids", "ids of the productionReport", required=True, default="[1,2,3]", type="int_list")
class productionReportController(Resource):
    control_input = productionReportDto.productionReport_put_withoutID
    control_resp = productionReportDto.control_resp

    @api.doc(
        "Update the current productionReports",
        responses={
            200: ("productionReports data successfully updated", control_resp),
            404: "productionReports not found",
        },
    )
    @api.expect(control_input, validate=True)
    @controller_entrance_log(description="Update the current productionReports")
    def put(self, ids):
        payload = api.payload
        remove_props = ["id"]
        for prop in remove_props:
            payload.pop(prop, None)
        return productionReportService.update_productionReports_samePayload(ids, payload)


    @api.doc(
        "delete the current productionReports",
        responses={
            200: ("productionReports data successfully deleted", control_resp),
            404: "productionReports not found",
        },
    )
    @controller_entrance_log(description="delete the current productionReports")
    def delete(self, ids):
        return productionReportService.delete_productionReports(ids)



