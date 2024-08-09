from app import db
Column = db.Column
Model = db.Model 


class ProcessOption(Model):
    __tablename__ = "processOption"
    id = Column(db.Integer, primary_key=True)
    processCategory = Column(db.String(255), nullable=True)
    processSN = Column(db.String(255), nullable=True)
    processName = Column(db.String(255), nullable=True)

    def __init__(self, **kwargs):
        super(ProcessOption, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"

