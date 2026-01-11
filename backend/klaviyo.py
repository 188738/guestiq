import requests

with open(".env") as f:
    for line in f:
        if line.startswith("KLAVIYO_PRIVATE_KEY"):
            KLAVIYO_KEY = line.strip().split("=")[1]

URL = "https://a.klaviyo.com/api/events/"

HEADERS = {
    "Authorization": f"Klaviyo-API-Key {KLAVIYO_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "revision": "2023-02-22"
}

def send_event(event_name, email, properties=None):
    payload = {
        "data": {
            "type": "event",
            "attributes": {
                "metric": {
                    "name": event_name
                },
                "profile": {
                    "email": email   # ✅ MUST be here
                },
                "properties": properties or {}
            }
        }
    }

    response = requests.post(URL, headers=HEADERS, json=payload)

    print("➡️ Sending event to Klaviyo...")
    print(payload)
    print("✅ Status Code:", response.status_code)
    print("📨 Response:", response.text)

    return response

