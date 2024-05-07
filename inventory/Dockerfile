FROM python:3.11-alpine

# upgrade pip
RUN pip install --upgrade pip

# get requried packages
RUN apk update \
  && apk add --virtual build-deps gcc python3-dev musl-dev \
  && apk add --no-cache mariadb-dev curl

# permissions and nonroot user for tightened security
RUN adduser -D nonroot
RUN mkdir /home/app/ && chown -R nonroot:nonroot /home/app
RUN mkdir -p /var/log/flask-app && touch /var/log/flask-app/flask-app.err.log && touch /var/log/flask-app/flask-app.out.log
RUN chown -R nonroot:nonroot /var/log/flask-app
WORKDIR /home/app
USER nonroot

# copy all the files to the container
COPY --chown=nonroot:nonroot . .
# RUN mv .env.docker .env

# # venv
# ENV VIRTUAL_ENV=/home/app/venv

# python setup
# RUN python -m venv $VIRTUAL_ENV
# ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ARG FLASK_APP=giya.py
ARG FLASK_ENV=development
ARG FLASK_RUN_PORT=5000
ARG FLASK_RUN_HOST=0.0.0.0
ENV FLASK_APP=${FLASK_APP}
ENV FLASK_ENV=${FLASK_ENV}
ENV FLASK_RUN_PORT=${FLASK_RUN_PORT}
ENV FLASK_RUN_HOST=${FLASK_RUN_HOST}

USER root
RUN pip install -r requirements.txt

USER root
RUN apk del build-deps

USER nonroot

# define the port number the container should expose
EXPOSE 5000

CMD ["flask", "run"]