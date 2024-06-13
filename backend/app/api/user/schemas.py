from marshmallow import Schema


class UserSchema(Schema):
    class Meta:
        # Fields to expose, add more if needed.
        fields = ("email", "name", "username", "joined_date", "role_id")
