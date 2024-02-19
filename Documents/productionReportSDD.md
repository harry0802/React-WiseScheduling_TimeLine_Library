# Software Design Document for ProductionReport API
# 報工系統-生產日報紀錄表API-軟體設計文件


## Revision History
| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 2024-02-07 | 0.0.1 | Initial version | Jack |
| 2024-02-17 | 0.1.0 | Alpha version | Jack |


## 1. Introduction
### 1.1 Purpose
This document provides a detailed design description of the ProductionReport(abbreviated as PdRpt) API, which allows for the management of production reports in our system.

### 1.2 Scope
The PdRpt API is part of a larger system that manages production reports. It provides the following functionality:
* Create ProductionReport (MotherLot and ChildLot)
* Update ProductionReport
* Get ProductionReport
* Delete ProductionReport
* List ProductionReports

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
| PdRpt | Produc
* [ProductionReport SRS](/Documents/productionReportSRS.md)
* [ProductionReport SDD](/Documents/productionReportSDD.md)

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
The PdRpt API will be implemented as a RESTful API using the Python Flask framework.
The API will communicate with a MySQL database using the SQLAlchemy ORM.

## 3. System Architecture
### 3.1 Architecture Design
The PdRpt API will be implemented as a RESTful API using the Python Flask framework.
* database
* ORM
* API
* UI
* test

### 3.2 Decomposition Description
The database will be a MySQL/MariaDB database. and it will contain the following tables:
* ProductionReport

The ORM will be SQLAlchemy. It will provide an object-oriented interface to the database.

The API will be implemented using the Python Flask framework. It will provide the following endpoints:
* GET /productionReport
* POST /productionReport/motherLot
* POST /productionReport/childLot/{motherLotId}
* GET,PUT,DELETE /productionReport/{id}

The UI will be implemented using the React framework. It will provide a web-based interface to the API.

The test will be implemented by flask testing framework. It will provide the OpenAPI test to the API.

### 3.3 Design Rationale
The PdRpt API will be implemented by Python Flask framework cause it is a lightweight framework and easy to use.

