from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/')
def home():
    return jsonify({"message": "Backend is running!"})


if __name__ == '__main__':
    app.run(debug=True)
    # Open http://127.0.0.1:5000 to check if the backend is running!
