# Validations with Marshmallow
from marshmallow import Schema, fields
from marshmallow.validate import Length


class ChangePasswordSchema(Schema):
    """/api/users/me/change-password

    Parameters:
    - new_password
    """

    new_password = fields.Str(required=True, validate=[Length(min=8, max=128)])
