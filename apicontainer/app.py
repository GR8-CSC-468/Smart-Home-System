from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Connect to the MySQL database
db = mysql.connector.connect(
    host="mysql",
    user="root",
    password="your_mysql_root_password",
    database="shms"
)

cursor = db.cursor()

@app.route("/trigger-scenario", methods=["POST"])
def trigger_scenario():
    data = request.json
    user_id = data["user_id"]

    # Fetch the scenario for the user from the database
    cursor.execute("SELECT scenario FROM users WHERE id = %s", (user_id,))
    result = cursor.fetchone()
    if result:
        scenario = result[0]
        # Run the scenario logic (e.g., trigger IFTTT webhooks)
        # if scenario == "magic_morning":
        #     trigger_ifttt("turn_lights", "your_ifttt_key")
        #     trigger_ifttt("start_vacuum", "your_ifttt_key")
        # elif scenario == "magic_evening":
        #     ...
        return jsonify({"message": f"Scenario {scenario} triggered successfully"})
    else:
        return jsonify({"message": "User not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
