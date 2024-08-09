from app import db
Column = db.Column
Model = db.Model 


class ProcessMold(Model):
    __tablename__ = "processMold"
    id = Column(db.Integer, primary_key=True)
    processId = db.Column(db.Integer, db.ForeignKey('process.id'), nullable=False)
    ltmoldmapId = db.Column(db.Integer, db.ForeignKey('ltmoldmap.no'), nullable=False)


    def __init__(self, **kwargs):
        super(ProcessMold, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
