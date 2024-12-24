from flask import request,current_app
from flask_restx import Resource
from app.utils_log import controller_entrance_log
from .service import MaintenanceService
from .dto import MaintenanceDto
from .schemas import MaintenanceSchema

api = MaintenanceDto.api
control_schema = MaintenanceSchema()


@api.route("/machine/")
class MachineMaintenanceController(Resource):
    machine_resp = MaintenanceDto.machine_resp
    machine_put = MaintenanceDto.machine_put

    # GET
    @api.doc(
        "Get machine maintenances",
        responses={
            200: ("machine maintenance data successfully sent", machine_resp),
            404: "machine maintenance not found",
        },
    )
    @api.param("machineId", "機台ID")
    @api.param("year", "年份")
    @api.param("week", "第幾週")
    @controller_entrance_log(description="Get machine maintenances")
    def get(self):
        machineId = request.args.get('machineId', default=1, type=int)
        year = request.args.get('year', default=2024, type=int)
        week = request.args.get('week', default=1, type=int)
        return MaintenanceService.get_machineMaintenance(machineId, year, week)

    # PUT
    @api.doc(
        "Update machine maintenances",
        responses={
            200: ("machine maintenance data successfully updated"),
            404: "machine maintenance not found",
        },
    )
    @api.expect(machine_put, validate=True)
    @controller_entrance_log(description="Update machine maintenances")
    def put(self):
        return MaintenanceService.update_machineMaintenance(payload = api.payload)


@api.route("/mold/")
class MoldMaintenanceController(Resource):
    mold_resp = MaintenanceDto.mold_resp
    mold_put = MaintenanceDto.mold_put

    # GET
    @api.doc(
        "Get mold maintenances",
        responses={
            200: ("mold maintenance data successfully sent", mold_resp),
            404: "mold maintenance not found",
        },
    )
    @api.param("moldSN", "機台編號")
    @api.param("year", "年份")
    @api.param("week", "第幾週")
    @controller_entrance_log(description="Get mold maintenances")
    def get(self):
        moldSN = request.args.get('moldSN', default=None, type=str)
        year = request.args.get('year', default=2024, type=int)
        week = request.args.get('week', default=1, type=int)
        return MaintenanceService.get_moldMaintenance(moldSN, year, week)

    # PUT
    @api.doc(
        "Update mold maintenance",
        responses={
            200: ("mold maintenance data successfully updated", mold_resp),
            404: "mold maintenance not found",
        },
    )
    @api.expect(mold_put, validate=True)
    @controller_entrance_log(description="Update mold maintenances")
    def put(self):
        return MaintenanceService.update_moldMaintenance(api.payload)


@api.route("/moldSNs")
class MoldMaintenanceController(Resource):
    @api.doc(
        "Get distinct moldSNs",
        responses={
            200: ("moldSNs data successfully sent", []),
            404: "moldSNs not found",
        },
    )
    @controller_entrance_log(description="Get distinct moldSNs")
    def get(self):
        return MaintenanceService.get_moldSNs()
