[toc]

# Base Project

Base Project 為專案開發的基本架構，包含了前端、後端、Docker 以及 NGINX 設定。開發新專案時，git clone 此專案到地端，重新命名專案名稱，接著以專案需求進行開發。

# Docker 設定

### 1. 在專案根目錄下，複製 `.env.docker` 並新增 `.env`

```bash
cp .env.docker .env
```

### 2. 修改 `.env` 以下環境變數，或依需求修改其他環境變數。

- DB_DATABASE
- DB_PASSWORD
- JWT_SECRET_KEY
- ALEMBIC_VERSION

### 3. 執行 Docker

```bash
docker compose up -d
```

# 後端設定

### 1. 移至 backend 資料夾

```bash
cd backend
```

### 2. 安裝套件

```bash
pipenv install
```

```bash
pipenv shell
```

# 資料庫設定

### 1. 開啟 Docker Desktop，點選 backend 容器

### 2. 點選 `Terminal` tab

### 3. 初始化設定並新增 migrations 資料夾 (已有 migrations 資料夾的話可略過)

```bash
flask db init
```

### 4. 在 models 資料夾新增 model 之後，在 models 資料夾下的 \_\_init\_\_.py import model

```python
from .modelName import ModelName
```

### 5. 產生 migration scripts

```bash
flask db migrate -m 'your comment here'
```

### 6. 將異動更新到資料庫

```bash
flask db upgrade
```

# 架構概略:

## backend
1. app
    1. api
        1. calendar
            1. controller.py (API method, sub path setting, openAPI doc)
            2. dto.py (namespace setting, openAPI Input/Output model setting)
            3. schemas.py (dump model after db query, used in service.py)
            4. service.py (main programming area )
        2. function parts
            1. controller.py (API method, sub path setting, openAPI doc)
            2. dto.py (namespace setting, openAPI Input/Output model setting)(marshmallow can do validation)
            3. schemas.py (dump model after db query, most used in service.py)(marshmallow)
            4. service.py (main programming area )
        3. \_\_init\_\_.py (blueprint, namespace, flask command setting)
    2. models
        1. ORM (for db query using)
    3. schedule
        1. task.py (python crontab)
    4. \_\_init\_\_.py (init for auth, api, schedule, db)
    5. utils.py
2. log
    1. .gitkeep (git empty folder)
    2. flask.log (rotate by day, 7days a round)
3. migrations(flask db upgrade, downgrade)
    1. versions
        1. DB design (sqlalchemy and alembic)(flask db migrate -m "add xxx")
4.  giya.py (gunicorn execute entry point)
5.  init.sh (docker execute entry point)

## ref
1. https://github.com/X1Zeth2X/flask-restx-boilerplate/tree/master
2. https://sean22492249.medium.com/flask-with-gunicorn-9a37bca2922

