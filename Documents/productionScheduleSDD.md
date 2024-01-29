# Software Design Document for ProductionSchedule API
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
* Get ProductionSchedule Report

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
* [ProductionSchedule Test Plan](/Documents/productionScheduleTestPlan.md)
* [ProductionSchedule Test Cases](/Documents/productionScheduleTestCases.md)

### 1.5 Overview
The rest of this document is organized as follows:
* Section 2 provides an overview of the system architecture.
* Section 3 provides a detailed design description of the system.
* Section 4 provides a detailed description of the data design.
* Section 5 provides a detailed description of the user interface design.
* Section 6 provides a detailed description of the test plan.
* Section 7 provides a detailed description of the test cases.



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
* GET /productionSchedule/report

The UI will be implemented using the React framework. It will provide a web-based interface to the API.

The test will be implemented by flask testing framework. It will provide the OpenAPI test to the API.

### 3.3 Design Rationale
The PdSch API will be implemented by Python Flask framework cause it is a lightweight framework and easy to use.
And team members are familiar with it.

## 4. Data Design
### 4.1 Database Tables
#### 4.1.1 ProductionSchedule
| Column | Chinese | Type | Description |
| --- | --- | --- | --- |
| id | 序號 | int | Primary Key |
| productionArea | 生產區域 | string | |
| machineSN | 機台編號 | string | |
| serialNumber | 序號 | int | |
| workOrderSN | 單據編號 | string | |
| productSN | 產品編號 | string | |
| productName | 產品名稱 | string | |
| workOrderQuantity | 製令數量 | int | |
| workOrderDate | 製令開立日期 | date | |
| moldingSecond | 成型秒數 | int | |
| hourlyCapacity | 每小時產能 | int | |
| dailyCapacity | 日產能 | int | |
| planOnMachineDate | 預計上機日 | date | |
| actualOnMachineDate | 實際上機日 | date | |
| moldWorkDays | 上下模工作日 | int | |
| workDays | 工作天數 | int | |
| planFinishDate | 預計完成日 | date | |
| actualFinishDate | 實際完成日 | date | |
| comment | 備註 | string | |
| dailyWorkingHours | 日工時 | int | |
| moldCavity | 穴數 | int | |
| week | 週別 | int | |
| singleOrDoubleColor | 單雙色射出 | string | |
| conversionRate | 製程轉換率 | decimal | |
| status | Status | string | |

## 5. Component Design

## 5. User Interface Design
### 5.1 Create ProductionSchedule
#### 5.1.1 Inputs
The api expects a payload containing the production schedule data.
#### 5.1.2 Outputs
If successful, the system will return a 200 status code with a message indicating the successful creation and the created production schedule data.

### 5.2 Update ProductionSchedule
#### 5.2.1 Inputs
The api expects an ID of the production schedule to be updated and a payload containing the updated fields.
#### 5.2.2 Outputs
If successful, the system will return a 200 status code with a message indicating the successful update and the updated production schedule data. If the production schedule is not found, a 404 status code is returned.

### 5.3 Get ProductionSchedule
#### 5.3.1 Inputs
The api expects an ID of the production schedule to be retrieved.
#### 5.3.2 Outputs
If successful, the system will return a 200 status code with the retrieved production schedule data. If the production schedule is not found, a 404 status code is returned.

### 5.4 Delete ProductionSchedule
#### 5.4.1 Inputs
The api expects an ID of the production schedule to be deleted.
#### 5.4.2 Outputs
If successful, the system will return a 200 status code with a message indicating the successful deletion. If the production schedule is not found, a 404 status code is returned.

