from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import databases
import sqlalchemy

# 1. Connect to the exact database Django just built
# This goes up one folder (..), into backend-admin, and grabs the sqlite file
DATABASE_URL = "sqlite:///../backend-admin/db.sqlite3"
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

# 2. Tell FastAPI what Django's table looks like
# Django automatically names tables like: foldername_modelname (api_iotdevice)
iot_devices = sqlalchemy.Table(
    "api_iotdevice",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String),
    sqlalchemy.Column("device_id", sqlalchemy.String),
    sqlalchemy.Column("latitude", sqlalchemy.Float),
    sqlalchemy.Column("longitude", sqlalchemy.Float),
    sqlalchemy.Column("status", sqlalchemy.String),
)

app = FastAPI()

# 3. Security: Allow your React frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows any frontend port (like localhost:5173) to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Database Connection Rules
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# 5. The High-Speed Data Endpoint
@app.get("/api/live-markers")
async def read_markers():
    # Fetch everything from the database
    query = iot_devices.select()
    results = await database.fetch_all(query)
    
    # Format the data EXACTLY how your Dashboard.tsx file wants it
    return [
        {
            "id": record.id,
            "name": record.name,
            "device": record.device_id,
            "pos": [record.latitude, record.longitude],
            "status": record.status
        } for record in results
    ]