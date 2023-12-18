from flask import current_app
from pyModbusTCP.client import ModbusClient


class ModbusClientManager(object):
    _clients = {}

    @staticmethod
    def init_clients(gateway_settings):
        for gateway_setting in gateway_settings:
            if (gateway_setting.enabled):
                id = gateway_setting.id
                connect = gateway_setting.connect
                port = gateway_setting.port
                
                current_app.logger.info(f'gateway_setting{id} {connect}:{port}')
                try:
                    #1. check connection
                    if id in ModbusClientManager._clients and ModbusClientManager._clients[id].is_open:
                        current_app.logger.info(f"ModbusClient [{id}] state is open")
                        continue
                    #2. Establish connection
                    client = ModbusClient(host=connect, port=int(port))
                    ModbusClientManager._clients[id] = client
                except ValueError:
                    current_app.logger.error(
                        f'Failed to create Modbus client for {connect}:{port}')
                except Exception as err:
                    current_app.logger.error(f"Unexpected {err=}, {type(err)=}")

    @staticmethod
    def get_client(gateway_id):
        return ModbusClientManager._clients[gateway_id]
