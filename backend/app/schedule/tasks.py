from datetime import datetime
from flask import current_app
from pyModbusTCP.client import ModbusClient
import json
import struct

from app import scheduler, db
from app.adapters.modbus_client_manager import ModbusClientManager
from app.models.register_setting import DeviceSetting, GatewaySetting, RegisterSetting
from app.models.device import Devices, DeviceHistory

from app.models.mqtt import MQTT, MQTT_publisher
from app.utils import message
mqtt_client = MQTT()


def read_devices():
    # Fetch device settings
    register_settings = db.session.execute(
        db.select(RegisterSetting).order_by(RegisterSetting.id)).scalars()
    current_app.logger.info("Read Register Start")

    gateway = []
    speed_max = None
    for register_setting in register_settings:
        register_id = register_setting.id
        register_name = register_setting.name
        register_label = register_setting.label
        register_unit = register_setting.unit
        gateway_id = register_setting.gateway_id
        device_id = register_setting.device_id
        modbus_type = register_setting.modbus_type
        register_length = register_setting.length
        read_loc = register_setting.read_loc
        write_loc = register_setting.write_loc
        calibration = register_setting.calibration

        gateway_setting = register_setting.gateway
        gateway_name = gateway_setting.name
        gateway_type = gateway_setting.type
        gateway_label = gateway_setting.label
        
        device_setting = register_setting.device
        device_name = device_setting.name
        device_type = device_setting.type
        device_label = device_setting.label

        enabled = register_setting.enabled and device_setting.enabled and gateway_setting.enabled
        
        if not enabled:
            # Skip if the device is disabled
            continue
        # TODO: Get the value of this device

        # Get Modbus client by PLC ID
        client = ModbusClientManager.get_client(gateway_id)
        
        # log_info = [register_id,register_name,register_label,register_unit,gateway_id,device_id,modbus_type,register_length,read_loc,write_loc,calibration,enabled,gateway_setting,device_setting,gateway_name,gateway_type,gateway_label,device_name,device_type]
        # current_app.logger.info(f"modbus client, device:{log_info}")

        # if not client.is_open:
        #     current_app.logger.error(f"ModbusClient state is {client.is_open}")
        #     continue

        if modbus_type == 'hr':
            value = client.read_holding_registers(int(read_loc) , int(register_length))
            match calibration:
                case "IEEE754":
                    #hex1 = hex(value[1])
                    #hex2 = hex(value[0])
                    #high = int(hex1[2:], 16)
                    #low = int(hex2[2:], 16)
                    #dword_value = (high << 16) + low
                    #binary_data = dword_value.to_bytes(4, byteorder='big')
                    #value_float = str(struct.unpack('>f', binary_data)[0])
                    #plc_value = value_float[:5]
                    
                    high = value[1]
                    low = value[0]
                    dword_combined = (high << 16) | low
                    binary_data = struct.pack('!I', dword_combined)
                    value_float = '{:.2f}'.format(struct.unpack('!f', binary_data)[0])
                    plc_value = (value_float)
                case "HexToString":
                    #轉換16進制
                    plc_value = str(int(f"{value[0]:04X}"))[:6]
                case "WaterMeter":
                    hex1 = f"{value[0]:04X}"
                    hex2 = f"{value[1]:04X}"
                    hex3 = f"{value[2]:04X}"
                    hex4 = f"{value[3]:04X}"
                    water_value = int(hex1 + hex2 + hex3) * (10 ** -int(hex4)) 
                    plc_value = str(water_value)[:6]
                case "FAN":                  
                    RPM_MAX = client.read_holding_registers(94,1)    
                    plc_value = round(int(value[0]) * 100 / int(RPM_MAX[0]) , 2)
                    current_app.logger.info(f"FAN {value[0]} ,{plc_value} , {RPM_MAX[0]}")          
                case _:
                    plc_value = round(int(value[0]) * float(calibration), 2)  
        elif modbus_type == 'ci':
            value = client.read_coils(int(read_loc), int(register_length))
            plc_value = value[0]

        gateway_exists = False
        for gate in gateway:
            if gate["id"] == gateway_id:
                gateway_exists = True
                if device_id not in [device['id'] for device in gate['devices']]:
                    gate['devices'].append({
                        "id": device_id,
                        "name": device_name,
                        "label" : device_label,
                        "type": device_type,
                        "values": [],
                    })
                for device in gate['devices']:
                    if device['id'] == device_id:
                        device['values'].append({
                            "id": register_id,
                            "name": register_name,
                            "label": register_label,
                            "value": plc_value,
                            "unit": register_unit,
                        })
        if not gateway_exists:
            gateway.append({
                "id": gateway_id,
                "name": gateway_name,
                "label": gateway_label,
                "type": gateway_type,
                "devices": [{
                    "id": device_id,
                    "name": device_name,
                    "label": device_label,
                    "type": device_type,
                    "values": [{
                        "id": register_id,
                        "name": register_name,
                        "label": register_label,
                        "value": plc_value,
                        "unit": register_unit,
                    }]
                }]
            })
    return gateway


