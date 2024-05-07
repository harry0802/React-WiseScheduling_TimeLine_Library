import os

from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path=dotenv_path, override=True)

##

import click
from flask_migrate import Migrate
from app import create_app, db
import logging
from logging.handlers import TimedRotatingFileHandler
# Import models
from flask import url_for

app = create_app(os.getenv("FLASK_CONFIG") or "default")
app.logger.setLevel(os.getenv("LOGLEVEL","INFO"))
migrate = Migrate(app, db, version_table=os.getenv("ALEMBIC_VERSION_INVENTORY","alembic"))


@app.route('/flask-health-check')
def flask_health_check():
    return "success"


@app.cli.command()
@click.argument("test_names", nargs=-1)
def test(test_names):
    """ Run unit tests """
    import unittest

    if test_names:
        """ Run specific unit tests.

        Example:
        $ flask test tests.test_auth_api tests.test_user_model ...
        """
        tests = unittest.TestLoader().loadTestsFromNames(test_names)

    else:
        tests = unittest.TestLoader().discover("tests", pattern="test*.py")

    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0

    # Return 1 if tests failed, won't reach here if succeeded.
    return 1

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)



@app.route("/site-map")
def site_map():
    links = []
    endpoints = []
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append((url, rule.endpoint))
        endpoints.append(rule.endpoint)
    return {"GET links(limit params)": links, "endpoints": endpoints}
    # links is now a list of url, endpoint tuples
#ref https://zhuanlan.zhihu.com/p/593593959
if __name__ != '__main__':
    # use flask's loggers
    formatter = logging.Formatter(
        "[%(asctime)s][%(filename)s:%(lineno)d][%(levelname)s] - %(message)s")
    handler = TimedRotatingFileHandler(
        "log/flask.log", when="D", interval=1, backupCount=7,
        encoding="UTF-8", delay=False, utc=False, )
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)

if __name__ == '__main__':
    app.debug = True
    formatter = logging.Formatter(
        "[%(asctime)s][%(filename)s:%(lineno)d][%(levelname)s][%(thread)d] - %(message)s")
    handler = TimedRotatingFileHandler(
        "flask.log", when="D", interval=1, backupCount=7,
        encoding="UTF-8", delay=False, utc=False)
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)
    app.run(host='0.0.0.0', port=5001, debug=True)