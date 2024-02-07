#!/bin/sh
flask db upgrade
# ref https://www.linkedin.com/pulse/logs-flask-gunicorn-pedro-henrique-schleder
gunicorn -w ${WORKS:-1} -t 60 \
    -b 0.0.0.0:5000 \
    --log-level=info \
    --log-file=flask.log \
    --capture-output \
    giya:app 