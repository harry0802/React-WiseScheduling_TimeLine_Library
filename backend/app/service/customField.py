from flask_restx import fields


class StringInteger(fields.Integer):
    __schema_type__ = [fields.Integer.__schema_type__, 'string']
    __schema_example__ = '1'
    def __init__(self, *args, **kwargs):
        super(StringInteger, self).__init__(*args, **kwargs)
        pattern = '^[0-9]+$'
        self.pattern = kwargs.get('pattern', pattern)
    def schema(self):
        schema = super(StringInteger, self).schema()
        schema['pattern'] = self.pattern
        return schema
    

class NullableString(fields.String):
    __schema_type__ = [fields.String.__schema_type__, 'string', 'null']
    __schema_example__ = 'string or null'
    def __init__(self, *args, **kwargs):
        super(NullableString, self).__init__(*args, **kwargs)
        pattern = '\w*'
        self.pattern = kwargs.get('pattern', pattern)

       
class NullableInteger(fields.Integer):
    #accept the string type cause the technical reason (from frontend)
    __schema_type__ = [fields.Integer.__schema_type__, 'string', 'null']
    __schema_example__ = '1'
    def __init__(self, *args, **kwargs):
        super(NullableInteger, self).__init__(*args, **kwargs)
        pattern = '^[0-9]+$'
        self.pattern = kwargs.get('pattern', pattern)
    def schema(self):
        schema = super(NullableInteger, self).schema()
        schema['pattern'] = self.pattern
        return schema


class StringDateTime(fields.DateTime):
    __schema_type__ = [fields.DateTime.__schema_type__, 'string']
    __schema_example__ = '2024-01-01T00:00:00.000+08:00'
    def __init__(self, *args, **kwargs):
        super(StringDateTime, self).__init__(*args, **kwargs)
        pattern = '(\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z?))$|(\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))$|(\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))$|(\d{4}-[01]\d-[0-3]\d)$'
        
        self.pattern = kwargs.get('pattern', pattern)
    def schema(self):
        schema = super(StringDateTime, self).schema()
        schema['pattern'] = self.pattern
        return schema


class NullableDateTime(fields.DateTime):
    """regex pattern for datetime
    2024-01-01T00:00:00.000+08:00
    2024-01-01T00:00:00+08:00
    2024-01-01T00:00+08:00
    2024-01-01T00:00:00.000Z
    2024-01-01T00:00:00Z
    2024-01-01T00:00Z
    2024-01-01
    2024-01-01T00:00:00.000
    2024-01-01T00:00:00
    2024-01-01T00:00

    reg: (\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z?))$|
         (\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))$|
         (\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))$|
         (\d{4}-[01]\d-[0-3]\d$)
    """
    # https://stackoverflow.com/questions/3143070/regex-to-match-an-iso-8601-datetime-string
    __schema_type__ = [fields.DateTime.__schema_type__, 'string', 'null']
    __schema_example__ = '2024-01-01'
    def __init__(self, *args, **kwargs):
        super(NullableDateTime, self).__init__(*args, **kwargs)
        pattern = '(\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z?))$|(\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))$|(\d{4}-[01]\d-[0-3]\d[Tt\s][0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))$|(\d{4}-[01]\d-[0-3]\d)$'
        self.pattern = kwargs.get('pattern', pattern)
    def schema(self):
        schema = super(NullableDateTime, self).schema()
        schema['pattern'] = self.pattern
        return schema
    

class NullableFloat(fields.Float):
    #accept the string type cause the technical reason (from frontend)
    # https://stackoverflow.com/questions/12643009/regular-expression-for-floating-point-numbers
    __schema_type__ = [fields.Float.__schema_type__, 'string', 'null']
    __schema_example__ = '0.95'
    def __init__(self, *args, **kwargs):
        super(NullableFloat, self).__init__(*args, **kwargs)
        pattern = '^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$'
        self.pattern = kwargs.get('pattern', pattern)
    def schema(self):
        schema = super(NullableFloat, self).schema()
        schema['pattern'] = self.pattern
        return schema