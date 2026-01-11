from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase import db
from klaviyo import send_event
from firebase_admin import firestore

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/", methods=["GET"])
def health():
    return {"status": "StaySync Flask backend running"}

from firebase_admin import firestore as fb_firestore

@app.route("/checkin", methods=["POST"])
def checkin():
    data = request.get_json(silent=True) or {}

    # Validate required fields
    required = ["name", "email", "room", "nights"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}", "received": data}), 400

    # Normalize nights
    try:
        data["nights"] = int(data["nights"])
    except Exception:
        return jsonify({"error": "nights must be a number"}), 400

    # Firestore timestamp
    data["timestamp"] = fb_firestore.SERVER_TIMESTAMP

    # Save to Firebase
    doc_ref = db.collection("checkins").add(data)
    doc_id = doc_ref[1].id
    print("✅ Firestore saved:", doc_id)
    print("📥 Frontend payload:", data)

    # Build Klaviyo payload
    klaviyo_properties = {
        "room": data["room"],
        "nights": data["nights"],
        "guest_name": data["name"],
        "source": "StaySync Web App"
    }

    # Send to Klaviyo
    try:
        print("📤 Sending to Klaviyo:", {
            "event": "Guest Checked In",
            "email": data["email"],
            "properties": klaviyo_properties
        })

        send_event(
            event_name="Guest Checked In",
            email=data["email"],
            properties=klaviyo_properties
        )

        print("✅ Klaviyo event sent")

    except Exception as e:
        print("❌ Klaviyo error:", e)

    return jsonify({
        "success": True,
        "id": doc_id
    })


# --------------------
# ROOM SERVICE
# --------------------
@app.route("/room-service", methods=["POST"])
def room_service():
    data = request.json

    data["status"] = "pending"
    data["timestamp"] = firestore.SERVER_TIMESTAMP

    doc = db.collection("roomService").add(data)
    print("Room service saved:", doc[1].id)

    try:
        send_event("Room Service Ordered", data["email"], {
            "room": data["room"],
            "item": data["item"]
        })
    except Exception as e:
        print("Klaviyo error:", e)

    return jsonify({"success": True})


# --------------------
# SPA
# --------------------
@app.route("/spa", methods=["POST"])
def spa():
    data = request.json
    data["timestamp"] = firestore.SERVER_TIMESTAMP

    doc = db.collection("spaAppointments").add(data)
    print("Spa booked:", doc[1].id)

    try:
        send_event("Spa Appointment Booked", data["email"], data)
    except Exception as e:
        print("Klaviyo error:", e)

    return jsonify({"success": True})


from firebase_admin import firestore as fb_firestore

#Checkout

@app.route("/checkout", methods=["POST"])
def checkout():
    data = request.get_json(silent=True) or {}

    required = ["room", "rating"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}", "received": data}), 400

    try:
        data["rating"] = int(data["rating"])
    except:
        return jsonify({"error": "rating must be a number"}), 400

    data["timestamp"] = fb_firestore.SERVER_TIMESTAMP

    # Save to Firestore
    doc_ref = db.collection("checkouts").add(data)
    doc_id = doc_ref[1].id
    print("✅ Checkout saved:", doc_id)
    print("📥 Frontend payload:", data)

    # Send Klaviyo event
    klaviyo_props = {
        "room": data["room"],
        "rating": data["rating"],
        "comments": data.get("comments", ""),
        "source": "StaySync Web App"
    }

    try:
        print("📤 Sending Checkout to Klaviyo:", klaviyo_props)

        send_event(
            event_name="Guest Checked Out",
            email=data.get("email", "unknown@guest.com"),  # optional
            properties=klaviyo_props
        )

        print("✅ Klaviyo checkout event sent")

    except Exception as e:
        print("❌ Klaviyo error:", e)

    return jsonify({"success": True, "id": doc_id})


# --------------------
# SIMULATION
# --------------------
@app.route("/simulate", methods=["POST"])
def simulate():
    data = request.json
    data["timestamp"] = firestore.SERVER_TIMESTAMP

    doc = db.collection("simulations").add(data)
    print("Simulation saved:", doc[1].id)

    try:
        send_event("Simulated Guest Journey", data["email"], data)
    except Exception as e:
        print("Klaviyo error:", e)

    return jsonify({"success": True})

# -------
# Housekeeping
# ----


