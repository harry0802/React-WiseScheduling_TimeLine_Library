from flask import current_app
from app.utils import err_resp, message, internal_err_resp
from app.models.user import User
from app.api.user.schemas import UserSchema

user_schema = UserSchema()


class UserService:
    @staticmethod
    def get_user_data(username):
        """ Get user data by username """
        if not (user := User.query.filter_by(username=username).first()):
            return err_resp("User not found!", "user_404", 404)
        try:
            user_data = user_schema.dump(user)

            resp = message(True, "User data sent")
            resp["user"] = user_data
            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()
