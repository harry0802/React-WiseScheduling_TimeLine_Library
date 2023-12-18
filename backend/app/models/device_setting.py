from app import db

# Alias common DB names
Column = db.Column
Model = db.Model
relationship = db.relationship


class PLCSetting(Model):
    __tablename__ = "plc_setting"
    id = Column(db.Integer, primary_key=True)
    ip_address = Column(db.String(15))
    port = Column(db.String(5))
    enabled = Column(db.Boolean, default=True)

    def __init__(self, **kwargs):
        super(PLCSetting, self).__init__(**kwargs)

    def __repr__(self):
        return f"<PLCSetting {self.id} - {self.ip_address}:{self.port}>"


class DeviceSetting(Model):
    __tablename__ = "device_setting"
    id = Column(db.Integer, primary_key=True)
    device_name = Column(db.String(64))
    plc_id = Column(db.Integer, db.ForeignKey("plc_setting.id"))
    plc_type = Column(db.String(20))
    plc_read_loc = Column(db.Integer)
    plc_write_loc = Column(db.Integer)
    plc_length = Column(db.Integer)
    calibration = Column(db.Float)
    order = Column(db.Integer)
    enabled = Column(db.Boolean)
    controllable = Column(db.Boolean)

    plc = db.relationship("PLCSetting")

    def __init__(self, **kwargs):
        super(DeviceSetting, self).__init__(**kwargs)

    def __repr__(self):
        return f"<Device {self.id} - {self.device_name}>"