def init_modbus_clients():
    gateway_settings = db.session.execute(
        db.select(GatewaySetting)
    ).scalars()
    current_app.logger.info('modbus client done')
    ModbusClientManager.init_clients(gateway_settings)

@scheduler.task(
    "interval",
    id="device_snapshot",
    seconds=10,
    max_instances=1,
)
def refresh_snapshot():
    with scheduler.app.app_context():
        timestamp = datetime.utcnow()
        current_app.logger.info(f"refresh snapshot at {timestamp} start")
        try:
            if not mqtt_client.RemoteENV:
                #write control command
                try:
                    #write device_db
                    current_app.logger.info('remote false start')
                    init_modbus_clients()
                    devices = read_devices()
                    '''
                    if not devices:
                        devices.append({
                            "device_id": '0',
                            "device_name": '0',
                            "device_value": '0',
                            "order": '0',
                        })
                    '''
                    current_app.logger.info(f"modbus client read devices done, device:{devices}")

                    # Write to device
                    devices_db = Devices.query.first()
                    if devices_db is None:
                        devices_db = Devices(
                            devices=devices,
                            timestamp=timestamp,
                        )
                    else:
                        #if devices_db.timestamp > timestamp:
                            # Skip update if the existing record is newer
                        #    return
                        devices_db.devices = devices
                        devices_db.timestamp = timestamp

                    db.session.add(devices_db)
                    db.session.commit()
                    current_app.logger.info(f"refresh snapshot at {timestamp} done")
                except Exception as error:
                    current_app.logger.error(error)
        except Exception as error:
            current_app.logger.error(error)
@scheduler.task(
    "cron",
    id="device_history",
    minute='*',
    max_instances=1,
)
def refresh_history():
    print("refresh history")
    with scheduler.app.app_context():
        try:
            timestamp = datetime.utcnow()
            read_devices = db.session.execute(
            db.select(Devices)
            ).scalars()
            for read_device in read_devices:
                devices = read_device.devices
                timestamp = read_device.timestamp

            # Write to DeviceHistory
            device_history = DeviceHistory(
                devices=devices,
                timestamp=timestamp,
            )

            db.session.add(device_history)
            db.session.commit()
            print("done")

        except Exception as error:
            current_app.logger.error(error)

#........#
if mqtt_client.ON:
    @scheduler.task(
        "interval",
        id="MQTT_subscriber",
        seconds=60,
        max_instances=1,
    )
    def MQTT_subscriber():
        with scheduler.app.app_context():
            #SKIP Condition
            if not mqtt_client.ON:
                # current_app.logger.info(f"MQTT OFF")
                return  0

            timestamp = datetime.utcnow()
            current_app.logger.info(f"MQTT SUB at {timestamp} start")
            mqtt_client.run()

    @scheduler.task(
        "interval",
        id="mqtt_publisher_data",
        seconds=1,
        max_instances=1,
    )
    def mqtt_publisher_data():
        with scheduler.app.app_context():
            #SKIP Condition
            resp = message(True, "SKIP mqtt_publisher_data")
            if not mqtt_client.ON:
                return  resp, 100
            if mqtt_client.RemoteENV:
                return  resp, 100

            try:
                timestamp = datetime.utcnow()
                read_devices = db.session.execute(
                db.select(Devices)
                ).scalars()
                for read_device in read_devices:
                    devices = read_device.devices
                    timestamp = read_device.timestamp

                # MQTT Publish
                mqtt_message = {
                    "devices": devices,
                    "timestamp": timestamp.isoformat()
                }
                MQTT_publisher(mqtt_client, mqtt_message)

            except Exception as error:
                current_app.logger.error(error)
