from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import Base, User, Friend
from __init__ import db

from sqlalchemy import create_engine
from sqlalchemy import engine

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"

db.init_app(app)
CORS(app)


@app.route("/me")
def me():
    # TODO(Yousef): implement
    pass


def get_user_from_data(data):
    user = {}
    # TODO(yousef): fill in.
    first_name = data["first_name"]
    last_name = data["last_name"]
    password_digest = data["password_digest"]
    user = User(
        first_name=["first_name"],
        last_name=["last_name"],
        email=data["email"],
        password_digest=password_digest,
    )  # TODO: pls fix syntax, thx
    return user


def check_password_and_get_user(data):
    email = data["email"]
    maybe_existing_user = db.session.query(User).filter_by(email=email).first()
    if (
        maybe_existing_user is None
        or data["password_digest"] != maybe_existing_user.password_digest
    ):
        return None
    return maybe_existing_user


# Account Creation.
@app.route("/create_account", methods=["POST"])
def create_account():
    data = request.json

    email = data["email"]
    # maybe_existing_user = User.query.filter_by(email = email).first()
    maybe_existing_user = db.session.query(User).filter(User.email == email).first()
    if maybe_existing_user is not None:
        return {"status": "FAILURE", "error_message": "User email already exists."}

    user = get_user_from_data(data)

    db.session.add(user)
    db.session.commit()

    return {"status": "SUCCESS", "id": user.id, "email": user.email, "name": user.name}


@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password_digest = data.get("password_digest")

    if email is None or password_digest is None:
        return {"status": "FAILURE", "error_message": "Invalid form data."}

    maybe_user = check_password_and_get_user(data)
    if maybe_user is None
        return {
            "status": "FAILURE",
            "error_message": "Username or password is incorrect.",
        }
    return {"status": "SUCCESS", "id": user.id, "email": user.email, "name": user.name}


# Accessing/changing friend data.
@app.route("/add_friend", methods=["POST"])
def add_friend():
    data = request.json

    maybe_new_friend = Friend(name=data["name"], user=data["user"])

    return (
        {
            "id": id,
            "name": "New Friend",
            "frequency": "Daily",
            "lastMessaged": "temp",
            "birthday": "today",
        },
    )


@app.route("/get_friends")
def get_friends():
    id = 10
    data = [
        {
            "id": id,
            "name": "Yousef",
            "frequency": "Daily",
            "lastMessaged": "temp",
            "birthday": "today",
        },
    ]
    return jsonify(data)


@app.route("/get_friends", methods=["POST"])
def remove_friend():
    data = request.json
    # check if friend exists
    return {"id": id}


@app.route("/update_friend", methods=["POST"])
def update_friend():
    data = request.json

    if not check_password(data):
        return {
            "status": "FAILURE",
            "error_message": "Username or password is incorrect.",
        }

    user = get_user_from_data(data)
    return {"status": "SUCCESS", "id": user.id, "email": user.email, "name": user.name}


if __name__ == "__main__":
    app.run()
    db.init_app(app)
    db.create_all()
    user = User(name="John", email="john@example.com", password_digest="temp")
    friend1 = Friend(name="Jane", user=user)
    friend2 = Friend(name="Mike", user=user)
    db.session.add(user)
    db.session.add(friend1)
    db.session.add(friend2)
    db.session.commit()
