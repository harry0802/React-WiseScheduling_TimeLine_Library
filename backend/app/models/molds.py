from app import db
Column = db.Column
Model = db.Model 
relationship = db.relationship


class molds(Model):
    __tablename__ = "molds"
    id = Column(db.Integer, primary_key=True)
    mold_file_no = Column(db.String(255), unique=True, nullable=False)
    mold_no = Column(db.String(255), unique=True, nullable=False)
    project_id = Column(db.Integer, nullable=False)
    eval_id = Column(db.Integer)
    quot_item_id = Column(db.Integer)
    customer_id = Column(db.Integer, nullable=False)
    dfm_path = Column(db.String(255))
    cad_path = Column(db.String(255))
    pic1 = Column(db.Integer)
    pic2 = Column(db.Integer)
    product_name = Column(db.String(255))
    product_no = Column(db.String(255))
    inject_type = Column(db.String(255))
    mold_class = Column(db.String(255))
    mold_type = Column(db.String(255))
    mold_lifetime = Column(db.String(255))
    t0_date = Column(db.DateTime)
    mold_size = Column(db.String(255))
    cavity = Column(db.String(255))
    cavity_material = Column(db.String(255))
    mechanism = Column(db.String(255))
    gate_type = Column(db.String(255))
    leadtime = Column(db.String(255))
    mold_qty = Column(db.Integer)
    cycle_time = Column(db.String(255))
    part_material = Column(db.String(255))
    part_material2 = Column(db.String(255))
    part_weight = Column(db.Float)
    part_weight2 = Column(db.Float)
    part_color = Column(db.String(255))
    part_color2 = Column(db.String(255))
    machine_ton = Column(db.String(255))
    surface_treatment = Column(db.String(255))
    shrinkage_rate = Column(db.String(255))
    build_date = Column(db.DateTime)
    note = Column(db.String(255))
    is_outsourcing = Column(db.Boolean, default=False)
    outsourcer = Column(db.String(255))
    is_locked = Column(db.Boolean, default=False)
    is_valid = Column(db.Boolean, default=True)
    created_at = Column(db.DateTime)
    updated_at = Column(db.DateTime)
    is_transfer = Column(db.Boolean, default=False)



    def __init__(self, **kwargs):
        super(mold, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
