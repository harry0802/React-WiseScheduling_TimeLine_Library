from app import db
Column = db.Column
Model = db.Model 


class Product(Model):
    __tablename__ = "product"
    id = Column(db.Integer, primary_key=True)
    productSN = Column(db.String(255), unique=True, nullable=False)
    productName = Column(db.String(255), nullable=False)
    oldProductSN = Column(db.String(255), nullable=True)
    # process = db.relationship('Process', backref='product', lazy=True)


    def __init__(self, **kwargs):
        super(Product, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
