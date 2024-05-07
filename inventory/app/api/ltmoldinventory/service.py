import sys

import pytz
from sqlalchemy import DATE, Date, cast, func
from app import db
from flask import current_app
from sqlalchemy.sql import column
from app.utils import err_resp, message, internal_err_resp
from app.models.ltmoldinventory import LtMoldInventory
from .schemas import LtMoldInventorySchema
from datetime import datetime

ltmoldinventory_schema = LtMoldInventorySchema()

def format_insert_update_obj(db_obj, payload):
    db_obj.rfidno = payload["rfidno"] \
        if payload.get("rfidno") is not None else db_obj.rfidno
    db_obj.finalinventory = datetime.fromisoformat(payload["finalinventory"]) \
        if payload.get("finalinventory") is not None else db_obj.finalinventory
    db_obj.memo = payload["memo"] \
        if payload.get("memo") is not None else db_obj.memo
    return db_obj

class LtMoldInventoryService:
    @staticmethod
    def insert_update_ltmoldinventory(payload):
        try:
            isnert_update_obj_list = []
            for data in payload:
                # convert data["finalinventory"] to UTC time
                converted_finalinventory = datetime.fromisoformat(data["finalinventory"])
                converted_finalinventory = converted_finalinventory.astimezone(pytz.utc).strftime("%Y-%m-%d")
                select_result = db.session.execute(
                    db.select(LtMoldInventory)
                    .where(func.FROM_UNIXTIME(LtMoldInventory.finalinventory).cast(Date) == converted_finalinventory) # 將資料庫中的finalinventory轉換成日期格式
                    .where(LtMoldInventory.rfidno == data['rfidno'])
                ).scalar_one_or_none()

                if not (select_result):
                    isnert_update_obj = format_insert_update_obj(LtMoldInventory(), data)
                else:
                    isnert_update_obj = format_insert_update_obj(select_result, data)
                isnert_update_obj_list.append(isnert_update_obj)

            db.session.add_all(isnert_update_obj_list)
            db.session.flush()
            db.session.commit()

            dump_data = ltmoldinventory_schema.dump(isnert_update_obj_list, many=True)
            resp = message(True, "LtMoldInventory data sent")
            resp["data"] = dump_data
            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return error
