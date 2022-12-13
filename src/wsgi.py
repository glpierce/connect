from backend import init_app


# yo yo yo, this is the entry point into our backend app

app = init_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000)