## 4. Data Design
### 4.1 Database Tables
#### 4.1.1 ProductionReport
| Column | Chinese | Type | Description | Acceptable Values |
| --- | --- | --- | --- | --- |
| start_time | 開始時間(manual) | datetime | 開始時間 | (0001-01-01 00:00:00, 9999-12-32 00:00:00) |
| machine_number | 機台號碼(from PdSch) | string | 機台號碼 | /[ABCD]?[1][0-9]/ |
| workOrderSN | 製令單號(單據編號)(from PdSch) | string | 製令單號(not null) |  |
| serialNumber | 流水號 | int | 流水號(not null) | [0, 1000) |
| lotName | 批號(formula) | string | 批號 |  |
| workOrderQuantity | 製令數量(from PdSch or manual) | int | 製令數量(not null) | (0, 1000000) |
| material | 材質 | string(manual) | 材質 |  |
| moldCavity | 穴數 | int(from PdSch) | 穴數 | (0, 1000) |
| operator1 | 作業人員(一)(manual) | string | 作業人員(一)(not null) |  |
| operator2 | 作業人員(二)(manual) | string | 作業人員(二) |  |
| productionQuantity | 生產數量(manual) | int | 生產數量 | [0, 1000000) |
| colorDifference | 色差(manual) | int | 色差(count) | [0, 1000000) |
| deformation | 變形(manual) | int | 變形(count) | [0, 1000000) |
| shrinkage | 縮水(manual) | int | 縮水(count) | [0, 1000000) |
| shortage | 缺料(manual) | int | 缺料(count) | [0, 1000000) |
| hole | 破洞(manual) | int | 破洞(count) | [0, 1000000) |
| bubble | 氣泡(manual) | int | 氣泡(count) | [0, 1000000) |
| impurity | 雜質(manual) | int | 雜質(count) | [0, 1000000) |
| pressure | 壓克(manual) | int | 壓克(count) | [0, 1000000) |
| overflow | 溢料(manual) | int | 溢料(count) | [0, 1000000) |
| flowMark | 流痕(manual) | int | 流痕(count) | [0, 1000000) |
| oilStain | 油污(manual) | int | 油污(count) | [0, 1000000) |
| burr | 毛邊(manual) | int | 毛邊(count) | [0, 1000000) |
| blackSpot | 黑點(manual) | int | 黑點(count) | [0, 1000000) |
| scratch | 刮傷(manual) | int | 刮傷(count) | [0, 1000000) |
| encapsulation | 包封(manual) | int | 包封(count) | [0, 1000000) |
| other | 其它(manual) | int | 其它(count) | [0, 1000000) |
| defectiveQuantity | 不良數(formula) | int | 不良數(total count) | [0, 1000000) |
| moldModulePerHour | 模數/1H(formula) | int | 模數/1H | (0, 3600] |
| moldingSecond | 成型秒數(from PdSch) | int | 成型秒數 | (0, 86400] |
| end_time | 結束時間(manual) | datetime | 結束時間 | (0001-01-01 00:00:00, 9999-12-32 00:00:00) |
| comment | 備註(manual) | string | 備註 |  |
| workingHours | 工時(formula) | decimal | 工時 | (0, 24] |
| planProductionQuantity | 預計生產數量(formula) | int | 預計生產數量 | (0, 1000000) |
| productionQuantityDifference | 生產數差異值(formula) | int | 生產數差異值 | (-1000000, 1000000) |
| productionDefectiveRate | 生產不良率(formula) | decimal | 生產不良率 | [0, 1] |
| productionYield | 生產良率(formula) | decimal | 生產良率 | [0, 1] |
| from IoT record | ----------------- | ----------------- | ----------------- | ----------------- |
| machineMode | 機台模式(from IoT record) | string | 機台模式 | ["自動", "半自動", "手動"] |
| machineProductionModule | 機台生產模數(from IoT record) | int | 機台生產模數 | [0, 1000000) |
| machineProductionQuantity | 機台生產數量(formula) | int | 機台生產數量 | [0, 1000000) |
| machineDefectiveRate | 實際不良率(產能漏失率)(formula) | decimal | 實際不良率 | [0, 1] |
| utilizationRate | 稼動率(formula) | decimal | 稼動率 | [0, 1] |
| productionEfficiency | 產能效率(formula) | decimal | 產能效率 | [0, 1] |
| OEE | OEE(formula) | decimal | OEE | [0, 1] |

calculation by formula:
1. 不良數(formula) = sum(色差, 變形, 縮水, 缺料, 破洞, 氣泡, 雜質, 壓克, 溢料, 流痕, 油污, 毛邊, 黑點, 刮傷, 包封, 其它)
2. 模數/1H(formula) = floor((1/成型秒數) * 60 * 60 * 穴數)
3. 工時(formula) = (結束時間 - 開始時間).hours
4. 預計生產數量(formula) = 模數/1H * 工時
5. 生產數差異值(formula) = (生產數量 + 不良數) - 預計生產數量
6. 生產不良率(formula) = 不良數 / (生產數量 + 不良數)
7. 生產良率(formula) = 1 - 生產不良率
8. 機台生產數量(formula) = 機台生產模數 * 穴數
9.  實際不良率(產能漏失率)(formula) = (機台生產數量 - 生產數量) / 機台生產數量
10. 稼動率(formula) = machine working time in 24hr in IoT record / 24
11. 產能效率(formula) = (生產數量 + 不良數) / 預計生產數量
12. OEE(formula) = 稼動率 * 產能效率 * 生產良率

from IoT record:
1.  機台生產模數 = from IoT record get (2nd module - 1st module) by the 結束時間 and 開始時間
2.  機台模式 = from IoT record get the mode by the 開始時間

the following fields of mother lot:
1. SerialNumber = 000
2. calculated by the child lots
   1. 生產數量 = sum(production quantity of child lots)
   2. 不良數 = sum(defective quantity of child lots)
   3. 工時 = sum(工時 of child lots)
   4. 預計生產數量 = sum(預計生產數量 of child lots)
   5. 生產數差異值 = sum(生產數差異值 of child lots)
   6. each item of 異常 = sum(the item of child lots)

