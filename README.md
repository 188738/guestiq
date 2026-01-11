GuestIQ
Smart Guest Engagement powered by real-time Klaviyo Events

--------------------------------------------------

StaySync is a full-stack hospitality platform that turns every guest interaction
(check-ins, room service, spa bookings, late checkout, transportation, and more)
into real-time Klaviyo events for personalized engagement and CRM automation.

Every guest action becomes:
- A Firestore database record
- A Klaviyo Event
- A trigger for email, SMS, loyalty, and marketing automation

--------------------------------------------------
WHAT GuestIQ DOES

GuestIQ connects:

React Frontend
→ Flask API
→ Firestore Database
→ Klaviyo Events API
→ Email, SMS, CRM Automations

This brings e-commerce style customer tracking to hotels.

--------------------------------------------------
FEATURES

Guest Check-In
- Creates guest profile
- Sends “Guest Checked In” event

Room Service
- Sends “Room Service Ordered” event

Spa Appointments
- Sends “Spa Appointment Booked” event

Housekeeping Requests
- Sends “Housekeeping Requested” event

Late Checkout
- Sends “Late Checkout Requested” event

Transportation
- Sends “Transportation Requested” event

Checkout
- Captures rating and feedback
- Sends “Guest Checked Out” event

Simulate Stay
- Auto-generates a full guest journey
- Sends all events to Firestore and Klaviyo
- Shows live timeline
- Click any event to view guest details

--------------------------------------------------
WHO USES THIS

Guests use:
- Check-In
- Services & Amenities
- Checkout

Hotel Staff, Marketing & Management use:
- Simulate Stay
- Firestore data
- Klaviyo automation dashboards

One platform. Two roles.

--------------------------------------------------
HOW TO RUN THE PROJECT

1) Start the Backend

Open a terminal and run:

cd backend
source venv/bin/activate
python app.py

The backend will run at:
http://127.0.0.1:5001


2) Start the Frontend

Open a second terminal and run:

cd frontend
npm install
npm start

The frontend will run at:
http://localhost:3000


3) Open the App

Open your browser:
http://localhost:3000

--------------------------------------------------
SIMULATION MODE

The “Simulate Stay” tab is a demo and admin tool.

It:
- Creates a demo guest
- Runs a full hotel stay
- Sends real Klaviyo events
- Stores everything in Firestore
- Displays a live timeline
- Lets you click events to view guest details

Used for:
- Demos
- Testing
- Hackathons
- Sales and presentations

--------------------------------------------------
KLAVIYO EVENTS GENERATED

Guest Checked In
Room Service Ordered
Spa Appointment Booked
Housekeeping Requested
Late Checkout Requested
Transportation Requested
Guest Checked Out

These can trigger:
- Welcome messages
- Upsells
- Loyalty flows
- Surveys
- Recovery emails
- VIP automation

--------------------------------------------------
WHY THIS PROJECT MATTERS

Hotels run on disconnected systems.
GuestIQ turns them into a real-time CRM.

This is Klaviyo for hospitality.

It shows what each user ordered and how many events each. For example, if a user had 40 actions vs 2 actions he or she is a high value user and the hotel can market to them. 

Additionaly:

There are some users who have multiple check ins and check outs. This was just me testing.

Use of AI: I used AI to tweak methods accordingly. Once I wrote the method for handleSubmit in checkIn, I made Chat GPT LLM made a method of the same way for checkout, and all of the services so that I can be more efficient. It is the same logic. However, instead of me typing out the new variables every single time, it would be very helpful if I could get that done with the LLM.

--------------------------------------------------
END
