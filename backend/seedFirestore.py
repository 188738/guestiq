from firebase import db
from datetime import datetime

print("🚀 Writing test data to Firestore...")

doc = {
    "email": "test@guestiq.com",
    "room": "504",
    "nights": 3,
    "service": "Spa",
    "item": "Massage",
    "status": "pending",
    "timestamp": datetime.utcnow()
}

# Add document to collection
ref = db.collection("roomService").add(doc)

print("✅ Data written!")
print("📄 Document ID:", ref[1].id)
