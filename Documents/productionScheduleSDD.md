# Software Design Document for ProductionSchedule API

## Revision History
| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 2024-01-29 | 0.0.1 | Initial version | Jack |
| 2024-01-30 | 0.1.0 | adjust interface, add log design, add test plan, add test cases | Jack |


## 1. Introduction
### 1.1 Purpose
This document provides a detailed design description of the ProductionSchedule(abbreviated as PdSch) API, which allows for the management of production schedules in our system.

### 1.2 Scope
The PdSch API is part of a larger system that manages production schedules. It provides the following functionality:
* Create ProductionSchedule
* Update ProductionSchedule
* Get ProductionSchedule
* Delete ProductionSchedule
* List ProductionSchedules

### 1.3 Definitions, Acronyms, and Abbreviations
| Term | Definition |
| --- | --- |
| API | Application Programming Interface |
| SDD | Software Design Document |
| SRS | Software Requirements Specification |
| CRUD | Create, Read, Update, Delete |
| HTTP | Hypertext Transfer Protocol |
| JSON | JavaScript Object Notation |
| SQL | Structured Query Language |
| ORM | Object Relational Mapper |
| DB | Database |
| PdSch | ProductionSchedule |

### 1.4 References
* [ProductionSchedule SRS](/Documents/productionScheduleSRS.md)
* [ProductionSchedule SDD](/Documents/productionScheduleSDD.md)

### 1.5 Overview
The rest of this document is organized as follows:
* Section 2 provides an overview of the system architecture.
* Section 3 provides a detailed design description of the system.
* Section 4 provides a detailed description of the data design.
* Section 5 provides a detailed description of the user interface design.
* Section 6 provides a detailed description of the log design.
* Section 7 provides a detailed description of the test plan.
* Section 8 provides a detailed description of the test cases.



## 2 System Overview
The PdSch API will be implemented as a RESTful API using the Python Flask framework.
The API will be deployed on a Linux server running nginx.
The API will communicate with a MySQL database using the SQLAlchemy ORM.

## 3. System Architecture
### 3.1 Architecture Design
The PdSch API will be implemented as a RESTful API using the Python Flask framework.
and it will contain the following parts:
* database
* ORM
* API
* UI
* test

### 3.2 Decomposition Description
The database will be a MySQL/MariaDB database. and it will contain the following tables:
* productionSchedule

The ORM will be SQLAlchemy. It will provide an object-oriented interface to the database.

The API will be implemented using the Python Flask framework. It will provide the following endpoints:
* GET,POST /productionSchedule
* GET,PUT,DELETE /productionSchedule/{id}

The UI will be implemented using the React framework. It will provide a web-based interface to the API.

The test will be implemented by flask testing framework. It will provide the OpenAPI test to the API.

### 3.3 Design Rationale
The PdSch API will be implemented by Python Flask framework cause it is a lightweight framework and easy to use.
And team members are familiar with it.

