# flaskPlastic

派工系統

## 系統需求

- [Ubuntu 20.04 LTS](https://releases.ubuntu.com/20.04/)
- [Docker 20.10.21](https://docs.docker.com/engine/install/ubuntu/)
- [Docker compose 2.19.1](https://docs.docker.com/compose/install/)

## 系統架構
```
______________________________________
|        User PCs                    |
______________________________________
|   Nginx (https, cache, rules)      |
______________________________________
| React  | => | Flask | => DB        |
| SSR    |    |  API  | => ERP system|
|        |    | TASK  |              |
______________________________________
```
## Docker
複製原始碼到本地：
```bash
git clone git@gitlab.com:ts_team/flaskplastic.git
```

執行下列指令建置並啟動所有服務：

```bash
cd flaskplastic
docker compose up -d  #default development mode
```

正常啟動後執行 `docker ps` 應可以看見如下結果：
$ docker ps
CONTAINER ID   IMAGE                         COMMAND                  CREATED         STATUS                  PORTS                                                                                        NAMES
e12d57b666f6   nginx:1.19-alpine             "/docker-entrypoint.…"   19 hours ago    Up 19 hours           ...  flaskplastic-nginx-1
c7882e48699c   node:19-alpine                "docker-entrypoint.s…"   19 hours ago    Up 19 hours           ...  flaskplastic-frontend-1
266307bea205   flaskplastic-inventory        "sh init.sh"             19 hours ago    Up 19 hours (healthy) ...  flaskplastic-inventory-1
6562fa8bdb78   gunicorn_flask                "sh init.sh"             19 hours ago    Up 19 hours (healthy) ...  flaskplastic-backend-1

停止所有啟動的服務：

```bash
cd flaskplastic
docker compose stop
```

### 修改環境變數

複製根目錄下的 `.env.docker`，命名為 `.env`，並修改如下內容：

``` bash
# DB
DB_PASSWORD=thisPasswordShouldBeModified
DB_PORT=

# Flask
FLASK_APP=giya.py
FLASK_ENV=development
LOGLEVEL=WARNING
FLASK_RUN_PORT=5000
SECRET_KEY=
DATABASE_URL=mysql://root:${DB_PASSWORD}@db/flaskplastic

# FrontEnd
# should be the public ip:port of the backend service
REACT_APP_API_HOST=http://localhost 
REACT_APP_API_PORT=5000
REACT_APP_PORT=80

# JWT
JWT_SECRET_KEY=
```


複製根目錄下的 `whitelist.conf.example`，命名為 `whitelist.conf`，並修改如下內容：

``` bash
192.168.1.0/24 1; # allow by subnet
192.168.0.1 1; # allow single IP
0.0.0.0/0 1; # allow all
```

## 產品環境建置 🖥

執行下列指令建置並啟動所有服務：

```bash
cd flaskplastic
docker compose -f compose-production.yaml build
docker compose -f compose-production.yaml up -d
```
## 開發環境建置 🛠

執行下列指令建置並啟動所有服務：

```bash
cd flaskplastic
docker compose up -d
```
 開啟 Swagger 確認服務正常執行

開啟 [http://localhost:5000/api/](http://localhost:5000/api/) 可以看到對應的 Swagger API 文件，並可以直接測試 API 執行。