from app import db
Column = db.Column
Model = db.Model 


class MaterialOption(Model):
    __tablename__ = "materialOption"
    id = Column(db.Integer, primary_key=True)
    materialCode = Column(db.String(255), nullable=True)
    materialType = Column(db.String(255), nullable=True)

    def __init__(self, **kwargs):
        super(MaterialOption, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
