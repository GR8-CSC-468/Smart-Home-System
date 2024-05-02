from fastapi import FastAPI, HTTPException
import mysql.connector
import os

app = FastAPI()

# Database connection configuration
db_config = {
    "host": os.getenv("MYSQL_HOST", "mysql"),
    "user": os.getenv("MYSQL_USER", "shms_user"),
    "password": os.getenv("MYSQL_PASSWORD", "shms_password"),
    "database": os.getenv("MYSQL_DATABASE", "shms_database")
}

# Create database connection
db = mysql.connector.connect(**db_config)
cursor = db.cursor()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/trigger-scenario")
async def trigger_scenario(user_id: int):
    cursor.execute("SELECT scenario FROM users WHERE id = %s", (user_id,))
    result = cursor.fetchone()
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    scenario = result[0]
    # Additional logic for scenarios would go here
    return {"scenario": scenario}
