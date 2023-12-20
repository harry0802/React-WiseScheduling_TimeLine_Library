from app import db

Column = db.Column
Model = db.Model 
relationship = db.relationship

class Calendar(Model):
    __tablename__ = "calendar"
    id = Column(db.Integer , primary_key = True)
    date = Column(db.Date , unique = True, index = True)
    isHoliday = Column(db.Boolean)
    chinese = Column(db.String(200), nullable = True)
    holidayCategory = Column(db.String(200), nullable = True)
    description = Column(db.String(200), nullable = True)

    def __init__(self, **kwargs):
        super(Calendar, self).__init__(**kwargs)

    def __repr__(self):
        return f"<{self.id} - {self.date} - {self.isHoliday} - {self.chinese} - {self.holidayCategory} - {self.description}>"
