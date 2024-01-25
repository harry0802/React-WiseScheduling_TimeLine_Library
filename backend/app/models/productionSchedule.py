from app import db
from sqlalchemy.orm import synonym
Column = db.Column
Model = db.Model 
relationship = db.relationship
"""生產行程(ProductionSchedule)
    1. 生產區域 : productionArea (string)
    2. 機台編號 : machineSN (string)
    3. 序號 : serialNumber (int) (ref: id)
    4. 單據編號 : workOrderSN (string)
    5. 產品編號 : productSN (string)
    6. 產品名稱 : productName (string)
    7. 製令數量 : workOrderQuantity (int)
    8. 製令開立日期 : workOrderDate (date)
    9. 成型秒數 : moldingSecond (int)
    10. 每小時產能 : hourlyCapacity (int)(round)
    11. 日產能 : dailyCapacity (int)(round)
    12. 預計上機日 : planOnMachineDate (date)
    13. 實際上機日 : actualOnMachineDate (date)(nullable)
    13. 上下模工作日 : moldWorkDays (int)
    14. 工作天數 : workDays (int) (ceil)
    15. 預計完成日 : planFinishDate (date) (filled or calculated by calendarWithoutHoliday)
    16. 實際完成日 : actualFinishDate (nullable)
    17. 備註: comment (nullable)
    18. 日工時 : dailyWorkingHours (int)
    19. 穴數 : moldCavity (int)
    20. 週別 : week (int)
    21. 單雙色射出 : singleOrDoubleColor (string)
    22. 製程轉換率 : conversionRate (decimal)
    23. Status : status (string) 
    
    calculation by functions:
    hourlyCapacity = (60 * 60) * (1/moldingSecond) * moldCavity
    dailyCapacity = hourlyCapacity * dailyWorkingHours * conversionRate
    workDays = workOrderQuantity / dailyCapacity
    week = workOrderDate.isocalendar()[1]
    planFinishDate = workOrderDate + datetime.timedelta(days=workDays+moldWorkDays)
"""

class productionSchedule(Model):
    __tablename__ = "productionSchedule"
    id = Column(db.Integer , primary_key = True)
    productionArea = Column(db.String(255))
    machineSN = Column(db.String(255))
    serialNumber = synonym("id")
    # serialNumber = Column(db.String(255))
    workOrderSN = Column(db.String(255))
    productSN = Column(db.String(255))
    productName = Column(db.String(255))
    workOrderQuantity = Column(db.Integer)
    workOrderDate = Column(db.Date)
    moldingSecond = Column(db.Integer)
    hourlyCapacity = Column(db.Integer)
    dailyCapacity = Column(db.Integer)
    planOnMachineDate = Column(db.Date)
    actualOnMachineDate = Column(db.Date, nullable=True)
    moldWorkDays = Column(db.Integer)
    workDays = Column(db.Integer)
    planFinishDate = Column(db.Date)
    actualFinishDate = Column(db.Date, nullable=True)
    comment = Column(db.Text, nullable=True)
    dailyWorkingHours = Column(db.Integer)
    moldCavity = Column(db.Integer)
    week = Column(db.Integer)
    singleOrDoubleColor = Column(db.String(255))
    conversionRate = Column(db.Float)
    #status: on-going, finish, delay, delay-finish
    status = Column(db.String(255))




    def __init__(self, **kwargs):
        super(productionSchedule, self).__init__(**kwargs)

    def __repr__(self):
        return f"<>"
