from app import db
from app.service.customTypeDecorator import TimestampDatetime
Column = db.Column
Model = db.Model

class LtMoldInventory(Model):
    __tablename__ = "ltmoldinventory"
    no = Column(db.Integer , primary_key = True)
    rfidno = Column(db.String(255), nullable=False)
    finalinventory = Column(TimestampDatetime, nullable=False)
    memo = Column(db.String(255), nullable=True)

    def __init__(self, **kwargs):
        super(LtMoldInventory, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
