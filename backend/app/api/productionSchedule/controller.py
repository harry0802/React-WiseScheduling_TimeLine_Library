from datetime import datetime
from flask import request
from flask_restx import Resource

from app.utils import validation_error

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
    @api.param("status_filter", "on-going, finish, delay, delay-finish, all")
    @api.param("week_filter", "(planFinishDate) week number")
    @api.param("year_filter", "(planFinishDate) year number")
    @api.param("month_filter", "(planFinishDate) month number")
    def get(self):
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=0, type=int)
        sort = request.args.get('sort', default="id", type=str)
        status_filter = request.args.get('status_filter', default="all", type=str)
        week_filter = request.args.get('week_filter', default=None, type=int)
        year_filter = request.args.get('year_filter', default=None, type=int)
        month_filter = request.args.get('month_filter', default=None, type=int)

        return productionScheduleService.get_productionSchedules(
            page=page, size=size, sort=sort, status_filter=status_filter,
            week_filter=week_filter, year_filter=year_filter, month_filter=month_filter)
    
    @api.doc(
        "Create the current productionSchedule",
        responses={
            200: ("productionSchedule data successfully created", control_resp),
            404: "productionSchedule not found",
        },
    )
    @api.expect(control_input, validate=True)
    def post(self):
        payload = api.payload
        return productionScheduleService.create_productionSchedule(payload)



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
    def delete(self, ids):
        return productionScheduleService.delete_productionSchedules(ids)