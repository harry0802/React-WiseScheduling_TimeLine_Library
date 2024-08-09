from app import db
Column = db.Column
Model = db.Model 


class Process(Model):
    __tablename__ = "process"
    id = Column(db.Integer, primary_key=True)
    productId = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    processOptionId = db.Column(db.Integer, db.ForeignKey('processOption.id'), nullable=False)
    jigSN = Column(db.String(255), nullable=True) # 治具編號
    processOptions = db.relationship('ProcessOption', backref='process', lazy=True)

    def __init__(self, **kwargs):
        super(Process, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
