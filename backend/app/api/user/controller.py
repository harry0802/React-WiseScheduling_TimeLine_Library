from flask import request
from flask_restx import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.utils_log import validation_error

from .service import UserService
from .dto import UserDto
from .schema import ChangePasswordSchema

api = UserDto.api
data_resp = UserDto.data_resp
change_password_success = UserDto.change_password_success

change_password_schema = ChangePasswordSchema()


@api.route("/me")
class MeController(Resource):
    @api.doc(
        "Get the current logged user",
        responses={
            200: ("Current logged user successfully sent", data_resp),
            404: "User not found!",
        },
    )
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        return UserService.get_user_by_id(current_user_id)


@api.route("/me/change-password")
class MeChangePassword(Resource):
    change_password = UserDto.change_password

    @api.doc(
        "Change password for the current logged user",
        responses={
            200: ("Password successfully changed", change_password_success),
            400: "Invalid new password",
            404: "User not found!",
        },
    )
    @jwt_required()
    @api.expect(change_password, validate=True)
    def post(self):
        change_password_data = request.get_json()

        # Validate data
        if (errors := change_password_schema.validate(change_password_data)):
            return validation_error(False, errors), 400

        current_user_id = get_jwt_identity()
        return UserService.change_self_password(current_user_id, change_password_data)


@api.route("/me/permission")
class MePermission(Resource):
    user_permissions = UserDto.user_permissions
    @api.doc(
        "Get the permission of the current logged user",
        responses={
            200: ("Current logged user successfully sent", user_permissions),
            404: "User not found!",
        },
    )
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        return UserService.get_permission_by_id(current_user_id)