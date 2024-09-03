from app import db
Column = db.Column
Model = db.Model 


class Option(Model):
    __tablename__ = "option"
    id = Column(db.Integer, primary_key=True)
    # name should be unique
    name = Column(db.String(255), nullable=True, unique=True)
    content = Column(db.Text, nullable=True)

    def __init__(self, **kwargs):
        super(Option, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
