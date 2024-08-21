from datetime import datetime
import os
from flask import current_app

#from pyModbusTCP.client import ModbusClient
import time
import struct
from sqlalchemy.orm.attributes import flag_modified

from app import db
from app.adapters.modbus_client_manager import ModbusClientManager
from app.utils_log import message, err_resp, internal_err_resp, acceptable_condition_check
from app.models.device import Devices, ControlHistory, ControlState , PublishState
from app.models.register_setting import GatewaySetting, DeviceSetting, RegisterSetting
from .schemas import HousesSchema, DevicesSchema
from app.models.mqtt import MQTT, MQTT_publisher
from sqlalchemy.sql import column
import logging

mqtt_client = MQTT()
devices_schema = DevicesSchema()

def timestamp():
    return datetime.utcnow()

def init_modbus_clients():
    gateway_settings = db.session.execute(
        db.select(GatewaySetting)
    ).scalars()
    current_app.logger.info('modbus client done')
    ModbusClientManager.init_clients(gateway_settings)

def set_plc(device_setting, gateway_setting, control_history, register_id , register_setting):
    #SKIP Condition
    #resp = message(True, "SKIP Set_PLC")
    #if mqtt_client.ON and mqtt_client.RemoteENV:
    #    return  resp, 100
    try:
        init_modbus_clients()

        # TODO: 1. Write preset value to PLC
        gateway_id = gateway_setting.id
        register_write_loc = register_setting.write_loc
        register_read_loc = register_setting.read_loc
        register_length = register_setting.length
        register_modbus_type = register_setting.modbus_type
        register_calibration = register_setting.calibration
        client = ModbusClientManager.get_client(gateway_id)

        if register_modbus_type == 'ci':
            
            if client.write_single_coil(int(register_write_loc), int(control_history.preset)):
                retry_count = 0
                max_retreies = 5
                while (retry_count < max_retreies):
                    read_register = client.read_coils(register_read_loc, register_length)
                    actual_value = "1" if read_register[0] == True else "0"
                    control_history.actual = actual_value
                    if read_register[0] == bool(int(control_history.preset)):
                        control_history.state = ControlState.CONTROL_SUCCESS
                        # Update snapshot as well
                        '''
                        devices_db = Devices.query.first()
                        for device in devices_db.devices:
                            if device['device_id'] == regisrer_id:
                                device['device_value'] = read_register[0]
                        devices_db.timestamp = datetime.utcnow()
                        flag_modified(devices_db, 'devices')
                        db.session.add(devices_db)
                        '''
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
            
            current_app.logger.info("write ci  state done") 
        elif register_modbus_type == 'hr':
            current_app.logger.info(f"register_modbus_type {register_modbus_type}")

            if register_calibration == "IEEE754":
                current_app.logger.info(register_calibration)
                dword_representation = struct.pack('!f' , float(control_history.preset))
                dword_high, dword_low = struct.unpack('!HH', dword_representation)
                if client.write_multiple_registers(int(register_write_loc), [dword_low,dword_high]): 
                    current_app.logger.info(f"write done")
                    retry_count = 0
                    max_retreies = 5

                    while (retry_count < max_retreies):
                        read_register = client.read_holding_registers(register_read_loc, register_length)
                        current_app.logger.info(read_register)
                        high = read_register[1]
                        low = read_register[0]
                        dword_combined = (high << 16) | low
                        binary_data = struct.pack('!I', dword_combined)
                        float_value = round(struct.unpack('!f', binary_data)[0],2)
                        actual_value = float_value
                        control_history.actual = actual_value
                        if round(float_value , ndigits=2) == round(float(control_history.preset) , ndigits=2):
                           
                            control_history.state = ControlState.CONTROL_SUCCESS
                            
                            # Update snapshot as well
                            '''
                            devices_db = Devices.query.first()
                            for device in devices_db.devices:
                                if device['device_id'] == resgister_id:
                                    device['device_value'] = read_register[0]
                            devices_db.timestamp = datetime.utcnow()
                            flag_modified(devices_db, 'devices')
                            db.session.add(devices_db)
                            '''
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
            elif register_calibration == "1":
                current_app.logger.info(register_calibration)
                current_app.logger.info(control_history.preset)
                if client.write_multiple_registers(int(register_write_loc), [int(control_history.preset)]): 
                    current_app.logger.info(f"control done")
                    retry_count = 0
                    max_retreies = 5

                    while (retry_count < max_retreies):
                        read_register = client.read_holding_registers(register_read_loc, register_length)
                        value = read_register[0]

                        actual_value = (value)
                        control_history.actual = actual_value
                        if round(value , ndigits=2) == round(float(control_history.preset) , ndigits=2):
                           
                            control_history.state = ControlState.CONTROL_SUCCESS
                            
                            # Update snapshot as well
                            '''
                            devices_db = Devices.query.first()
                            for device in devices_db.devices:
                                if device['device_id'] == resgister_id:
                                    device['device_value'] = read_register[0]
                            devices_db.timestamp = datetime.utcnow()
                            flag_modified(devices_db, 'devices')
                            db.session.add(devices_db)
                            '''
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



        # client.open()
        # if not client.is_open:
        #     current_app.logger.error(f"client state is {client.is_open}")
        #     return internal_err_resp()

        # TODO: 2. Get actual value from PLC and save to DB
       
        db.session.add(control_history)
        db.session.commit()
        
        resp = message(False, "Control did not execute successfully ")
        return resp, 500
    except Exception as error:
        current_app.logger.info(error)


