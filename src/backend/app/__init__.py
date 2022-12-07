from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# create an instance of SQLAlchemy
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    # initialize the database with the app
    db.init_app(app)

    # import and register blueprints
    from app.routes import main

    app.register_blueprint(main)

    return app
