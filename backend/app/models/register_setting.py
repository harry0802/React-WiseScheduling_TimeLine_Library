from app import db

Column = db.Column
Model = db.Model 
relationship = db.relationship

class GatewaySetting(Model):
    __tablename__ = "gateway_setting"
    id = Column(db.Integer , primary_key = True)
    type = Column(db.String(10))
    name = Column(db.String(20))
    label = Column(db.String(20))
    connect = Column(db.String(15))
    port = Column(db.String(5))
    enabled = Column(db.Boolean , default = True)

    def __init__(self, **kwargs):
        super(GatewaySetting, self).__init__(**kwargs)

    def __repr__(self):
        return f"<GatewaySetting {self.id} - {self.connect}:{self.port}>"

class DeviceSetting(Model):
    __tablename__ = "device_setting"
    id = Column(db.Integer , primary_key = True)
    type = Column(db.String(20))
    label =Column(db.String(20))
    name =  Column(db.String(20))
    enabled =  Column(db.Boolean , default = True)

    def __init__(self, **kwargs):
        super(DeviceSetting, self).__init__(**kwargs)

    def __repr__(self):
        return f"<Device {self.id} - {self.name}>"

class RegisterSetting(Model):
    __tablename__ = "register_setting"
    id = Column(db.Integer , primary_key = True)
    name = Column(db.String(20))
    label = Column(db.String(20))
    unit = Column(db.String(5))    
    gateway_id = Column(db.Integer , db.ForeignKey("gateway_setting.id")) 
    device_id = Column(db.Integer , db.ForeignKey("device_setting.id"))
    modbus_type = Column(db.String(5))
    length = Column(db.Integer)
    read_loc = Column(db.Integer)
    write_loc = Column(db.Integer)  
    calibration = Column(db.String(20))
    enabled = Column(db.Boolean)
    controllable = Column(db.Boolean)
    acceptable_condition=Column(db.JSON)

    gateway = db.relationship("GatewaySetting")
    device  = db.relationship("DeviceSetting")

    def __init__(self, **kwargs):
        super(RegisterSetting, self).__init__(**kwargs)

    def __repr__(self):
        return f"<Register {self.id} - {self.name}>"
