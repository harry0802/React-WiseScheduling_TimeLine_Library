import os
import requests
import paho.mqtt.client as mqtt_client
import json
import time
import logging
import socket
from app import db , scheduler
from datetime import datetime
# from app.adapters.modbus_client_manager import ModbusClientManager
# from app.models.device_setting import DeviceSetting, PLCSetting
# from app.models.device import Devices, DeviceHistory
from app.utils_log import message
#from app.adapters.mqtt_client import MQTTDeviceService

main_logger = logging.getLogger('main')
conn_logger = logging.getLogger('main.conn')
sub_logger = logging.getLogger('main.sub')

'''
def get_local_ip():
    s = socket.socket(socket.AF_INET , socket.SOCK_DGRAM)
    s.connect(("8.8.8.8" , 80))
    local_ip = s.getsockname()[0]
    s.close()
    local_ip = '127.0.0.1'
    return local_ip
'''
# Replace with your API base URL and URL for PLC
api_base = "YOUR_API_BASE_URL"
#url = f"http://{get_local_ip()}:5000/api"
url = f"http://127.0.0.1:5000/api/devices"


# After Receive Message ########################################
def exec_IoT_command(command):
    devics_api = "{api_base}/api/devices"
    json_data = json.loads(command)
    device_id = json_data['device_id']
    device_command = json_data['command']
    api_plc = f"{url}/{device_id}"
    conn_logger.info(api_plc)
    r = requests.post(api_plc, json={"command": device_command}, timeout=300)
    if r.status_code == 200:
        main_logger.info(f"Executed IoT command for device {device_id}")
    else:
        main_logger.error(f"Failed to execute IoT command for device {device_id}")

def update_devices_db(data):
    with scheduler.app.app_context():
        timestamp = datetime.utcnow()
        main_logger.info(f"mqtt sublisher update database at {timestamp} start")
        try:
            # Write to device database
            #devices_db = data
            json_data = json.loads(data)
            main_logger.info(json_data)
            devices = json_data["data"]["devices"]
            timestamp = json_data["data"]["timestamp"]
            main_logger.info(devices)
            main_logger.info(timestamp)
            
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
            main_logger.info("Updated devices database done")

        except Exception as error:
            main_logger.error(f"Error updating devices database: {error}")

def write_devices_db_history():
    with scheduler.app.app_context():
        timestamp = datetime.utcnow()
        main_logger.info(f"refresh snapshot at {timestamp} start")
    try:
        #select db_device 
        read_devices = db.session.execute(
        db.select(Devices)
        ).scalars()
        for read_device in read_devices:
            devices = read_device.devices
            timestamp = read_device.timestamp

        device_history = DeviceHistory(
            devices= devices,
            timestamp = timestamp,
        ) 
        db.session.add(device_history)
        db.session.commit()
        print("done")

    except Exception as error:
        main_logger.error(f"Error write devices database: {error} ")

def MQTT_publisher(mqtt_client, mqtt_message):
    #SKIP Condition
    resp = message(True, "SKIP MQTT_publisher")
    if not mqtt_client.ON:
        return  resp, 100

    try:
        client = mqtt_client.connect_mqtt()
        mqtt_client.publisher(client , mqtt_message)
        resp = message(True, f"MQTT topic :{mqtt_client.pub_topic} publish done")
        return resp, 200

    except Exception as error:
        main_logger.error(error)

class MQTT:
    ON = os.getenv("MQTT_ON", False)
    RemoteENV = os.getenv("REMOTE", False)
    broker = os.getenv("MQTT_BROKER_IP", '172.16.0.204')
    port = int(os.getenv("MQTT_BROKER_PORT", 1883))
    user = os.getenv("MQTT_USER", "TS_IoT")
    pswd = os.getenv("MQTT_PASSWORD", 'ts82868471')
    FIRST_RECONNECT_DELAY = int(os.getenv("FIRST_RECONNECT_DELAY", 1))
    RECONNECT_RATE = int(os.getenv("RECONNECT_RATE", 2))
    MAX_RECONNECT_COUNT = int(os.getenv("MAX_RECONNECT_COUNT", 12))
    MAX_RECONNECT_DELAY = int(os.getenv("MAX_RECONNECT_DELAY", 60))
    data = os.getenv("MQTT_TOPIC_DATA" , "IoT_devices_data")
    control = os.getenv("MQTT_TOPIC_COTROL" , "IoT_control_command")

    def __init__(self):
        if self.RemoteENV:
            self.sub_topic = self.data
            self.pub_topic = self.control
        else:
            self.sub_topic = self.control
            self.pub_topic = self.data

    def connect_mqtt(self):
        client = mqtt_client.Client()
        client.on_connect = self.on_connect
        client.on_disconnect = self.on_disconnect
        client.username_pw_set(self.user, self.pswd)
        client.connect(self.broker, self.port)
        return client

    def subscribe(self, client: mqtt_client):
        def on_message(client, userdata, msg):
            sub_logger.info(f'Received `{msg.payload.decode()}` from `{msg.topic}` topic ')
            self.actions(msg.payload.decode())

        client.subscribe(self.sub_topic)
        client.on_message = on_message

    def publisher(self , client , devices):
        sub_logger.info(f'Publish `{devices}` from `{self.pub_topic}` topic ')
        if self.RemoteENV:
            client.publish(self.pub_topic , json.dumps(devices)) #pub IoT_control_command
        else:
            client.publish(self.pub_topic , json.dumps({"data":devices})) #pub IoT_devices_data

    def actions(self, payload):
        if self.RemoteENV:
            update_devices_db(payload)
        else:
            exec_IoT_command(payload)
    
    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            conn_logger.info("Connected to MQTT Broker")
            conn_logger.info(f"Subscribe topic: {self.sub_topic}")
            self.subscribe(client)
        else:
            conn_logger.info(f"Failed to connect, return code {rc}\n")

    def on_disconnect(self, client, userdata, rc):
        conn_logger.info(f"Disconnected with result code: {rc}")
        reconnect_count, reconnect_delay = 0, self.FIRST_RECONNECT_DELAY
        while reconnect_count < self.MAX_RECONNECT_COUNT:
            conn_logger.info(f"Reconnecting in {reconnect_delay} seconds...")
            time.sleep(reconnect_delay)

            try:
                client.reconnect()
                conn_logger.info("Reconnected successfully!")
                conn_logger.info(f"Re-subscribe topic: {self.sub_topic}")
                self.subscribe(client)
                return
            except Exception as err:
                conn_logger.error(f"{err}. Reconnect failed. Retrying...")

            reconnect_delay *= self.RECONNECT_RATE
            reconnect_delay = min(reconnect_delay, self.MAX_RECONNECT_DELAY)
            reconnect_count += 1
        conn_logger.info(f"Reconnect failed after {reconnect_count} attempts. Exiting...")

    def run(self):
        client = self.connect_mqtt()
        client.loop_start()
        while True:
            # Add any additional logic here if needed
            time.sleep(1)

'''
if __name__ == "__main__":
    mqtt_client = MQTT()
    mqtt_client.run()
'''