from datetime import datetime
from app import db
from sqlalchemy.dialects.mysql import BIGINT

# Alias common DB names
Column = db.Column
Model = db.Model
relationship = db.relationship


class ControlState:
    CONTROL_SUCCESS = "Control Success"
    WRITE_FAILED = "Write Failed"
    READ_FAILED = "Read Failed"

class PublishState:
    PUBLISH_SUCCESS = "Publish Success"
    PUBLISH_FAILED = "Publish Failed"


class Devices(Model):
    __tablename__ = "devices"
    id = Column(db.Integer, primary_key=True)
    devices = Column(db.JSON)
    timestamp = Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, **kwargs):
        super(Devices, self).__init__(**kwargs)

    def __repr__(self):
        return f"<Devices {self.id} - {self.timestamp}>"

    def to_dict(self):
        return {
            'devices': self.devices,
            'timestamp': self.timestamp.isoformat()
            # Add more fields as needed
        }


class DeviceHistory(Model):
    __tablename__ = "device_history"
    id = Column(BIGINT(unsigned=True), primary_key=True)
    devices = Column(db.JSON)
    timestamp = Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, **kwargs):
        super(DeviceHistory, self).__init__(**kwargs)

    def __repr__(self):
        return f"<DeviceHistory {self.id} - {self.timestamp}>"


class ControlHistory(Model):
    __tablename__ = "control_history"
    id = Column(BIGINT(unsigned=True), primary_key=True)
    device_id = Column(db.Integer, db.ForeignKey("register_setting.id"))
    preset = Column(db.String(10))
    actual = Column(db.String(10))
    state = Column(db.String(32))
    timestamp = Column(db.DateTime, default=datetime.utcnow)

    device = db.relationship("RegisterSetting")

    def __init__(self, **kwargs):
        super(ControlHistory, self).__init__(**kwargs)

    def __repr__(self):
        return f"<ControlHistory {self.id} - {self.timestamp}>"