the following fields of child lots:
1. the serialNumber is auto increment and grouped by the workOrderSN
2. 製令單號 is the same as the mother lot
3. 製令數量 is the same as the mother lot
4. LotName = 製令單號 + "-" + the serialNumber


## 5. User Interface Design

the following description will use the following terms:
* {production report}: the production report data
  it can refer to the table in 4.1.1 ProductionReport.
  and it can be represented as a json object like the following:
```
{
   "id": int,
   "start_time": "datetime",
   "machine_number": "string",
   "workOrderSN": "string",
   "serialNumber": int,
   "lotName": "string",
   "workOrderQuantity": int,
   "material": "string",
   "moldCavity": int,
   "operator1": "string",
   "operator2": "string",
   "productionQuantity": int,
   "colorDifference": int,
   "deformation": int,
   "shrinkage": int,
   "shortage": int,
   "hole": int,
   "bubble": int,
   "impurity": int,
   "pressure": int,
   "overflow": int,
   "flowMark": int,
   "oilStain": int,
   "burr": int,
   "blackSpot": int,
   "scratch": int,
   "encapsulation": int,
   "other": int,
   "defectiveQuantity": int,
   "moldModulePerHour": int,
   "moldingSecond": int,
   "end_time": "datetime",
   "comment": "string",
   "workingHours": "decimal",
   "planProductionQuantity": int,
   "productionQuantityDifference": int,
   "productionDefectiveRate": "decimal",
   "productionYield": "decimal",
   "machineMode": "string",
   "machineProductionModule": int,
   "machineProductionQuantity": int,
   "machineDefectiveRate": "decimal",
   "utilizationRate": "decimal",
   "productionEfficiency": "decimal",
   "OEE": "decimal"
}
```

### 5.1 Create ProductionReport
#### 5.1.1 MotherLot
##### 5.1.1.0 Path
   POST /productionReport/motherLot/
##### 5.1.1.1 Inputs
   1. the payload should be a `{production report}` json object.
##### 5.1.1.2 Outputs
   If successful, the system will return a 200 status code with a message indicating the successful creation and the created production report data.
   the response will be like the following format:
   ```
   {
      "status": boolean,
      "message": "string",
      "data": { production report }
   }
   ```
   1. if the workOrderSN is exist in the database, the system will return a 400 status code with a message indicating the failure creation and the created production report data.
   2. the created production report data should be the same as the request data except the following fields:
      1. the IoT record fields could be change by the IoT record.
      2. the parts of the mother lot should be calculated by the child lots.
         1. productionQuantity
         2. [colorDifference, deformation, shrinkage, shortage, hole, bubble, impurity, pressure, overflow, flowMark, oilStain, burr, blackSpot, scratch, encapsulation, other]
         3. defectiveQuantity
         4. workingHours
         5. planProductionQuantity
         6. productionQuantityDifference

   3. fields of the response are as follows:
      | Field | Description |
      | --- | --- |
      | status | the status of the response, true for success, false for failure. |
      | message | the message of the response. |
      | data | a {production report} json object array. |


#### 5.1.2 ChildLot
##### 5.1.2.0 Path
   POST /productionReport/childLot/{motherLotId}
##### 5.1.2.1 Inputs
   1. the motherLotId should be the id of the mother lot.
   2. the payload should be a `{production report}` json object.
   3. the following fields are fixed:
      1. the workOrderSN should be the same as the mother lot
      2. the workOrderQuantity is the same as the mother lot
      3. [colorDifference, deformation, shrinkage, shortage, hole, bubble, impurity, pressure, overflow, flowMark, oilStain, burr, blackSpot, scratch, encapsulation, other] should be 0.