@app.route("/housekeeping", methods=["POST"])
def housekeeping():
    data = request.get_json(silent=True) or {}

    required = ["room", "type", "time"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}", "received": data}), 400

    data["timestamp"] = firestore.SERVER_TIMESTAMP
    data["status"] = "pending"

    # Save to Firestore
    doc_ref = db.collection("housekeeping").add(data)
    doc_id = doc_ref[1].id
    print("✅ Housekeeping saved:", doc_id)
    print("📥 Frontend payload:", data)

    # Send to Klaviyo
    klaviyo_props = {
        "room": data["room"],
        "request_type": data["type"],
        "preferred_time": data["time"],
        "notes": data.get("notes", ""),
        "source": "StaySync Web App"
    }

    try:
        print("📤 Sending Housekeeping to Klaviyo:", klaviyo_props)

        send_event(
            event_name="Housekeeping Requested",
            email=data.get("email") or "ava@demo.com",
            properties=klaviyo_props
        )

        print("✅ Klaviyo housekeeping event sent")

    except Exception as e:
        print("❌ Klaviyo error:", e)

    return jsonify({"success": True, "id": doc_id})



# ----
# Late Checkout

# ---

@app.route("/late-checkout", methods=["POST"])
def late_checkout():
    data = request.get_json(silent=True) or {}

    required = ["room", "checkoutTime"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}", "received": data}), 400

    data["timestamp"] = firestore.SERVER_TIMESTAMP
    data["status"] = "pending"

    # Save to Firestore
    doc_ref = db.collection("lateCheckouts").add(data)
    doc_id = doc_ref[1].id
    print("✅ Late checkout saved:", doc_id)
    print("📥 Frontend payload:", data)

    # Send Klaviyo event
    klaviyo_props = {
        "room": data["room"],
        "requested_checkout_time": data["checkoutTime"],
        "reason": data.get("reason", ""),
        "source": "StaySync Web App"
    }

    try:
        print("📤 Sending Late Checkout to Klaviyo:", klaviyo_props)

        send_event(
            event_name="Late Checkout Requested",
            email=data.get("email") or "ava@demo.com",
            properties=klaviyo_props
        )

        print("✅ Klaviyo late checkout event sent")

    except Exception as e:
        print("❌ Klaviyo error:", e)

    return jsonify({"success": True, "id": doc_id})



# ----
# Special Requests
# ---

@app.route("/special-request", methods=["POST"])
def special_request():
    data = request.get_json(silent=True) or {}

    required = ["room", "category", "details"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}", "received": data}), 400

    data["timestamp"] = firestore.SERVER_TIMESTAMP
    data["status"] = "open"

    # Save to Firestore
    doc_ref = db.collection("specialRequests").add(data)
    doc_id = doc_ref[1].id
    print("✅ Special request saved:", doc_id)
    print("📥 Frontend payload:", data)

    # Send Klaviyo event
    klaviyo_props = {
        "room": data["room"],
        "category": data["category"],
        "details": data["details"],
        "source": "StaySync Web App"
    }

    try:
        print("📤 Sending Special Request to Klaviyo:", klaviyo_props)

        send_event(
            event_name="Special Request Submitted",
            email=data.get("email", "unknown@guest.com"),
            properties=klaviyo_props
        )

        print("✅ Klaviyo special request event sent")

    except Exception as e:
        print("❌ Klaviyo error:", e)

    return jsonify({"success": True, "id": doc_id})


# ----
# Transportation
# ---

@app.route("/transportation", methods=["POST"])
def transportation():
    data = request.get_json(silent=True) or {}

    required = ["room", "tripType", "location", "date", "time"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}", "received": data}), 400

    try:
        data["passengers"] = int(data.get("passengers", 1))
    except:
        data["passengers"] = 1

    data["timestamp"] = firestore.SERVER_TIMESTAMP
    data["status"] = "scheduled"

    # Save to Firestore
    doc_ref = db.collection("transportation").add(data)
    doc_id = doc_ref[1].id
    print("✅ Transportation saved:", doc_id)
    print("📥 Frontend payload:", data)

    # Send Klaviyo event
    klaviyo_props = {
        "room": data["room"],
        "trip_type": data["tripType"],
        "location": data["location"],
        "date": data["date"],
        "time": data["time"],
        "passengers": data["passengers"],
        "notes": data.get("notes", ""),
        "source": "StaySync Web App"
    }

    try:
        print("📤 Sending Transportation to Klaviyo:", klaviyo_props)

        send_event(
            event_name="Transportation Requested",
            email=data.get("email") or "ava@demo.com",
            properties=klaviyo_props
        )

        print("✅ Klaviyo transportation event sent")

    except Exception as e:
        print("❌ Klaviyo error:", e)

    return jsonify({"success": True, "id": doc_id})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)

