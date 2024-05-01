import requests

def trigger_ifttt_event():
    url = "https://maker.ifttt.com/trigger/turn_lights/with/key/b9F_eA1hMb2duIm8d3fzJc0GXjaL_YVaaYv3c8TcSIx"
    
    # Additional payload data can be added here if needed
    payload = {}

    response = requests.post(url, json=payload)

    if response.status_code == 200:
        print("Success: The event has been triggered.")
    else:
        print(f"Failed to trigger the event. Status code: {response.status_code}")

if __name__ == "__main__":
    trigger_ifttt_event()
