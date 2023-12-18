#!/bin/sh
flask db upgrade
gunicorn -w 1 -t 60 -b 0.0.0.0:5000 --log-level=info giya:app