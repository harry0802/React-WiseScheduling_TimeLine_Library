from datetime import datetime, timedelta, timezone
import sys
from app import db
from app.models.productionScheduleOngoing import ProductionScheduleOngoing
from app.api.smartSchedule.service import SmartScheduleService
from sqlalchemy import literal
from app.utils_log import message, err_resp, internal_err_resp


def complete_productionScheduleOngoing(db_obj, payload):
    db_obj.productionScheduleId = int(payload["productionScheduleId"]) \
        if payload.get("productionScheduleId") is not None else db_obj.productionScheduleId
    db_obj.startTime = datetime.fromisoformat(payload["startTime"]) \
        if payload.get("startTime") is not None else db_obj.startTime
    db_obj.endTime = datetime.fromisoformat(payload["endTime"]) \
        if payload.get("endTime") is not None else db_obj.endTime
    db_obj.postponeTime = datetime.fromisoformat(payload["postponeTime"]) \
        if payload.get("postponeTime") is not None else db_obj.postponeTime
    return db_obj


class ProductionScheduleOngoingService:
    @staticmethod
    def get_productionScheduleOngoing_by_productionScheduleId(productionScheduleId):
        """取得製令單的生產中紀錄

        Args:
            productionScheduleId (_type_): _description_

        Raises:
            error: _description_

        Returns:
            _type_: _description_
        """
        try:
            productionScheduleOngoing_db = ProductionScheduleOngoing.query.filter_by(
                productionScheduleId=productionScheduleId
            ).order_by(ProductionScheduleOngoing.startTime.desc()).first()
            if productionScheduleOngoing_db:
                return productionScheduleOngoing_db
            return None
        except Exception as error:
            raise error


    @staticmethod
    def create_productionScheduleOngoing(payload):
        """在派工系統開始母單時，新建並紀錄開始時間

        Args:
            payload (_type_): _description_

        Raises:
            error: _description_

        Returns:
            _type_: _description_
        """
        try:
            productionScheduleOngoing_db = complete_productionScheduleOngoing(ProductionScheduleOngoing(), payload)
            db.session.add(productionScheduleOngoing_db)
            db.session.commit()
            return productionScheduleOngoing_db
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    @staticmethod
    def update_productionScheduleOngoing_endtime(payload):
        """在派工系統暫停母單時，更新結束時間
           在派工系統完成母單時，更新結束時間

        Args:
            payload (_type_): _description_

        Raises:
            error: _description_

        Returns:
            _type_: _description_
        """
        try:
            productionScheduleOngoing_db = ProductionScheduleOngoing.query.filter_by(id=payload["id"]).first()
            if productionScheduleOngoing_db is None:
                return err_resp("ProductionScheduleOngoing not found.", "ProductionScheduleOngoing_404", 404)
            productionScheduleOngoing_db = complete_productionScheduleOngoing(productionScheduleOngoing_db, payload)
            db.session.commit()

            # 更新其他排程系統的時間
            SmartScheduleService.update_work_order_schedule_by_endtime(payload["productionScheduleId"], payload["endTime"])

            resp = message(True, "ProductionScheduleOngoing have been updated.")
            return resp, 200
        except Exception as error:
            raise error


    @staticmethod
    def update_productionScheduleOngoing_postponetime(productionDict:dict, payload):
        """在派工系統完成子單時，或者暫停的製令單繼續開始時，更新延遲完成日

        Args:
            payload (_type_): _description_

        Raises:
            error: _description_

        Returns:
            _type_: _description_
        """
        try:
            # 延遲完成日期。公式：未完成數量 / 每小時產能 + 當天日期
            postponeTime = datetime.now(timezone.utc) + timedelta(hours=round(productionDict["unfinishedQuantity"] / productionDict["hourlyCapacity"]))
            payload["postponeTime"] = postponeTime.isoformat()

            productionScheduleOngoing_db = ProductionScheduleOngoing.query.filter_by(id=payload["id"]).first()
            if productionScheduleOngoing_db is None:
                return err_resp("ProductionScheduleOngoing not found.", "ProductionScheduleOngoing_404", 404)
            productionScheduleOngoing_db = complete_productionScheduleOngoing(productionScheduleOngoing_db, payload)
            db.session.commit()

             # 如果postponeTime比planFinishDate晚，就更新其他排程系統的時間
            if postponeTime > productionDict["planFinishDate"]:
                SmartScheduleService.update_work_order_schedule_by_endtime(payload["productionScheduleId"], payload["postponeTime"])
            
            # 如果是暫停的製令單繼續開始，則更新其他排程系統的時間
            if productionDict["isResume"]:
                    SmartScheduleService.update_work_order_schedule_by_resumption(payload["productionScheduleId"], payload["startTime"], payload["postponeTime"])
            
            resp = message(True, "ProductionScheduleOngoing have been updated.")
            return resp, 200
        except Exception as error:
            raise error
        