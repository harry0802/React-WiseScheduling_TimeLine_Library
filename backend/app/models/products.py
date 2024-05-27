from app import db
Column = db.Column
Model = db.Model 


class products(Model):
    __tablename__ = "products"
    __bind_key__ = "mold"
    
    id = Column(db.Integer, primary_key=True)
    prod_no = Column(db.String(255), unique=True, nullable=False)
    prod_name = Column(db.String(255), unique=True, nullable=False)
    prod_type = Column(db.JSON, nullable=False)
    prod_color = Column(db.JSON, nullable=False)
    prod_weight = Column(db.String(255), nullable=False)
    prod_unit = Column(db.String(255), nullable=False)
    prod_price = Column(db.DECIMAL(5,2), nullable=False)
    prod_sec = Column(db.DECIMAL(5,2), nullable=False, default=60.00)
    prod_defect_rate = Column(db.DECIMAL(5,2), nullable=False, default=3.00)
    mold_id = Column(db.Integer, nullable=False)
    mold_no = Column(db.String(255), nullable=False)
    use_cavity_num = Column(db.Integer, nullable=False)
    user_id = Column(db.Integer, nullable=False)
    customer_id = Column(db.Integer)
    is_valid = Column(db.Boolean, default=True)
    created_at = Column(db.DateTime)
    updated_at = Column(db.DateTime)




    def __init__(self, **kwargs):
        super(products, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
