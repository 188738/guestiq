import os
import requests
from dotenv import load_dotenv

load_dotenv()

KLAVIYO_API_KEY = os.getenv("KLAVIYO_API_KEY")

URL = "https://a.klaviyo.com/api/events/"
HEADERS = {
    "Authorization": f"Klaviyo-API-Key {KLAVIYO_API_KEY}",
    "Accept": "application/json",
    "Content-Type": "application/json",
    "revision": "2023-02-22"
}

def send_event(event_name, email, properties):
    payload = {
        "data": {
            "type": "event",
            "attributes": {
                "metric": { "name": event_name },
                "profile": { "email": email },
                "properties": properties
            }
        }
    }

    response = requests.post(URL, json=payload, headers=HEADERS)
    return response.status_code, response.text