## 4. Data Design
### 4.1 Database Tables
#### 4.1.1 ProductionSchedule
| Column | Chinese | Type | Description | Acceptable Values |
| --- | --- | --- | --- | --- |
| id | 序號 | int | Primary Key | |
| productionArea | 生產區域 | string | 機台工作區域 | [A,B,C,D]|
| machineSN | 機台編號 | string | 機台編號| /[ABCD]?[1][0-9]/|
| serialNumber | 序號 | int | | |
| workOrderSN | 單據編號 | string | 製令單號(not null) | |
| productSN | 產品編號 | string | 產品編號(not null) | |
| productName | 產品名稱 | string | 產品名稱(not null) | |
| workOrderQuantity | 製令數量 | int | 製令數量(not null) | (0, 1000000) |
| workOrderDate | 製令開立日期 | datetime | 製令開立日期(not null) | (0001-01-01, 9999-12-32)|
| moldingSecond | 成型秒數 | int | 射出成型秒數 | (0, 86400) |
| hourlyCapacity | 每小時產能 | int | 每小時可射出pcs數 | (0,3600) |
| dailyCapacity | 日產能 | int | 每日可射出pcs數 | (0,86400) |
| planOnMachineDate | 預計上機日 | datetime | 預計上機日期 | (0001-01-01, 9999-12-32)|
| actualOnMachineDate | 實際上機時間 | datetime | 實際上機時間 | (0001-01-01 00:00:00, 9999-12-32 00:00:00)|
| moldWorkDays | 上下模工作日 | int | 上下模工作日數 | (0, 1000) |
| workDays | 工作天數 | int | 工作天數 | (0, 1000) |
| planFinishDate | 預計完成日 | datetime | 預計完成日 | (0001-01-01, 9999-12-32)|
| actualFinishDate | 實際完成時間 | datetime | 實際完成時間 | (0001-01-01 00:00:00, 9999-12-32 00:00:00)|
| comment | 備註 | string | 備註 | |
| dailyWorkingHours | 日工時 | int | 日工時 | (0, 24] |
| moldCavity | 穴數 | int | 穴數 | (0, 1000) |
| week | 週別 | int | 預計上機日週別 | [0, 53] |
| singleOrDoubleColor | 單雙色射出 | string | 單雙色射出 | ["單色", "雙色"] |
| conversionRate | 製程轉換率 | decimal | 製程轉換率 | (0, 1] |
| status | Status | string | 機台狀態 | ["尚未上機", "On-going", "Done", "暫停生產", "取消生產"] |


calculation by functions:
hourlyCapacity = (60 * 60) * (1/moldingSecond) * moldCavity
dailyCapacity = hourlyCapacity * dailyWorkingHours * conversionRate
workDays = workOrderQuantity / dailyCapacity
week = workOrderDate.isocalendar()[1]
planFinishDate = workOrderDate + datetime.timedelta(days=workDays+moldWorkDays)

## 5. Component Design

## 5. User Interface Design

the following description will use the following terms:
* {production schedule}: the production schedule data
  it can refer to the table in 4.1.1 ProductionSchedule.
  and it can be represented as a json object like the following:
```
{
    "productionArea": "string",
    "machineSN": "string",
    "serialNumber": int,
    "workOrderSN": "string",
    "productSN": "string",
    "productName": "string",
    "workOrderQuantity": int,
    "workOrderDate": datetime,
    "moldingSecond": int,
    "hourlyCapacity": int,
    "dailyCapacity": int,
    "planOnMachineDate": datetime,
    "actualOnMachineDate": datetime,
    "moldWorkDays": int,
    "workDays": int,
    "planFinishDate": datetime,
    "actualFinishDate": datetime,
    "comment": "string",
    "dailyWorkingHours": int,
    "moldCavity": int,
    "week": int,
    "singleOrDoubleColor": "string",
    "conversionRate": float,
    "status": "string"
}
```

### 5.1 Create ProductionSchedule
#### 5.1.1 Inputs
1. the payload should be a `{production schedule}` json object.
#### 5.1.2 Outputs
If successful, the system will return a 200 status code with a message indicating the successful creation and the created production schedule data.
the response will be like the following format:
```
{
    "status": boolean,
    "message": "string",
    "data": { production schedule }
}
```
1. the created production schedule data should be the same as the request data except the following fields(the back rule will be applied):
   1. If the actualOnMachineDate of the request is null, the status of the new production schedule will be "尚未上機".
   2. If the actualOnMachineDate of the request is not null, the status of the new production schedule will be "On-going".
   3. If the status of the request in ["暫停生產", "取消生產"], the status of the new production schedule will be the same as the request.
   4. If the actualFinishDate of the request is not null, the status of the new production schedule will be "Done".

2. if the following fields are null, the system will not calculate the value of the field `planFinishDate`:
   1. workOrderQuantity
   2. planOnMachineDate
   3. moldingSecond
   4. moldCavity
   5. dailyWorkingHours
   6. conversionRate
   7. moldWorkDays

3. fields of the response are as follows:
    | Field | Description |
    | --- | --- |
    | status | the status of the response, true for success, false for failure. |
    | message | the message of the response. |
    | data | a {production schedule} json object array. |


