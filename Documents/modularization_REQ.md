後端模組化需求
===
[toc]

## config 參數
    1. name:***
    2. default_xxx: 0
## Requirement
    1. #task to update db table
## self data models
    1. table name:
       1. column name
       2. column name
## task functions (check, summary, backup)
    1. check_xxx_by_day()
    2. summary_xxx_by_day()
    3. backup_xxx_by_day()
## API route
    1. /api/xxx/
## internal methods (friendly use for engineer)(option)
    1. get_xxx_by_time(start_time, end_time)
## relative data sources
    1. relative db table
    2. from internal methods
    3. external api
## 連動其他 module 行為
    1. alert api