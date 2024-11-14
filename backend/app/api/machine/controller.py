from flask import request,current_app
from flask_restx import Resource
from flask_restx import inputs
from app.utils_log import controller_entrance_log
from .service import MachineService
from .dto import MachineDto
api = MachineDto.api


@api.route("/")
class MachineController(Resource):
    machine_resp = MachineDto.machine_resp

    # GET
    @api.doc(description="""取得全部或單一的機台資料"""
            )
    @api.doc(
        "Get machines",
        responses={
            200: ("machine data successfully sent", machine_resp),
            404: "machine not found",
        },
    )
    @api.param("id", "Machine ID")
    @controller_entrance_log(description="Get machines")
    def get(self):
        id = request.args.get('id', default=None, type=int)
        return MachineService.get_machines(id)


@api.route("/list")
class MachineController(Resource):
    machine_resp = MachineDto.machine_resp

    # GET
    @api.doc(description="""取得全部機台清單(ID, 區域, 機台編號)"""
            )
    @api.doc(
        "Get machine list",
        responses={
            200: ("machine data successfully sent", machine_resp),
            404: "machine not found",
        },
    )
    @controller_entrance_log(description="Get machine list")
    def get(self):
        return MachineService.get_machine_list()
    