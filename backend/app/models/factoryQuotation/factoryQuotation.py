from app import db
from app.service.customType import TimestampDatetime
Column = db.Column
Model = db.Model 


class FactoryQuotation(Model):
    """"廠內報價"""
    __tablename__ = "factoryQuotation"
    id = Column(db.Integer, primary_key=True)
    quotationSN = Column(db.String(255), nullable=True, comment='報價單編號')
    createDate = Column(TimestampDatetime, comment='報價單建立日期')
    customerName = Column(db.String(255), nullable=True, comment='客戶名稱')
    productSN = Column(db.String(255), nullable=True, comment='產品編號')
    productName = Column(db.String(255), nullable=True, comment='產品名稱')
    overheadRnd = Column(db.Float, nullable=True, comment='管銷研百分比 (short for Overhead & Research and Development Percentage)')
    profit = Column(db.Float, nullable=True, comment='利潤百分比')
    risk = Column(db.Float, nullable=True, comment='風險百分比')
    annualDiscount = Column(db.Float, nullable=True, comment='年降百分比')
    rebate = Column(db.Float, nullable=True, comment='回饋百分比')
    actualQuotation = Column(db.Float, nullable=True, comment='實際報價')

    def __init__(self, **kwargs):
        super(FactoryQuotation, self).__init__(**kwargs)

    def __repr__(self):
        return f"<{self.productName} {self.productName}>"
