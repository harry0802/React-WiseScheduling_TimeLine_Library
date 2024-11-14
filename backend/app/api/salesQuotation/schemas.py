# Validations with Marshmallow
from marshmallow import Schema, fields


class SQMaterialCostSettingSchema(Schema):
    id = fields.Integer(dump_only=True)
    SQProcessId = fields.Integer(required=True)
    estimatedDefectRate = fields.Float(required=False)
    estimatedMaterialFluctuation = fields.Float(required=False)
    extractionCost = fields.Float(required=False)
    processingCost = fields.Float(required=False)


class SQMaterialCostSchema(Schema):
    id = fields.Integer(dump_only=True)
    SQProcessId = fields.Integer(required=True)
    materialOptionId = fields.Integer(required=False)
    materialSN = fields.String(required=False)
    materialName = fields.String(required=False)
    unit = fields.String(required=False)
    weight = fields.Float(required=False)
    unitPrice = fields.Float(required=False)
    amount = fields.Float(required=False)


class SQPackagingCostSchema(Schema):
    id = fields.Integer(dump_only=True)
    SQProcessId = fields.Integer(required=True)
    packagingType = fields.String(required=False)
    materialSN = fields.String(required=False)
    materialName = fields.String(required=False)
    unit = fields.String(required=False)
    quantity = fields.Float(required=False)
    capacity = fields.Float(required=False)
    bagsPerKg = fields.Float(required=False)
    unitPrice = fields.Float(required=False)
    amount = fields.Float(required=False)


class SQInjectionMoldingCostSchema(Schema):
    id = fields.Integer(dump_only=True)
    SQProcessId = fields.Integer(required=True)
    machineId = fields.Integer(required=False)
    workHoursRatio = fields.Float(required=False)
    defectiveRate = fields.Float(required=False)
    cycleTime = fields.Float(required=False)
    packageTime = fields.Float(required=False)
    moldCavity = fields.Integer(required=False)
    unitPrice = fields.Float(required=False)
    amount = fields.Float(required=False)
    subtotal = fields.Float(required=False)
    electricityCost = fields.Float(required=False)


class SQInPostProcessingCostSchema(Schema):
    id = fields.Integer(dump_only=True)
    SQProcessId = fields.Integer(required=True)
    workSecond = fields.Integer(required=False)
    unitPrice = fields.Float(required=False)
    amount = fields.Float(required=False)


class SQOutPostProcessingCostSchema(Schema):
    id = fields.Integer(dump_only=True)
    SQProcessId = fields.Integer(required=True)
    unitPrice = fields.Float(required=False)
    amount = fields.Float(required=False)


class SQFreightSchema(Schema):
    id = fields.Integer(dump_only=True)
    salesQuotationId = fields.Integer(required=True)
    deliveryDistance = fields.Float(required=False)
    driverWorkHours = fields.Float(required=False)
    fuelCostPerKM = fields.Float(required=False)
    estimatedShipment = fields.Integer(required=False)
    amount = fields.Float(required=False)


class SQCustomsDutySchema(Schema):
    id = fields.Integer(dump_only=True)
    salesQuotationId = fields.Integer(required=True)
    feeType = fields.String(required=False)
    freight = fields.Float(required=False)
    estimatedShipment = fields.Integer(required=False)
    amount = fields.Float(required=False)


class SQProcessSchema(Schema):
    id = fields.Integer(dump_only=True)
    salesQuotationId = fields.Integer(required=True)
    processOptionId = fields.Integer(required=True)
    processCategory = fields.String(required=False)
    processSN = fields.String(required=False)
    processName = fields.String(required=False)
    SQMaterialCostSetting = fields.Nested(SQMaterialCostSettingSchema)
    SQMaterialCosts = fields.List(fields.Nested(SQMaterialCostSchema))
    SQPackagingCosts = fields.List(fields.Nested(SQPackagingCostSchema))
    SQInjectionMoldingCosts = fields.List(fields.Nested(SQInjectionMoldingCostSchema))
    SQInPostProcessingCosts = fields.List(fields.Nested(SQInPostProcessingCostSchema))
    SQOutPostProcessingCosts = fields.List(fields.Nested(SQOutPostProcessingCostSchema))
   
class ShippingCostSchema(Schema):
    SQFreights = fields.List(fields.Nested(SQFreightSchema))
    SQCustomsDuties = fields.List(fields.Nested(SQCustomsDutySchema))

class SalesQuotationSchema(Schema):
    id = fields.Integer(dump_only=True)
    quotationSN = fields.String(required=False)
    createDate = fields.DateTime(required=False)
    customerName = fields.String(required=False)
    productName = fields.String(required=False)
    overheadRnd = fields.Float(required=False)
    profit = fields.Float(required=False)
    risk = fields.Float(required=False)
    annualDiscount = fields.Float(required=False)
    rebate = fields.Float(required=False)
    actualQuotation = fields.Float(required=False)
    processes = fields.List(fields.Nested(SQProcessSchema))
    shippingCosts = fields.Nested(ShippingCostSchema)

