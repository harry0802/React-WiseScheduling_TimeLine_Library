from app import db
Column = db.Column
Model = db.Model 


class FQProcess(Model):
    """"廠內報價中的製程"""
    __tablename__ = "FQProcess"
    id = Column(db.Integer, primary_key=True)
    factoryQuotationId = Column(db.Integer, db.ForeignKey('factoryQuotation.id'), nullable=False, comment='對應的報價ID')
    processOptionId = Column(db.Integer, db.ForeignKey('processOption.id'), nullable=False, comment='製程選項ID')
    processOptions = db.relationship('ProcessOption', backref='FQProcess', lazy=True)

    def __init__(self, **kwargs):
        super(FQProcess, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