### 5.2 Update ProductionSchedule
#### 5.2.1 Inputs
1. the path parameter should be the id of the production schedule to be updated.
2. the payload should be a `{production schedule}` json object.
#### 5.2.2 Outputs
If successful, the system will return a 200 status code with a message indicating the successful update and the updated production schedule data.
the response will be like the following format:
```
{
    "status": boolean,
    "message": "string",
    "data": { production schedule }
}
```
1. all the fields of {production schedule} json object are optional.
2. the created production schedule data should be the same as the request data except the following fields(the back rule will be applied):
   1. If the actualOnMachineDate of the request is null, the status of the new production schedule will be "尚未上機".
   2. If the actualOnMachineDate of the request is not null, the status of the new production schedule will be "On-going".
   3. If the status of the request in ["暫停生產", "取消生產"], the status of the new production schedule will be the same as the request.
   4. If the actualFinishDate of the request is not null, the status of the new production schedule will be "Done".

3. if the following fields are null, the system will not calculate the value of the field `planFinishDate`:
   1. workOrderQuantity
   2. planOnMachineDate
   3. moldingSecond
   4. moldCavity
   5. dailyWorkingHours
   6. conversionRate
   7. moldWorkDays
4. fields of the response are as follows:
    | Field | Description |
    | --- | --- |
    | status | the status of the response, true for success, false for failure. |
    | message | the message of the response. |
    | data | a {production schedule} json object array. |
### 5.3 Get ProductionSchedule
#### 5.3.1 Inputs
1. the following parameters are optional
    | Parameter | Description | Acceptable Values |
    | --- | --- | --- |
    | page | Page number | [1, 1000000] |
    | size | Size of the page | [1, 1000000] |
    | sort | Sort by a column | ["id", "productionArea", "machineSN", "serialNumber", "workOrderSN", "productSN", "productName", "workOrderQuantity", "workOrderDate", "moldingSecond", "hourlyCapacity", "dailyCapacity", "planOnMachineDate", "actualOnMachineDate", "moldWorkDays", "workDays", "planFinishDate", "actualFinishDate", "comment", "dailyWorkingHours", "moldCavity", "week", "singleOrDoubleColor", "conversionRate", "status"] |
    | status_filter | union the filtered status | ["尚未上機", "On-going", "Done", "暫停生產", "取消生產", "all"] |
    | week_filter | (planFinishDate) week number | [1, 53] |
    | year_filter | (planFinishDate) year number | [1, 2200] //this system will be expired in 2200 |
    | month_filter | (planFinishDate) month number | [1, 12] |

#### 5.3.2 Outputs
If successful, the system will return a 200 status code with the retrieved production schedule data. If the production schedule is not found, a 404 status code is returned.
the format of the response is as follows:
```
{
    "status": boolean,
    "message": "string",
    "data": [{ production schedule }],
    "meta": {
        "page": int,
        "size": int,
        "sort": "string",
        "total_page": int,
        "total_count": int,
    }
}
```
1. the response should be the intersection of the filtered status and the filtered week and the filtered year and the filtered month.
2. the response should be sorted by the sort column.
3. the response should be paginated by the page and the size.
4. fields of the response are as follows:
    | Field | Description |
    | --- | --- |
    | status | the status of the response, true for success, false for failure. |
    | message | the message of the response. |
    | data | a {production schedule} json object array. |
    | meta | the meta data of the response should be a json object. |
    | page | the page number of the response by the request. |
    | size | the size of the page of the response by the request. |
    | sort | the sort column of the response by the request. |
    | total_page | the total page of the response by the size of the request. |
    | total_count | the total count of the response by the size of the request. |

### 5.4 Delete ProductionSchedule
#### 5.4.1 Inputs
1. the path parameter should be the id of the production schedule to be updated.
#### 5.4.2 Outputs
If successful, the system will return a 200 status code with a message indicating the successful deletion.
the response will be like the following format:
```
{
    "status": boolean,
    "message": "string",
}
```
1. fields of the response are as follows:
    | Field | Description |
    | --- | --- |
    | status | the status of the response, true for success, false for failure. |
    | message | the message of the response. |

