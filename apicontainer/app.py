from flask import Flask, request, jsonify
import os
import mysql.connector
import requests

app = Flask(__name__)

# Connect to the MySQL database using environment variables
db_config = {
    "host": os.getenv("MYSQL_HOST", "mysql"),
    "user": os.getenv("MYSQL_USER", "shms_user"),
    "password": os.getenv("MYSQL_PASSWORD", "shms_password"),
    "database": os.getenv("MYSQL_DATABASE", "shms_database")
}
db = mysql.connector.connect(**db_config)
cursor = db.cursor()

IFTTT_KEY = "get a key from IFTTT" 

@app.route("/trigger-scenario", methods=["POST"])
def trigger_scenario():
    data = request.json
    user_id = data.get("user_id")

    # Fetch the scenario for the user from the database
    cursor.execute("SELECT scenario FROM users WHERE id = %s", (user_id,))
    result = cursor.fetchone()

    if result:
        scenario = result[0]

        if scenario == "magic_morning":
            # Trigger IFTTT webhook to turn on lights
            response_light = requests.post(f"https://maker.ifttt.com/trigger/turn_lights/with/key/{IFTTT_KEY}")
            if response_light.status_code != 200:
                return jsonify({"message": "Failed to turn on lights"}), 500

            # Trigger IFTTT webhook to start vacuum
            response_vacuum = requests.post(f"https://maker.ifttt.com/trigger/start_vacuum/with/key/{IFTTT_KEY}")
            if response_vacuum.status_code != 200:
                return jsonify({"message": "Failed to start vacuum"}), 500

            return jsonify({"message": "Magic morning scenario triggered successfully"})

        elif scenario == "magic_evening":
            # Add logic for magic evening scenario
            # For example, turn on soft lights and play relaxing music
            response_soft_light = requests.post(f"https://maker.ifttt.com/trigger/turn_soft_lights/with/key/{IFTTT_KEY}")
            if response_soft_light.status_code != 200:
                return jsonify({"message": "Failed to turn on soft lights"}), 500

            response_music = requests.post(f"https://maker.ifttt.com/trigger/play_relaxing_music/with/key/{IFTTT_KEY}")
            if response_music.status_code != 200:
                return jsonify({"message": "Failed to play relaxing music"}), 500

            return jsonify({"message": "Magic evening scenario triggered successfully"})

        else:
            return jsonify({"message": "Invalid scenario"}), 400
    else:
        return jsonify({"message": "User not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)