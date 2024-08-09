from app import db
Column = db.Column
Model = db.Model 


class ProcessMaterial(Model):
    __tablename__ = "processMaterial"
    id = Column(db.Integer, primary_key=True)
    processId = db.Column(db.Integer, db.ForeignKey('process.id'), nullable=False)
    materialId = db.Column(db.Integer, db.ForeignKey('material.id'), nullable=False)


    def __init__(self, **kwargs):
        super(ProcessMaterial, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
