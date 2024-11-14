from app import db
Column = db.Column
Model = db.Model 


class SQProcess(Model):
    """"業務報價中的製程"""
    __tablename__ = "SQProcess"
    id = Column(db.Integer, primary_key=True)
    salesQuotationId = Column(db.Integer, db.ForeignKey('salesQuotation.id'), nullable=False, comment='對應的報價ID')
    processOptionId = Column(db.Integer, db.ForeignKey('processOption.id'), nullable=False, comment='製程選項ID')
    processOptions = db.relationship('ProcessOption', backref='SQProcess', lazy=True)

    def __init__(self, **kwargs):
        super(SQProcess, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
