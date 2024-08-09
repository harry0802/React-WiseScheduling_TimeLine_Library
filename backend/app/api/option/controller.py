from flask import request,current_app
from flask_restx import Resource
from app.utils import controller_entrance_log
from .service import optionService
from .dto import optionDto
from .schemas import optionSchema
from .models.processCategory import ProcessCategory

api = optionDto.api
control_schema = optionSchema()
name_param = f"""The name of the option: 
           (製程選項的分類){ProcessCategory().__name__}: {ProcessCategory().__dict__}
           """

@api.route("/<name>")
@api.param("name", name_param)
class optionController(Resource):
    option_post = optionDto.option_post

    # GET
    @api.doc(
        "Get options",
        responses={
            200: ("option data successfully sent"),
            404: "option not found",
        },
    )
    @api.param("id", "the id of the object in content field")
    @controller_entrance_log(description="Get options")
    def get(self, name):
        id = request.args.get('id', default=None, type=int)
        return optionService.get_options(name, id)

    
    # POST
    @api.doc(
        "Create option",
        responses={
            200: ("option data successfully created"),
            404: "option not found",
        },
    )
    @api.expect(option_post, validate=True)
    @controller_entrance_log(description="Create option")
    def post(self, name):
        payload = api.payload
        return optionService.create_option(name, payload)


    # PUT
    @api.doc(
        "Update option",
        responses={
            200: ("option data successfully updated"),
            404: "option not found",
        },
    )
    @api.expect(option_post, validate=True)
    @controller_entrance_log(description="Update option")
    def put(self, name):
        payload = api.payload
        return optionService.update_option(name, payload)
    

@api.route("/<name>/<int:id>")
@api.param("name", name_param)
class optionController(Resource):
    # DELETE
    @api.doc(
        "Delete option",
        responses={
            200: ("option data successfully deleted"),
            404: "option not found",
        },
    )
    @controller_entrance_log(description="Delete option")
    def delete(self, name, id):
        return optionService.delete_option(name, id)
    