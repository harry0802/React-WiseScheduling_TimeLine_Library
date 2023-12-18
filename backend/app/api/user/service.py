import os
from flask import current_app

from app import db
from app.utils import err_resp, message, internal_err_resp
from app.models.user import User


class UserService:
    @staticmethod
    def get_user_by_name(username):
        """ Get user data by username """
        if not (user := User.query.filter_by(username=username).first()):
            return err_resp("User not found!", "user_404", 404)

        from .utils import load_data

        try:
            user_data = load_data(user)

            resp = message(True, "User data sent")
            resp["user"] = user_data
            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def get_user_by_id(user_id):
        # Get user data by user id
        if not (user_db := User.query.get(user_id)):
            return err_resp("User not found!", "user_404", 404)

        from .utils import load_data

        try:
            user_dto = load_data(user_db)

            resp = message(True, "Logged user data sent")
            resp["data"] = user_dto

            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def change_self_password(user_id, data):
        new_password = data["new_password"]
        print(new_password)

        # GEt user data by user id
        if not (user_db := User.query.get(user_id)):
            return err_resp("User not found!", "user_404", 404)

        try:
            user_db.password = new_password

            db.session.add(user_db)
            db.session.commit()

            resp = message(True, "Password successfully changed.")
            return resp, 200

        except Exception as error:
            current_app.loggger.error(error)
            return internal_err_resp()

    @staticmethod
    def get_permission_by_id(user_id):
        #1. get role by user id
        #2. get permission by role
        # the permission can be complex for general purpose
        # but the complex setting should work with diverse roles
        # permissions_sample = {
        #     "version": "vn",
        #     "permissions":{
        #         "dorm1":{
        #             "readable":["deviceMonitoring","meterData"],
        #             "writable":["deviceMonitoring"]
        #         },
        #         "dorm3":{
        #             "readable":["deviceMonitoring","meterData","waterMeterInformation","parameterSettings"],
        #             "readable":["deviceMonitoring","meterData","waterMeterInformation","parameterSettings"],
        #         }
        #     }
        # }
        if os.getenv("SPECIAL_PERMISSION") == "SINHUA":
            permissions_obj = {
                "version": "v0",
                "permissions":{
                    "deviceMonitoring":True,
                    "meterData":False,
                    "waterMeterInformation":False,
                    "parameterSettings":True,
                }
            }
        
            resp = message(True, "Display permissions(SINHUA)")
            resp["data"] = permissions_obj

            return resp, 200

        v0_permission = {
            "version": "v0",
            "permissions":{
                "deviceMonitoring":True,
                "meterData":False,
                "waterMeterInformation":False,
                "parameterSettings":False,
            }
        }
        default_permission = v0_permission

        # Get user data by user id
        if not (user_db := User.query.get(user_id)):
            return err_resp("User not found!", "user_404", 404)

        try:
            if user_db.role:
                permissions = user_db.role.ts_permissions
            else:
                permissions = default_permission
            
            permissions_obj = {
                "version": "v0",
                "permissions":permissions
            }

            resp = message(True, "User's permissions")
            resp["data"] = permissions_obj

            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()