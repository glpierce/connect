from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_app():
    # core app inits
    app = Flask(__name__, )
    app.config.from_object('config.DevConfig')

    # plugin init
    db.init_app(app)

    with app.app_context():

        from . import routes

        db.create_all()

        return app