##### 5.1.2.2 Outputs
   If successful, the system will return a 200 status code with a message indicating the successful creation and the created production report data.
   the response will be like the following format:
   ```
   {
      "status": boolean,
      "message": "string",
      "data": { production report }
   }
   ```
   1. the created production report data should be the same as the request data except the following fields:
      1. the IoT record fields could be change by the IoT record.
      2. the parts of the child lot should be calculated again.
         1. serialNumber
         2. lotName
         3. workOrderQuantity is the same as the mother lot
   2. if the mother lot is not exist, the system will return a 400 status code with a message indicating the failure creation and the created production report data.
   3. fields of the response are as follows:
      | Field | Description |
      | --- | --- |
      | status | the status of the response, true for success, false for failure. |
      | message | the message of the response. |
      | data | a {production report} json object array. |


### 5.2 Update ProductionReport
#### 5.2.0 Path
   PUT /productionReport/{id}
#### 5.2.1 Inputs
1. the path parameter should be the id of the production report.
2. the payload should be a `{production report}` json object.
#### 5.2.2 Outputs
If successful, the system will return a 200 status code with a message indicating the successful update and the updated production report data.
the response will be like the following format:
```
{
    "status": boolean,
    "message": "string",
    "data": { production report }
}
```
1. all the fields of {production report} json object are optional.
2. the data should be the same as the request data except the following fields:
   1. the IoT record fields could be change by the IoT record.
   2. the parts of the mother lot should be calculated by the child lots.
      1. productionQuantity
      2. [colorDifference, deformation, shrinkage, shortage, hole, bubble, impurity, pressure, overflow, flowMark, oilStain, burr, blackSpot, scratch, encapsulation, other]
      3. defectiveQuantity
      4. workingHours
      5. planProductionQuantity
      6. productionQuantityDifference

3. fields of the response are as follows:
    | Field | Description |
    | --- | --- |
    | status | the status of the response, true for success, false for failure. |
    | message | the message of the response. |
    | data | a {production report} json object array. |

### 5.3 Get ProductionReport
#### 5.3.0 Path
   GET /productionReport/
#### 5.3.1 Inputs
1. the following parameters are optional
    | Parameter | Description | Acceptable Values |
    | --- | --- | --- |
    | page | Page number | [1, 1000000] |
    | size | Size of the page | [1, 1000000] |
    | sort | Sort by a column | ["id", "start_time", "machine_number", "workOrderSN", "serialNumber", "lotName", "workOrderQuantity", "material", "moldCavity", "operator1", "operator2", "productionQuantity", "colorDifference", "deformation", "shrinkage", "shortage", "hole", "bubble", "impurity", "pressure", "overflow", "flowMark", "oilStain", "burr", "blackSpot", "scratch", "encapsulation", "other", "defectiveQuantity", "moldModulePerHour", "moldingSecond", "end_time", "comment", "workingHours", "planProductionQuantity", "productionQuantityDifference", "productionDefectiveRate", "productionYield", "machineMode", "machineProductionModule", "machineProductionQuantity", "machineDefectiveRate", "utilizationRate", "productionEfficiency", "OEE"] |
    | week_filter | (start_time) week number | [1, 53] |
    | year_filter | (start_time) year number | [1, 9999] |
    | month_filter | (start_time) month number | [1, 12] |