def house_status(house):
    """Get house status by house["devices"] and house["devices"]["values"]
    1. get key devices
    2. get reg of each device
    3. check reg value to setup status
    4. return status
    PS. status order: ABNORMAL > NORMAL > UNKNOWN
    """
    status = "UNKNOWN"
    method_act = False


    current_app.logger.info(f"house_status house:{house['id']}~~~~~~~~~~~")

    #if Status check method == "INTERVAL"(acceptable_condition, able to match multiple intervals)
    if os.environ.get('STATUS_CHECK', "DEFAULT") == "INTERVAL":
        method_act = True
        register_settings = db.session.execute(
            db.select(RegisterSetting)
            .where(column('acceptable_condition') != None)
            .where(column('gateway_id') == house["id"])
            .order_by(RegisterSetting.device_id)
            ).scalars()
        register_settings = register_settings.all()
    else:
        register_settings = [] #skip this method
    regs_in_house = [reg for reg in register_settings if house["id"] == reg.gateway_id]
    for reg in regs_in_house:
        #find device value and fill
        device = next((device for device in house['devices'] if device["id"] == reg.device_id),{"values":[]}) #default empty device
        test_val = next((sensor['value'] for sensor in device['values'] if reg.id == sensor['id']),"INF") #default inf (not belong any interval)
        condition_pass = False
        for condition in reg.acceptable_condition:
            condition_pass = acceptable_condition_check(condition, test_val) or condition_pass
            current_app.logger.info(f"{reg.id},{condition},{test_val},{condition_pass}")

        match device["type"]:
            case "FAN":
                status = "NORMAL" if (status != "ABNORMAL" and condition_pass) else status
            case "COOLING_PAD":
                status = "NORMAL" if (status != "ABNORMAL" and condition_pass) else status
            case "TEMP_HUMI_SENSOR":
                status = "ABNORMAL" if (status != "ABNORMAL" and not condition_pass) else status
            case _:
                pass

    #if Status check method == "DEFAULT" (fan,cooling_pad, 15 < temp < 40) or no any method is active
    if os.environ.get('STATUS_CHECK', "DEFAULT") == "DEFAULT" or not method_act:
        method_act = True
        judge_devices = [device for device in house['devices'] if device["type"] in ("FAN","COOLING_PAD","TEMP_HUMI_SENSOR")]
    else:
        judge_devices = [] #skip this method
    for device in judge_devices:
        reg_list = [reg for reg in device["values"]]
        match device["type"]:
            case "FAN":
                fan_powers = [reg for reg in reg_list if 'POWER' in reg["name"]]
                for fan in fan_powers:
                    if status != "ABNORMAL" and fan["value"]:
                        status = "NORMAL"
            case "COOLING_PAD":
                cooling_powers = [reg for reg in reg_list if 'POWER' in reg["name"]]
                for cooling in cooling_powers:
                    if status != "ABNORMAL" and cooling["value"]:
                        status = "NORMAL"
            case "TEMP_HUMI_SENSOR":
                sensor_TEMP = [reg for reg in reg_list if 'SENSOR_TEMP' in reg["name"]]
                for sensor in sensor_TEMP:
                    if status != "ABNORMAL" and (sensor["value"] > 40 or sensor["value"] < 15):
                        status = "ABNORMAL"
            case _:
                pass
    return status

