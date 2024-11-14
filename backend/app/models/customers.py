from app import db
Column = db.Column
Model = db.Model 
relationship = db.relationship


class Customers(Model):
    __tablename__ = "customers"
    __bind_key__ = "plas_mold"
    id = Column(db.Integer, primary_key=True)
    customer_no = Column(db.String(255), nullable=False, comment='客戶編號')
    name = Column(db.String(255), nullable=False, comment='客戶名稱')
    short = Column(db.String(255), nullable=False, comment='客戶簡稱')
    code = Column(db.String(255), nullable=False)
    customer_type = Column(db.Integer, nullable=False, default=1, comment='客戶類型')
    user_id = Column(db.Integer, nullable=False, comment='使用者ID')
    addr = Column(db.String(255), nullable=True, comment='地址')
    shipping = Column(db.String(255), nullable=True, comment='送貨地址')
    invoice_addr = Column(db.String(255), nullable=True, comment='發票地址')
    invoice_title = Column(db.String(255), nullable=True, comment='發票抬頭')
    tel = Column(db.String(255), nullable=True, comment='電話')
    fax = Column(db.String(255), nullable=True, comment='傳真')
    email = Column(db.String(255), nullable=True, comment='電子郵件')
    uni_no = Column(db.String(255), nullable=True, comment='統一編號')
    note = Column(db.String(255), nullable=True, comment='備註')
    is_valid = Column(db.Boolean, nullable=False, default=True, comment='是否有效')
    created_at = Column(db.DateTime, nullable=True, comment='建立時間')
    updated_at = Column(db.DateTime, nullable=True, comment='更新時間')

