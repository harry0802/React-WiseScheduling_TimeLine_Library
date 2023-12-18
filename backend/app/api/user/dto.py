from flask_restx import Namespace, fields


class UserDto:
    api = Namespace("users", description="User related operations.")

    user = api.model(
        "User object",
        {
            "email": fields.String,
            "name": fields.String,
            "username": fields.String,
            "joined_date": fields.DateTime,
            "role_id": fields.Integer,
        },
    )

    data_resp = api.model(
        "User Data Response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "user": fields.Nested(user),
        },
    )

    change_password = api.model(
        "Change password data",
        {
            "new_password": fields.String
        }
    )

    change_password_success = api.model(
        "Change password successfully",
        {
            "status": fields.Boolean,
            "message": fields.String,
        }
    )


    v0_permission = api.model(
        "Permission v0",
        {
            "deviceMonitoring":fields.Boolean,
            "meterData":fields.Boolean,
            "waterMeterInformation":fields.Boolean,
            "parameterSettings":fields.Boolean,
        }
    )

    permission_model = api.model(
        "Permission",
        {
            "version": fields.String,
            "permissions":fields.Nested(v0_permission)
        }
    )

    user_permissions = api.model(
        "Permissions response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(permission_model)
        }
    )
