from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/me")
def me():
    # TODO(Yousef): implement
    pass


@app.route("/friends")
def friends():
    data = [
        {"name": "Yousef", "frequency": "Daily"},
        {"name": "Grant", "frequency": "Monthly"},
        {"name": "Miguel", "frequency": "Yearly"},
    ]
    print(data)

    return jsonify(data)


if __name__ == "__main__":
    app.run()
