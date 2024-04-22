from app import db
Column = db.Column
Model = db.Model 
relationship = db.relationship


class Injector(Model):
    __tablename__ = "injector"
    __bind_key__ = "opcua"
    id = Column(db.Integer, primary_key=True)
    name = Column(db.String(255))
    node_prefix = Column(db.String(255))
    device_status = Column(db.String(255))
    operating_mode = Column(db.String(255))
    alarm_message = Column(db.String(255))
    mold_number = Column(db.String(255))
    material_number = Column(db.String(255))
    material_number2 = Column(db.String(255))
    current_modulus = Column(db.String(255))
    total_modulus = Column(db.String(255))
    cycle_time = Column(db.String(255))
    last_cycle_time = Column(db.String(255))
    last_updated = Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.current_timestamp())

    def __init__(self, **kwargs):
        super(Injector, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"