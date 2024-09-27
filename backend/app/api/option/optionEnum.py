import sys
from .service import optionService
from enum import Enum, auto


class OptionDataSource():
    """以資料庫的Option資料為來源更新Enum的值，確保前後端使用的資料一致。
    """
    def __init__(self):
        self.workOrderStatusOptions = optionService.get_all_options("workOrderStatus")
        self.processCategoryOptions = optionService.get_all_options("processCategory")
        self.inspectionTypeOptions = optionService.get_all_options("inspectionType")
    def set_enum(self):
        WorkOrderStatusEnum.set_values(self.workOrderStatusOptions)
        ProcessCategoryEnum.set_values(self.processCategoryOptions)
        InspectionTypeEnum.set_values(self.inspectionTypeOptions)


class WorkOrderStatusEnum(Enum):
    """製令單狀態

    Args:
        Enum (_type_): _description_
    """
    NOT_YET = "尚未上機"
    ON_GOING = "On-going"
    DONE = "Done"
    PAUSE = "暫停生產"
    CANCEL = "取消生產"

    @classmethod
    def set_values(cls, options):
        cls.NOT_YET._value_ = next((option.get("name") for option in options if option.get("schema") == 'NOT_YET'), "")
        cls.ON_GOING._value_ = next((option.get("name") for option in options if option.get("schema") == 'ON_GOING'), "")
        cls.DONE._value_ = next((option.get("name") for option in options if option.get("schema") == 'DONE'), "")
        cls.PAUSE._value_ = next((option.get("name") for option in options if option.get("schema") == 'PAUSE'), "")
        cls.CANCEL._value_ = next((option.get("name") for option in options if option.get("schema") == 'CANCEL'), "")


class ProcessCategoryEnum(Enum):
    """製程選項的分類

    Args:
        Enum (_type_): _description_
    """
    In_IJ = "In-IJ(廠內成型)"
    Out_IJ = "Out-IJ(委外成型)"
    In_BE = "In-BE(廠內後製程)"
    Out_BE = "Out-BE(委外後製程)"
    In_TS = "In-TS(廠內出貨檢驗)"

    @classmethod
    def set_values(cls, categories):
        cls.In_IJ._value_ = next((category.get("category") for category in categories if category.get("schema") == 'In_IJ'), "")
        cls.Out_IJ._value_ = next((category.get("category", "") for category in categories if category.get("schema") == 'Out_IJ'), "")
        cls.In_BE._value_ = next((category.get("category", "") for category in categories if category.get("schema") == 'In_BE'), "")
        cls.Out_BE._value_ = next((category.get("category", "") for category in categories if category.get("schema") == 'Out_BE'), "")
        cls.In_TS._value_ = next((category.get("category", "") for category in categories if category.get("schema") == 'In_TS'), "")


class InspectionTypeEnum(Enum):
    """檢驗類別

    Args:
        Enum (_type_): _description_
    """
    FIRST = "首件"
    IN_PROCESS = "巡檢"

    @classmethod
    def set_values(cls, options):
        cls.FIRST._value_ = next((option.get("name") for option in options if option.get("schema") == 'FIRST'), "")
        cls.IN_PROCESS._value_ = next((option.get("name") for option in options if option.get("schema") == 'IN_PROCESS'), "")
