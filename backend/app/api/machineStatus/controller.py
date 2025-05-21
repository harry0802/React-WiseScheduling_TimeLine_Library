from flask import request,current_app
from flask_restx import Resource
from flask_restx import inputs
from app.utils_log import controller_entrance_log
from .service import MachineStatusService
from .dto import MachineStatusDto
api = MachineStatusDto.api


@api.route("/")
class MachineStatusController(Resource):
    machineStatus_resp = MachineStatusDto.machineStatus_resp

    # GET
    @api.doc(description="""取得某一區全部機台，以及當日的機台狀態。
            有id，表示生管有預排，師傅改變機台狀態時，修改預排的actualStartDate或actualFinishDate；
            沒有id，表示生管沒有預排，師傅改變機台狀態時，要新增，新增planStartDate, planEndDate, actualStartDate。
            """)
    @api.doc(
        "Get machineStatuss",
        responses={
            200: ("machineStatus data successfully sent", machineStatus_resp),
            404: "machineStatus not found",
        },
    )
    @api.param("productionArea", "機台區域", type=str, required=True, enum=["A", "B", "C", "D"])
    @controller_entrance_log(description="Get machineStatuss")
    def get(self):
        productionArea = request.args.get('productionArea', default=None, type=str)
        return MachineStatusService.get_machineStatus(productionArea)
    
    # POST
    @api.doc(description="""新增單一機台的狀態""")
    @api.doc(
        "Create machineStatus",
        responses={
            201: ("machineStatus data successfully created", machineStatus_resp),
            400: "Invalid input",
        },
    )
    @api.expect(MachineStatusDto.machineStatus_post, validate=True)
    @controller_entrance_log(description="Create machineStatus")
    def post(self):
        return MachineStatusService.create_machineStatus(api.payload)
    
    # PUT
    @api.doc(description="""更新單一機台的狀態""")
    @api.doc(
        "Update machineStatus",
        responses={
            200: ("machineStatus data successfully updated", machineStatus_resp),
            400: "Invalid input",
        },
    )
    @api.expect(MachineStatusDto.machineStatus_put, validate=True)
    @controller_entrance_log(description="Update machineStatus")
    def put(self):
        return MachineStatusService.update_machineStatus(api.payload)
    

@api.route("/<int:id>")
class MachineStatusController(Resource):
    # DELETE
    @api.doc(description="""刪除單一機台的狀態""")
    @api.doc(
        "Delete machineStatus",
        responses={
            200: ("machineStatus data successfully deleted"),
            404: "machineStatus not found",
        },
    )
    @controller_entrance_log(description="Delete machineStatus")
    def delete(self, id):
        return MachineStatusService.delete_machineStatus(id)
    