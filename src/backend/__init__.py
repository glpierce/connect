from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_app():
    # core app inits
    app = Flask(__name__, )
    app.config.from_object('config.DevConfig')

    # plugin init
    db.init_app(app)
    CORS(app)

    with app.app_context():

        from . import routes

        db.create_all()

        # temp seed
        # user = User(first_name="John", email="john@example.com", password_digest="temp")
        # friend1 = Friend(name="Jane", user=user)
        # friend2 = Friend(name="Mike", user=user)
        # db.session.add(user)
        # db.session.add(friend1)
        # db.session.add(friend2)
        # db.session.commit()

        return app