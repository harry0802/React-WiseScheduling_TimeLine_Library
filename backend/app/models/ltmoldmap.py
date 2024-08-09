from app import db
Column = db.Column
Model = db.Model
from sqlalchemy.orm import synonym

class LtMoldMap(Model):
    __tablename__ = "ltmoldmap"
    no = Column(db.Integer , primary_key = True)
    id = synonym("no")
    moldno = Column(db.String(255))
    rfidno = Column(db.String(255))
    memo = Column(db.String(255))

    def __init__(self, **kwargs):
        super(LtMoldMap, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"