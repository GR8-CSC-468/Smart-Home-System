from fastapi import FastAPI, HTTPException
import mysql.connector
import os

app = FastAPI()

# Connect to the MySQL database using environment variables or fallback to static IP
db_config = {
    "host": os.getenv("MYSQL_HOST", "10.43.190.3"),  # Changed to use the Cluster IP
    "user": os.getenv("MYSQL_USER", "shms_user"),
    "password": os.getenv("MYSQL_PASSWORD", "shms_password"),
    "database": os.getenv("MYSQL_DATABASE", "shms_database")
}

# Initialize the database connection
try:
    db = mysql.connector.connect(**db_config)
    cursor = db.cursor()
    print("Successfully connected to the database.")
except mysql.connector.Error as e:
    print(f"Error connecting to MySQL database: {e}")
    raise HTTPException(status_code=500, detail="Database connection failed")

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

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
