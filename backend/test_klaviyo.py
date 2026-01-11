from klaviyo import send_event

send_event(
    event_name="Order pizza",
    email="kouthub.ganugapati@guestiq.com",
    properties={
        "source": "manual test",
        "app": "StaySync"
    }
)
