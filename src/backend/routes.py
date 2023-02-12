from flask import current_app as app
from flask import jsonify, request

from .models import User, Friend, db


# hello! only routes (and their helpers) should live here!
# nothing else

@app.route("/me")
def me():
    # TODO(Yousef): implement
    pass


def get_new_user_from_data(data):
    user = {}
    # TODO(yousef): fill in.
    first_name = data["first_name"]
    last_name = data["last_name"]
    password_digest = data["password_digest"]
    email = data["email"]
    user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password_digest=password_digest,
    )
    return user


def _check_password_and_get_user(data):
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
    maybe_existing_user = db.session.query(User).filter(User.email == email).first()
    if maybe_existing_user is not None:
        return {"status": "EMAIL_IN_USE", "error_message": "Email already in use"}, 418

    user = get_new_user_from_data(data)

    db.session.add(user)
    db.session.commit()

    return {
        "status": "SUCCESS",
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name
    }, 201


@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password_digest = data.get("password_digest")

    if email is None or password_digest is None:
        return {"status": "FAILURE", "error_message": "Invalid form data."}, 401

    maybe_user = _check_password_and_get_user(data)
    if maybe_user is None:
        return {
            "status": "FAILURE",
            "error_message": "Username or password is incorrect.",
        }, 401
    return {
        "status": "SUCCESS",
        "id": maybe_user.id,
        "email": maybe_user.email,
        "first_name": maybe_user.first_name,
        "last_name": maybe_user.last_name,
    }, 200


# Accessing/changing friend data.
@app.route("/add_friend", methods=["POST"])
def add_friend():
    # I am a dummy.
    data = request.json

    print('im alive')
    user_id = data.get("id")
    maybe_existing_user = db.session.query(User).filter(User.id == user_id).first()
    if maybe_existing_user is None:
        return {
            "status": "FAILURE",
            "error_message": "Invalid user id.",
        }

    new_friend_name = data.get("name")
    maybe_birthdate, maybe_frequency = data.get("birthdate"), data.get('frequency')

    maybe_new_friend = Friend(name=data["name"], user_id=user_id, user=maybe_existing_user)

    db.session.add(maybe_new_friend)
    db.session.commit()

    return {
        "status": "SUCCESS",
        "id": maybe_new_friend.id,
        "name": maybe_new_friend.name,
        "birthdate": maybe_new_friend.birthdate,
        "frequency": maybe_new_friend.frequency,
        "last_messaged": maybe_new_friend.last_messaged,
    }, 200


@app.route("/get_friends/<int:user_id>")
def get_friends(user_id):
    maybe_user = db.session.query(User).filter_by(id=user_id).first()
    if maybe_user is None:
        return {
            "status": "FAILURE",
            "error_message": "Invalid user id.",
        }
    print(maybe_user.friends)
    return jsonify(maybe_user.friends.order_by(Friend.name))


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

    user = get_new_user_from_data(data)
    return {"status": "SUCCESS", "id": user.id, "email": user.email, "name": user.name}