## 6. Log Design
### 6.1 Log Format
1. the log format will be the following format:
```
{
    "timestamp": datetime, //the time of the log
    "level": "string", //the level of the log
    "message": "string", //the message of the log to describe the action
    "data": "object"  //the data of the log
}
"timestamp": "2021-01-01 00:00:00"
"level": ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
"message": "{who} {what} {where} {why}"
"data": {json object}
```
```
example:
{
    "timestamp": "2021-01-01 00:00:00",
    "level": "INFO",
    "message": "Bob create production schedule at 127.0.0.1 action logging",
    "data": {'productionArea': 'A', 'machineSN': 'A01', 'serialNumber': 1, 'workOrderSN': 'WO0001', 'productSN': 'P0001', 'productName': 'P1', 'workOrderQuantity': 1000, 'workOrderDate': '2021-01-01 00:00:00', 'moldingSecond': 10, 'hourlyCapacity': 360, 'dailyCapacity': 8640, 'planOnMachineDate': '2021-01-01 00:00:00', 'actualOnMachineDate': '2021-01-01 00:00:00', 'moldWorkDays': 1, 'workDays': 1, 'planFinishDate': '2021-01-01 00:00:00', 'actualFinishDate': '2021-01-01 00:00:00', 'comment': 'comment', 'dailyWorkingHours': 24, 'moldCavity': 1, 'week': 1, 'singleOrDoubleColor': '單色', 'conversionRate': 1, 'status': '尚未上機'}
}
{
    "timestamp": "2021-01-01 00:00:00",
    "level": "INFO",
    "message": "Bob update production schedule at 127.0.0.1 action logging",
    "data": {'productionArea': 'A'}
}
{
    "timestamp": "2021-01-01 00:00:00",
    "level": "DEBUG",
    "message": "Bob update production schedule at 127.0.0.1 debug",
    "data": {'workDays': 1}"
}
{
    "timestamp": "2021-01-01 00:00:00",
    "level": "ERROR",
    "message": "Bob update production schedule at 127.0.0.1 exception",
    "data": {
        'request': {'productionArea': 'A'},
        'exception': 'ValueException',
        'message': e.message,
        'process_info': {
            'caller':"shiftByHolidays",
            'line': 100,
        }
    }
}
```
2. the log will be stored in the database/file.
3. each api should have the following log rules:
   1. at beginning of the api, it should have a log with level INFO to describe the api is called.
   2. at the end of the api, it should have a log with level INFO to describe the api is finished.
   3. a DEBUG log should be added when the api is doing something important.
   4. a ERROR log should be added when the api is doing something important and it has an exception.
   5. a CRITICAL log should be added when the api is doing something important and it has an exception and the exception is not handled.

## 7. Test Plan
### 7.1 Test Strategy
1. the test will be implemented by flask testing framework.
2. the test will be implemented by the following steps:
   1. create a test database.
   2. create a test data.
   3. test the apis.
   4. delete the test data.
   5. delete the test database.

### 7.2 Test Environment
1. test should be execute on a linux server with
   1. Ubuntu 20.04.6 LTS
   2. 4GB+ memory
   3. docker compose 2.23.0+
   4. network connection to the internet

### 7.3 Test Coverage
1. the test should cover the following apis:
   1. GET,POST /productionSchedule
   2. GET,PUT,DELETE /productionSchedule/{id}
2. the test should cover the following cases:
   1. create a production schedule
   2. update a production schedule
   3. get a production schedule
   4. delete a production schedule
   5. get production schedules


## 8. Test Cases
### 8.1 Test Case 1 - create a production schedule
1. go to the OpenAPI page
2. click the POST /productionSchedule
3. click the Try it out button
4. fill the request body by default
5. click the Execute button
6. check the response body
   1. the status should be true
   2. the data should be the same as the request body except the following fields:
      1. the id should be a number
      2. the status should be "Done"
      3. the planFinishDate should be calculated by the following formula:
         1. hourlyCapacity = (60 * 60) * (1/moldingSecond) * moldCavity
         2. dailyCapacity = hourlyCapacity * dailyWorkingHours * conversionRate
         3. workDays = workOrderQuantity / dailyCapacity
         4. planFinishDate = workOrderDate + datetime.timedelta(days=workDays+moldWorkDays)
      4. the workDays should be calculated by the formula
