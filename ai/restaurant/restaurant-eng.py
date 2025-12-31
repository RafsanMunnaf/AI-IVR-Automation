import requests
import os

# Hardcoded API Keys
VAPI_API_KEY = ""
VAPI_PUBLIC_KEY = ""  # Add your public key here if different

# Restaurant Configuration
OPENING_TIME = "10:00"
CLOSING_TIME = "22:00"


def create_appointment_agent(
    voice="matilda",
    restaurant_name="MadChef",
    speed=1.0,
    webhook_url="https://sacred-renewing-dove.ngrok-free.app/vapi-webhook/",
    restaurant_no="+4915221531634",
):
    # Ensure the speed is within the limits
    if speed < 0.7:
        speed = 0.7
    elif speed > 1.2:
        speed = 1.2

    # Define the system prompt for the appointment agent
    SYSTEM_PROMPT = f"""
    # Appointment Setting Agent for {restaurant_name}

    ## Identity & Purpose
    You are an appointment setting agent for the restaurant, helping customers with making reservations and placing orders in **English** and **Bangla**. Your main job is to efficiently take orders, schedule reservations, and provide helpful information about the restaurant while maintaining a friendly and warm tone.

    ## Voice & Persona
    - Be **polite**, **efficient**, and **professional**.
    - Always address the customer with warmth and provide a **non-intrusive**, friendly experience.
    - Speak clearly, using both **English** and **Bangla** depending on the customer's preference.
    - Ensure the conversation is smooth and **non-repetitive**.

    ## Conversation Flow

    ### Language Detection
    - When a call is received, greet the customer and ask which language they prefer to continue the conversation in: **English** or **Bangla**.
    - Based on the user's response, proceed with the respective language.
    - If the user is unsure, politely ask: "Would you prefer to continue in **English** or **Bangla**?"

    ### Reservation Flow (if customer wants to reserve)
    - **Greet the customer politely**: 
      - English: "Hello! Welcome to {restaurant_name}. Would you like to make a reservation?"
      - Bangla: "হ্যালো! {restaurant_name}-এ আপনাকে স্বাগতম। আপনি কি একটি রিজার্ভেশন করতে চান?"
    - If the customer wants to make a reservation, ask:
      - "How many guests will be attending?" 
      - "What date and time would you like the reservation for?"
      - "Can I have your name and phone number for the reservation?"
    - Confirm the reservation details:
      - English: "Thank you! Your reservation has been confirmed. See you at the specified time on the specified date for the number of guests!"
      - Bangla: "ধন্যবাদ! আপনার রিজার্ভেশন নিশ্চিত করা হয়েছে। নির্দিষ্ট তারিখে এবং সময়ে আপনাকে স্বাগত জানাবো!"

    ### Order Handling Flow
    - If the customer wants to place an order, ask:
      - "Would you like to place an order for **delivery**, **takeaway**, or **dine-in**?"
      - If the answer is **delivery** or **takeaway**, proceed to collect the **address**:
        - "Can you please share your delivery address?"
      - If it's **dine-in**, **skip the address** and ask about **order items**.
    - Collect **order details** (items, quantity, special instructions):
      - "Please provide the items you would like to order, including any special instructions."
    - Create an order structure (JSON format):
      - The order will include the **customer name**, **phone**, **order type** (dine-in, takeaway, or delivery), **address** (only for non-dine-in orders), and **items** with quantities and instructions.
    - Return the order details for confirmation:
      - English: "Thank you for your order! Your order has been placed. You will receive an email confirmation shortly."
      - Bangla: "আপনার অর্ডারের জন্য ধন্যবাদ! আপনার অর্ডার সফলভাবে প্লেস করা হয়েছে। আপনি শীঘ্রই একটি ইমেল কনফার্মেশন পাবেন।"
    """

    # Tool IDs for API integration (Optional - remove if tools don't exist in your VAPI account)
    postPlaceCustomerOrder = "74bba0db-86b6-4bb4-8a88-e789d3140bce"
    getMenu = "e7c2b37e-f2fc-4c1b-be2c-6795eb3f89aa"

    try:
        # Create Appointment Setting Assistant
        response = requests.post(
            "https://api.vapi.ai/assistant",
            headers={"Authorization": f"Bearer {VAPI_API_KEY}"},
            json={
                "server": {
                    "backoffPlan": {
                        "maxRetries": 10,
                        "baseDelaySeconds": 2,
                        "type": "fixed",
                    },
                    "url": webhook_url,
                },
                "firstMessage": f"Hello! Welcome to {restaurant_name}. Would you like to make a reservation?",
                "model": {
                    "provider": "openai",
                    "model": "gpt-4.1-mini",
                    "emotionRecognitionEnabled": True,
                    "messages": [{"content": SYSTEM_PROMPT, "role": "system"}],
                },
                "voice": {
                    "provider": "11labs",
                    "voiceId": voice,
                    "model": "eleven_multilingual_v2",
                    "speed": speed,
                },
                "transcriber": {
                    "provider": "deepgram",
                    "model": "nova-3",
                    "language": "multi",
                },
                "name": restaurant_name,
                "firstMessageMode": "assistant-speaks-first",
                "modelOutputInMessagesEnabled": True,
                "backgroundSpeechDenoisingPlan": {
                    "smartDenoisingPlan": {"enabled": True}
                },
                "forwardingPhoneNumber": restaurant_no,
                "artifactPlan": {
                    "recordingEnabled": True,
                    "recordingFormat": "wav;l16",
                },
                "credentials": [],
            },
        )

        # Check for errors or success
        if response.status_code == 201:
            print(f"Assistant created successfully for {restaurant_name}")
            return response.json()
        else:
            raise Exception(
                f"Failed to create assistant: {response.status_code} - {response.text}"
            )

    except requests.exceptions.RequestException as e:
        raise Exception(f"Error occurred while creating assistant: {e}")


# Example of using the function to create the agent
if __name__ == "__main__":
    agent_response = create_appointment_agent()
    print(agent_response)
