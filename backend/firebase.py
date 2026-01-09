import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("firebaseServiceAccount.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
