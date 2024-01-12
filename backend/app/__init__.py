""" Top level module

This module:

- Contains create_app()
- Registers extensions
"""

from flask import Flask

# Import extensions
from .extensions import bcrypt, cors, db, jwt, ma, scheduler

# Import config
from config import config_by_name
import os

from werkzeug.routing import BaseConverter
class IntListConverter(BaseConverter):
    regex = r'\[\s*\d+\s*(,\s*\d+\s*)*\]\s*'

    def to_python(self, value):
        return [int(x) for x in value.strip('][').split(',')]

    def to_url(self, value):
        return '['+','.join(str(x) for x in value)+']'

basedir = os.path.abspath(os.path.dirname(__file__))


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    app.url_map.converters['int_list'] = IntListConverter

    register_extensions(app)

    #ONLY disable 
    if os.getenv('BACKEND_MODE',"MIX") == "SEPARATION" and os.getenv('BACKEND_SYS',"API") == "API":
        pass
    else:
        # Start scheduler
        from .schedule import tasks
        scheduler.start()


    if os.getenv('BACKEND_SYS',"API") == "TASK":
        pass
    else:
        # Register blueprints
        from .auth import auth_bp

        app.register_blueprint(auth_bp)

        from .api import api_bp

        app.register_blueprint(api_bp, url_prefix="/api")

    return app


def register_extensions(app):
    # Registers flask extensions
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)
    if os.getenv('BACKEND_MODE',"MIX") == "SEPARATION" and os.getenv('BACKEND_SYS',"API") == "API":
        pass
    else:
        scheduler.init_app(app)