#### 5.3.2 Outputs
If successful, the system will return a 200 status code with the retrieved production report data. If the production report is not found, a 404 status code is returned.
the format of the response is as follows:
```
{
    "status": boolean,
    "message": "string",
    "data": [{ production report }],
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
    | data | a {production report} json object array. |
    | meta | the meta data of the response should be a json object. |
    | page | the page number of the response by the request. |
    | size | the size of the page of the response by the request. |
    | sort | the sort column of the response by the request. |
    | total_page | the total page of the response by the size of the request. |
    | total_count | the total count of the response by the size of the request. |

### 5.4 Delete ProductionReport
#### 5.4.0 Path
   DELETE /productionReport/{id}
#### 5.4.1 Inputs
1. the path parameter should be the id of the production report.
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

### 5.5 Calculate ProductionReport
To calculate the fields of the production report
1. update the IoT record fields if the start_time and the end_time is not null.
2. update the mother lot fields by the child lots.

#### 5.5.0 Path
   PUT /productionReport/calculate/motherLot/{id}
#### 5.5.1 Inputs
1. the path parameter should be the id of the production report which is the mother lot.
#### 5.5.2 Outputs
If successful, the system will return a 200 status code with a message indicating the successful calculation.
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

2. the system will calculate the following fields of the production report:
   1. the IoT record fields should be calculated when the start_time and the end_time is not null.
   2. the parts of the mother lot should be calculated by the child lots.
      1. productionQuantity
      2. [colorDifference, deformation, shrinkage, shortage, hole, bubble, impurity, pressure, overflow, flowMark, oilStain, burr, blackSpot, scratch, encapsulation, other]
      3. defectiveQuantity
      4. workingHours
      5. planProductionQuantity
      6. productionQuantityDifference
   3. the child lots should be calculated again.
      1. IoT record fields if the start_time and the end_time is not null.

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
/** description of the log format ********
"timestamp": "2021-01-01 00:00:00"
"level": ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
"message": "{who} {what} {where} {why}"
"data": {json object}
******************************************/
```
```
example:
{
    "timestamp": "2021-01-01 00:00:00",
    "level": "INFO",
    "message": "Bob create production report at 127.0.0.1 action logging",
    "data": {'start_time': '2021-01-01 00:00:00', 'workOrderSN': '202101010001', 'workOrderQuantity': 1000, 'moldCavity': 1, 'operator1': 'Bob', 'operator2': 'Alice', 'productionQuantity': 1000, 'colorDifference': 0, 'deformation': 0, 'shrinkage': 0, 'shortage': 0, 'hole': 0, 'bubble': 0, 'impurity': 0, 'pressure': 0, 'overflow': 0, 'flowMark': 0, 'oilStain': 0, 'burr': 0, 'blackSpot': 0, 'scratch': 0, 'encapsulation': 0, 'other': 0, 'defectiveQuantity': 0, 'moldModulePerHour': 120, 'moldingSecond': 30, 'end_time': '2021-01-01 00:00:00', 'comment': 'good', 'workingHours': 8, 'planProductionQuantity': 960, 'productionQuantityDifference': 40, 'productionDefectiveRate': 0, 'productionYield': 1, 'machineMode': 'auto', 'machineProductionModule': 120, 'machineProductionQuantity': 1000, 'machineDefectiveRate': 0, 'utilizationRate': 1, 'productionEfficiency': 1, 'OEE': 1}
}
{
    "timestamp": "2021-01-01 00:00:00",
    "level": "INFO",
    "message": "Bob update production report at 127.0.0.1 action logging",
    "data": {'workingHours': '7'}
}
{
    "timestamp": "2021-01-01 00:00:00",
    "level": "DEBUG",
    "message": "Bob update production report at 127.0.0.1 debug",
    "data": {'workingHours': 7}"
}
{
    "timestamp": "2021-01-01 00:00:00",
    "level": "ERROR",
    "message": "Bob update production report at 127.0.0.1 exception",
    "data": {
        'request': {'workingHours': 'A'},
        'exception': 'ValueException',
        'message': e.message,
        'process_info': {
            ...
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
   1. GET /productionReport
   2. POST /productionReport/motherLot
   3. POST /productionReport/childLot/{motherLotId}
   4. PUT /productionReport/calculate/motherLot/{id}
   5. GET,PUT,DELETE /productionReport/{id}
2. the test should cover the following cases:
   1. create a production report (mother lot and child lot)
   2. update a production report (mother lot and child lot)
   3. get a production report (mother lot and child lot)
   4. delete a production report (mother lot and child lot)
   5. get production reports with the following parameters:
      1. page
      2. size
      3. sort
      4. week_filter
      5. year_filter
      6. month_filter


## 8. Test Cases
### 8.1 Test Case 1 - create a production report (mother lot)
1. go to the OpenAPI page
2. click the POST /productionReport/motherLot
3. click the Try it out button
4. fill the request body by default
5. click the Execute button
6. check the response body
   1. the status should be true
   2. the data should be the same as the request body except the following fields:
      1. fields should be 0 cause them are calculated by the child lots.
         1. [colorDifference, deformation, shrinkage, shortage, hole, bubble, impurity, pressure, overflow, flowMark, oilStain, burr, blackSpot, scratch, encapsulation, other]
         2. defectiveQuantity
         3. workingHours
         4. planProductionQuantity
         5. productionQuantityDifference
      2. productionDefectiveRate should be null
      3. productionYield should be null
7. check the database
   1. it should have a new production report data on ProductionReport table
8. check the log
   1. the log should have a log with level INFO to describe the api is called.
   2. the log should have a log with level DEBUG to describe the api is doing something important.
   3. the log should have a log with level INFO to describe the api is finished.

### 8.2 Test Case 2 - create a production report (child lot)
1. go to the OpenAPI page
2. click the POST /productionReport/childLot/{motherLotId}
3. click the Try it out button
4. fill the request body by default
5. click the Execute button
6. check the response body
   1. the status should be true
   2. the data should be the same as the request body except the following fields:
      1. productionDefectiveRate should be calculated by the formula
      2. productionYield should be calculated by the formula
7. check the database
   1. it should have a new production report data on ProductionReport table
   2. the mother lot should have a updated production report data on ProductionReport table
8. check the log
   1. the log should have a log with level INFO to describe the api is called.
   2. the log should have a log with level DEBUG to describe the api is doing something important.
   3. the log should have a log with level INFO to describe the api is finished.

### 8.3 Test Case 3 - update a production report (child lot)
1. go to the OpenAPI page
2. click the PUT /productionReport/{id}
3. click the Try it out button
4. fill the path parameter with a existing production report id
5. fill the request body with the following fields:
   1. colorDifference: 1
   2. other: 1
   3. productionQuantity: 100
   4. moldCavity: 1
   5. moldingSecond: 30
   6. workingHours: 8
   7. planProductionQuantity: 120*8
6. click the Execute button
7. check the response body
   1. the status should be true
   2. the data should be the same as the request body except the following fields:
      1. the planProductionQuantity should be 960
      2. the productionQuantityDifference should be 40
      3. the productionDefectiveRate should be 0
      4. the productionYield should be 1
8. check the database
   1. it should have a updated production report data on ProductionReport table
   2. the mother lot should have a updated production report data on ProductionReport table
9. check the log
   1. the log should have a log with level INFO to describe the api is called.
   2. the log should have a log with level DEBUG to describe the api is doing something important.
   3. the log should have a log with level INFO to describe the api is finished.

### 8.3 Test Case 3 - get a production report
1. go to the OpenAPI page
2. click the GET /productionReport/{id}
3. click the Try it out button
4. fill the path parameter with a existing production report id
5. click the Execute button
6. check the response body
   1. the status should be true
   2. the data should be the same as the production report data on the database
7. check the log
   1. the log should have a log with level INFO to describe the api is called.
   2. the log should have a log with level DEBUG to describe the api is doing something important.
   3. the log should have a log with level INFO to describe the api is finished.

### 8.4 Test Case 4 - delete a production report
1. go to the OpenAPI page
2. click the DELETE /productionReport/{id}
3. click the Try it out button
4. fill the path parameter with a existing production report id
5. click the Execute button
6. check the response body
   1. the status should be true
7. check the database
   1. it should not have the production report data on ProductionReport table
   2. if id is the mother lot, the child lots should be deleted too.
8. check the log
   1. the log should have a log with level INFO to describe the api is called.
   2. the log should have a log with level DEBUG to describe the api is doing something important.
   3. the log should have a log with level INFO to describe the api is finished.

### 8.5 Test Case 5 - get production reports
1. go to the OpenAPI page
2. click the GET /productionReport
3. click the Try it out button
4. click the Execute button
5. check the response body
   1. the status should be true
   2. the data should be the same as the production report data on the database
   3. the meta should be the same as the request
   4. the total_count should be the same as the production report data count on the database
   5. the total_page should be the same as the production report data count on the database divided by the size of the request
   6. the page should be the same as the request
   7. the size should be the same as the request
   8. the sort should be the same as the request
6. check the log
   1. the log should have a log with level INFO to describe the api is called.
   2. the log should have a log with level DEBUG to describe the api is doing something important.
   3. the log should have a log with level INFO to describe the api is finished.

