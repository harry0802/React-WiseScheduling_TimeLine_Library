from app import db
Column = db.Column
Model = db.Model 


class Material(Model):
    __tablename__ = "material"
    id = Column(db.Integer, primary_key=True)
    materialOptionId = db.Column(db.Integer, db.ForeignKey('materialOption.id'), nullable=True)
    productSN = Column(db.String(255), nullable=False)
    materialSN = Column(db.String(255), nullable=False)
    materialName = Column(db.String(255), nullable=False)
    quantity = Column(db.Float, nullable=True)
    unit = Column(db.String(255), nullable=True)
    materialOptions = db.relationship('MaterialOption', backref='material', lazy=True)
    # the combination of materialSN and productSN should be unique
    __table_args__ = (db.UniqueConstraint("productSN", "materialSN"),)
    

    def __init__(self, **kwargs):
        super(Material, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
