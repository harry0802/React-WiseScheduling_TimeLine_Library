from app import db
Column = db.Column
Model = db.Model 
relationship = db.relationship


class InjectorOee15m(Model):
    __tablename__ = "injector_oee_15m"
    __bind_key__ = "opcua"
    id = Column(db.Integer, primary_key=True)
    machine_name = Column(db.String(255))
    timestamp = Column(db.DateTime)
    run = Column(db.Float)
    idle = Column(db.Float)
    alarm = Column(db.Float)
    off_line = Column(db.Float)
    tryout = Column(db.Float)
    RPT_DATE_TIME = Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.current_timestamp())


    def __init__(self, **kwargs):
        super(InjectorOee15m, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"