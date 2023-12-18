from datetime import datetime
from flask import current_app

#from pyModbusTCP.client import ModbusClient
import time
from sqlalchemy.orm.attributes import flag_modified

from app import db
from app.adapters.modbus_client_manager import ModbusClientManager
from app.utils import message, err_resp, internal_err_resp
from app.models.device import Devices, ControlHistory, ControlState , PublishState
from app.models.register_setting import DeviceSetting
from .schemas import DevicesSchema
from app.models.mqtt import MQTT, MQTT_publisher
mqtt_client = MQTT()
devices_schema = DevicesSchema()

def timestamp():
    return datetime.utcnow()

def set_plc(device_setting, plc_setting, control_history, device_id):
    #SKIP Condition
    resp = message(True, "SKIP Set_PLC")
    if mqtt_client.ON and mqtt_client.RemoteENV:
        return  resp, 100

    try:
        # TODO: 1. Write preset value to PLC
        plc_id = plc_setting.id
        plc_write_loc = device_setting.plc_write_loc
        plc_read_loc = device_setting.plc_read_loc
        plc_length = device_setting.plc_length

        client = ModbusClientManager.get_client(plc_id)
        # client.open()
        # if not client.is_open:
        #     current_app.logger.error(f"client state is {client.is_open}")
        #     return internal_err_resp()

        # TODO: 2. Get actual value from PLC and save to DB
        if client.write_single_coil(int(plc_write_loc), int(control_history.preset)):
            retry_count = 0
            max_retreies = 5
            while (retry_count < max_retreies):
                read_plc = client.read_coils(plc_read_loc, plc_length)
                actual_value = "1" if read_plc[0] == True else "0"
                control_history.actual = actual_value
                if read_plc[0] == bool(int(control_history.preset)):
                    control_history.state = ControlState.CONTROL_SUCCESS
                    # Update snapshot as well
                    devices_db = Devices.query.first()
                    for device in devices_db.devices:
                        if device['device_id'] == device_id:
                            device['device_value'] = read_plc[0]
                    devices_db.timestamp = datetime.utcnow()
                    flag_modified(devices_db, 'devices')
                    db.session.add(devices_db)
                    db.session.add(control_history)
                    db.session.commit()
                    resp = message(
                        True, "Control has been successfully executed.")
                    return resp, 200
                else:
                    retry_count += 1
                    time.sleep(1)

            control_history.state = ControlState.READ_FAILED
        else:
            control_history.state = ControlState.WRITE_FAILED
        db.session.add(control_history)
        db.session.commit()
        resp = message(False, "Control did not execute successfully ")
        return resp, 500
    except Exception as error:
        current_app.logger.info(error)


def MQTT_command_publisher(control_history, device_id, payload):
    #SKIP Condition
    resp = message(True, "SKIP MQTT_publisher")
    if not mqtt_client.ON:
        return  resp, 100
    if not mqtt_client.RemoteENV:
        return  resp, 100

    timestamp = datetime.utcnow()
    # TODO: MQTT Publish control command
    current_app.logger.info(f"mqtt publish at {timestamp} start")
    try:
        mqtt_message = {
            "device_id" : device_id,
            "command" : payload["command"]
        }
        resp, code = MQTT_publisher(mqtt_client, mqtt_message)
        if code == 200:
            control_history.state = PublishState.PUBLISH_SUCCESS
            db.session.add(control_history)
            db.session.commit()
        return resp, code

    except Exception as error:
        current_app.logger.info(error)
        control_history.state = PublishState.PUBLISH_FAILED
        db.session.add(control_history)
        db.session.commit()

class DeviceService:
    @staticmethod
    def get_devices():
        try:
            if not (devices_db := Devices.query.first()):
                return err_resp("Devices not found", "devices_404", 404)

            devices_dto = devices_schema.dump(devices_db)

            resp = message(True, "Devices data sent")
            resp["data"] = devices_dto
            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def upsert_devices(payload):
        # Required values
        devices = payload["devices"]

        try:
            devices_db = Devices.query.first()
            if devices_db is None:
                devices_db = Devices(
                    devices=devices,
                    timestamp=datetime.utcnow(),
                )
            else:
                devices_db.devices = devices
                devices_db.timestamp = datetime.utcnow()

            db.session.add(devices_db)
            db.session.flush()

            devices_dto = devices_schema.dump(devices_db)

            db.session.commit()

            resp = message(True, "Devices has been updated..")
            resp["data"] = devices_dto

            return resp, 201

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def execute(device_id, payload):
        try:
            # Get the device setting
            if not (device_setting := DeviceSetting.query.get(device_id)):
                return err_resp("Device not found", "device_404", 404)

            plc_setting = device_setting.plc
            if not (device_setting.enabled and device_setting.controllable and plc_setting.enabled):
                return err_resp("Device not controllable", "device_403", 403)

            # Initialize new control record
            control_history = ControlHistory(
                device_id=device_id,
                preset="1" if payload["command"] == "ON" else "0"
            )

            db.session.add(control_history)
            db.session.commit()
            current_app.logger.info("db commit done")

            resp,code = MQTT_command_publisher(control_history, device_id, payload)
            if code != 100:
                return resp, code
            resp,code = set_plc(device_setting, plc_setting, control_history, device_id)
            if code != 100:
                return resp, code

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()