7. check the database
   1. it should have a new production schedule data on productionSchedule table
8. check the log
   1. the log should have a log with level INFO to describe the api is called.
   2. the log should have a log with level DEBUG to describe the api is doing something important.
   3. the log should have a log with level INFO to describe the api is finished.
#### 8.1.1 Test Case 1.1 - create a production schedule with null fields

1. fill the request body
   1. the following fields are null:
      1. workOrderQuantity
      2. planOnMachineDate
      3. moldingSecond
      4. moldCavity
      5. dailyWorkingHours
      6. conversionRate
      7. moldWorkDays
2. check the response body
   1. the status should be true
   2. the data should be the same as the request body except the following fields:
      1. the id should be a number
      2. the status should be "Done"
      3. the workDays should be null
      4. the planFinishDate should be null

### 8.2 Test Case 2 - update a production schedule
1. go to the OpenAPI page
2. click the PUT /productionSchedule/{id}
3. click the Try it out button
4. fill the path parameter with a existing production schedule id
5. fill the request body with the following fields:
   1. workOrderQuantity: 1000
   7. moldingSecond: 30
   6. planOnMachineDate: 2024-01-01 00:00:00
   5. moldWorkDays: 1
   2. moldCavity: 1
   3. dailyWorkingHours: 8
   4. conversionRate: 0.95
6. click the Execute button
7. check the response body
   1. the status should be true
   2. the data should be the same as the request body except the following fields:
      1. the status should be "Done" if the actualFinishDate
      2. the workDays should be 2
      3. the planFinishDate should be 2024-01-04 00:00:00
8. check the database
   1. it should have a updated production schedule data on productionSchedule table
9. check the log
   1. the log should have a log with level INFO to describe the api is called.
   2. the log should have a log with level DEBUG to describe the api is doing something important.
   3. the log should have a log with level INFO to describe the api is finished.

### 8.3 Test Case 3 - get a production schedule
1. go to the OpenAPI page
2. click the GET /productionSchedule/{id}
3. click the Try it out button
4. fill the path parameter with a existing production schedule id
5. click the Execute button
6. check the response body
   1. the status should be true
   2. the data should be the same as the production schedule data on the database
7. check the log
   1. the log should have a log with level INFO to describe the api is called.
   2. the log should have a log with level DEBUG to describe the api is doing something important.
   3. the log should have a log with level INFO to describe the api is finished.

### 8.4 Test Case 4 - delete a production schedule
1. go to the OpenAPI page
2. click the DELETE /productionSchedule/{id}
3. click the Try it out button
4. fill the path parameter with a existing production schedule id
5. click the Execute button
6. check the response body
   1. the status should be true
7. check the database
   1. it should not have the production schedule data on productionSchedule table
8. check the log
   1. the log should have a log with level INFO to describe the api is called.
   2. the log should have a log with level DEBUG to describe the api is doing something important.
   3. the log should have a log with level INFO to describe the api is finished.

### 8.5 Test Case 5 - get production schedules
1. go to the OpenAPI page
2. click the GET /productionSchedule
3. click the Try it out button
4. click the Execute button
5. check the response body
   1. the status should be true
   2. the data should be the same as the production schedule data on the database
   3. the meta should be the same as the request
   4. the total_count should be the same as the production schedule data count on the database
   5. the total_page should be the same as the production schedule data count on the database divided by the size of the request
   6. the page should be the same as the request
   7. the size should be the same as the request
   8. the sort should be the same as the request
6. check the log
   1. the log should have a log with level INFO to describe the api is called.
   2. the log should have a log with level DEBUG to describe the api is doing something important.
   3. the log should have a log with level INFO to describe the api is finished.

