import firebase_admin
from firebase_admin import credentials, firestore

# Load service account key
cred = credentials.Certificate("firebaseServiceAccount.json")

# Initialize app only once
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()
