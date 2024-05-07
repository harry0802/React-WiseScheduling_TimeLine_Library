import sys
from app import db
from flask import current_app
from app.utils import err_resp, message, internal_err_resp
from app.models.ltmoldmap import LtMoldMap
from .schemas import LtMoldMapSchema

ltmoldmap_schema = LtMoldMapSchema()


class LtMoldMapService:
    @staticmethod
    def get_all_data():
        """ Get all LtMoldMap data"""
        try:
            select_result = db.session.execute(db.select(LtMoldMap)).scalars()
            select_result = select_result.all()
            if not (select_result):
                return err_resp("LtMoldMap not found!!!", "404", 404)
            else:
                dump_data = ltmoldmap_schema.dump(select_result, many=True)
                resp = message(True, "LtMoldMap data sent")
                resp["data"] = dump_data
                return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()
