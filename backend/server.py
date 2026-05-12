from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    sport: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    sport: Optional[str] = None
    message: str

class EmailSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class EmailCreate(BaseModel):
    email: str

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Empire AI API"}

@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact(input: ContactCreate):
    submission = ContactSubmission(**input.model_dump())
    doc = submission.model_dump()
    await db.contacts.insert_one(doc)
    doc.pop('_id', None)
    
    # Store notification for admin
    notification = {
        "id": str(uuid.uuid4()),
        "type": "contact_form",
        "recipient": os.environ.get('NOTIFICATION_EMAIL', ''),
        "subject": f"New Contact: {input.name} - {input.email}",
        "body": f"Name: {input.name}\nEmail: {input.email}\nPhone: {input.phone or 'N/A'}\nSport: {input.sport or 'N/A'}\nMessage: {input.message}",
        "read": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.notifications.insert_one(notification)
    notification.pop('_id', None)
    
    return submission

@api_router.get("/contacts", response_model=List[ContactSubmission])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return contacts

@api_router.post("/subscribe", response_model=EmailSubscription)
async def subscribe_email(input: EmailCreate):
    existing = await db.subscribers.find_one({"email": input.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    subscription = EmailSubscription(**input.model_dump())
    doc = subscription.model_dump()
    await db.subscribers.insert_one(doc)
    doc.pop('_id', None)
    return subscription

@api_router.get("/subscribers", response_model=List[EmailSubscription])
async def get_subscribers():
    subs = await db.subscribers.find({}, {"_id": 0}).to_list(1000)
    return subs

@api_router.get("/notifications")
async def get_notifications():
    notifs = await db.notifications.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return notifs

@api_router.put("/notifications/{notif_id}/read")
async def mark_notification_read(notif_id: str):
    result = await db.notifications.update_one({"id": notif_id}, {"$set": {"read": True}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"status": "ok"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    doc.pop('_id', None)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
