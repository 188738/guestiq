from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase import db
from klaviyo import send_event
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def health():
    return {"status": "StaySync Flask backend running"}

@app.route("/checkin", methods=["POST"])
def checkin():
    data = request.json
    data["timestamp"] = datetime.utcnow()

    db.collection("checkins").add(data)

    try:
        send_event(
            "Guest Checked In",
            data["email"],
            {
                "room": data["room"],
                "nights": data["nights"]
            }
        )
    except Exception as e:
        print("Klaviyo error:", e)

    return jsonify({"message": "Check-in saved"})

@app.route("/room-service", methods=["POST"])
def room_service():
    data = request.json
    data["timestamp"] = datetime.utcnow()
    data["status"] = "pending"

    db.collection("roomService").add(data)

    try:
        send_event(
            "Room Service Ordered",
            data["email"],
            {
                "room": data["room"],
                "item": data["item"]
            }
        )
    except Exception as e:
        print("Klaviyo error:", e)

    return jsonify({"message": "Room service saved"})

@app.route("/spa", methods=["POST"])
def spa():
    data = request.json
    data["timestamp"] = datetime.utcnow()

    db.collection("spaAppointments").add(data)

    try:
        send_event(
            "Spa Appointment Booked",
            data["email"],
            data
        )
    except Exception as e:
        print("Klaviyo error:", e)

    return jsonify({"message": "Spa appointment saved"})

@app.route("/checkout", methods=["POST"])
def checkout():
    data = request.json
    data["timestamp"] = datetime.utcnow()

    db.collection("checkouts").add(data)

    try:
        send_event(
            "Guest Checked Out",
            data["email"],
            { "rating": data.get("rating", 5) }
        )
    except Exception as e:
        print("Klaviyo error:", e)

    return jsonify({"message": "Checkout saved"})

@app.route("/simulate", methods=["POST"])
def simulate():
    data = request.json
    data["timestamp"] = datetime.utcnow()

    db.collection("simulations").add(data)

    try:
        send_event(
            "Simulated Guest Journey",
            data["email"],
            data
        )
    except Exception as e:
        print("Klaviyo error:", e)

    return jsonify({"message": "Simulation sent"})