class HouseService:
    @staticmethod
    def get_houses():
        try:
            if not (houses_db := Devices.query.first()):
                return err_resp("Houses not found", "devices_404", 404)

            houses_dto = devices_schema.dump(houses_db)
            if houses_dto:
                status = "UNKNOWN"
                for house in houses_dto['devices']:
                    house["status"] = house_status(house)
                    house.pop("devices", []) # remove redundant info
                    # this display permission should be move to other api
                    # now just for quick solution to setup here
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
                        house["display"] = permissions_obj
                    else:
                        permissions_obj = {
                            "version": "v0",
                            "permissions":{
                                "deviceMonitoring":True,
                                "meterData":True,
                                "waterMeterInformation":True,
                                "parameterSettings":True,
                            }
                        }
                        house["display"] = permissions_obj
                    
                result = houses_dto['devices']
            else:
                result = []
                
            resp = message(True, "Houses data sent")
            resp["data"] = result

            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()
    @staticmethod
    def get_devices(house_id):
        try:
            if not (houses_db := Devices.query.first()):
                return err_resp("Houses not found", "devices_404", 404)

            houses_dto = devices_schema.dump(houses_db)
            # specific_house = [house for house in houses_dto['devices'] if house.get('id')==house_id][0]
            specific_house = next((house for house in houses_dto['devices'] if house.get('id')==house_id),None)

            resp = message(True, "Houses data sent")
            if specific_house:
                resp["data"] = specific_house["devices"]
            else:
                resp["data"] = []

            return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def upsert_devices(payload):
        # Required values
        devices = payload["devices"]

        try:
            houses_db = Devices.query.first()
            if houses_db is None:
                houses_db = Devices(
                    devices=devices,
                    timestamp=datetime.utcnow(),
                )
            else:
                houses_db.devices = devices
                houses_db.timestamp = datetime.utcnow()

            db.session.add(houses_db)
            db.session.flush()

            houses_dto = devices_schema.dump(houses_db)

            db.session.commit()

            resp = message(True, "Houses has been updated..")
            resp["data"] = houses_dto

            return resp, 201

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def execute(register_id, payload):
        try:
            # Get the device setting
            if not (register_setting := RegisterSetting.query.get(register_id)):
                return err_resp("Device not found", "device_404", 404)
         

            #plc_setting = device_setting.plc
            gateway_setting = register_setting.gateway
            device_setting = register_setting.device
            if not (device_setting.enabled and register_setting.controllable and gateway_setting.enabled and register_setting.enabled):
                return err_resp("Device not controllable", "device_403", 403)

            # Initialize new control record
            control_history = ControlHistory(
                device_id=register_id,
                preset=str(payload["command"])
            )
            

            db.session.add(control_history)
            db.session.commit()
            current_app.logger.info("db commit done")
            

           # resp,code = MQTT_command_publisher(control_history, register_id, payload)
            #if code != 100:
            #    return resp, code
            resp,code = set_plc(device_setting, gateway_setting, control_history, register_id , register_setting)
            if code != 100:
                return resp, code

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()
