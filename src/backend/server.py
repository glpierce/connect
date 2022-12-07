from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import User, Friend

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)
CORS(app)

@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/me")
def me():
    # TODO(Yousef): implement
    pass

# Account Creation.
@app.route('/create_account', methods=['POST'])
def create_account():
    pass

@app.route('/login', methods=['POST'])
def login():
    pass

# Accessing/changing friend data.
@app.route('/add_friend', methods=['POST'])
def add_friend():
    pass

@app.route("/get_friends")
def get_friends():
    data = [
        {"name": "Yousef", "frequency": "Daily"},
        {"name": "Grant", "frequency": "Monthly"},
        {"name": "Miguel", "frequency": "Yearly"},
    ]
    print(data)

    return jsonify(data)

@app.route('/update_last_messaged', methods=['POST'])
def update_last_messaged():
    pass



if __name__ == "__main__":
    app.run()
    db.create_all()
    user = User(name="John", email="john@example.com")
    friend1 = Friend(name="Jane", user=user)
    friend2 = Friend(name="Mike", user=user)
    db.session.add(user)
    db.session.add(friend1)
    db.session.add(friend2)
    db.session.commit()