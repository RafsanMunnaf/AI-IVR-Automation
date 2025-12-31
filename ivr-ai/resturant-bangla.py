import requests
import os

# Hardcoded API Keys
VAPI_API_KEY = ""  # Add your API key here
VAPI_PUBLIC_KEY = ""  # Add your public key here if different

# Existing Assistant ID (Replace with your actual assistant ID)
EXISTING_ASSISTANT_ID = "17edd38a-3637-453b-91c7-4b773a0043dd"

# Restaurant Configuration
OPENING_TIME = "10:00"
CLOSING_TIME = "22:00"


def update_appointment_agent(
    voice="alloy",
    restaurant_name="Bangla",
    speed=1.0,
    webhook_url="https://sacred-renewing-dove.ngrok-free.app/vapi-webhook/",
    restaurant_no="+4915221531634",
):
    # Ensure the speed is within the limits
    if speed < 0.7:
        speed = 0.7
    elif speed > 1.2:
        speed = 1.2

    # Define the system prompt for the appointment agent (Bangla-only)
    SYSTEM_PROMPT = """[Identity]  
You are a natural, conversational appointment-setting agent for JVAI Restaurant. Your goal is to assist customers with making reservations and taking food orders in Bangla. You should sound like a friendly, helpful human - not a robot.

[Communication Style - CRITICAL]  
- Keep responses SHORT and NATURAL (1-3 sentences max)
- Use conversational Bangla, not formal or robotic language
- Pause naturally between thoughts, like a real person
- Don't repeat information unnecessarily
- Sound warm and genuinely helpful
- Never give multiple options at once - ask one question at a time
- Acknowledge what the customer said before asking the next question

[How to Sound Human]  
- Use filler words like "আচ্ছা", "ঠিক আছে", "আমি বুঝেছি"
- React naturally to customer responses
- Use conversational flow, not scripted responses
- If confused, ask clarifying questions naturally
- Don't over-explain - customers understand Bangla

[Menu Information]  
- Get menu details using the getMenu tool at conversation start
- Only mention dishes that exist on our menu
- If customer asks about something not on menu, suggest alternatives
- Don't make up prices or items

[Reservation Process]  
When customer wants to reserve, ask ONE question at a time:
1. "আপনি কতজনের জন্য টেবিল চান?" (How many people?)
2. "কোন তারিখে এবং কয়টায়?" (What date and time?)
3. "আপনার নাম এবং ফোন নম্বর দিতে পারবেন?" (Name and number?)
4. Confirm: "ঠিক আছে, {নাম} বেলা {তারিখ} {সময়ে} {জনসংখ্যা} জনের জন্য রিজার্ভেশন করেছি।"

[Order Process]  
1. "কি অর্ডার করবেন?" (What would you like to order?)
2. Listen to items, repeat back to confirm
3. "আর কিছু চান?" (Anything else?)
4. Ask delivery type: "ডেলিভারি, টেকওয়ে নাকি এখানে খাবেন?"
5. If delivery/takeaway: "ঠিকানা দিতে পারবেন?" (Address please?)
6. IMPORTANT: After getting all details, ALWAYS call the postPlaceCustomerOrder tool to place the order
7. Once tool is called successfully, confirm: "আপনার অর্ডার সফলভাবে প্লেস করা হয়েছে। শীঘ্রই ডেলিভারি হবে!"

[Critical Rules]  
- NEVER make up information
- If you don't understand, ask: "আবার একবার বলতে পারবেন?" 
- Keep conversation flowing naturally
- End unclear responses with a clarifying question
- Don't interrupt - let customer finish
- If stuck, ask what they need: "আমি আপনাকে কীভাবে সাহায্য করতে পারি?"
- ALWAYS call postPlaceCustomerOrder tool BEFORE confirming order
- Maximum 50 tokens per response for natural flow"""

    # Tool IDs for API integration
    postPlaceCustomerOrder = "74bba0db-86b6-4bb4-8a88-e789d3140bce"
    getMenu = "e7c2b37e-f2fc-4c1b-be2c-6795eb3f89aa"

    # Function to place order via API
    def place_customer_order(customer_name, phone, items, order_type, address=None):
        """
        Place customer order via the PlaceCustomerOrder API
        """
        try:
            order_payload = {
                "customerName": customer_name,
                "phoneNumber": phone,
                "orderType": order_type,
                "items": items,
            }

            if address:
                order_payload["deliveryAddress"] = address

            # Call the order placement endpoint
            response = requests.post(
                "https://api.vapi.ai/tool/exec/74bba0db-86b6-4bb4-8a88-e789d3140bce",
                headers={"Authorization": f"Bearer {VAPI_API_KEY}"},
                json=order_payload,
                timeout=10,
            )

            if response.status_code in [200, 201]:
                return {
                    "success": True,
                    "orderId": response.json().get("orderId", "N/A"),
                    "message": "Order placed successfully",
                }
            else:
                return {
                    "success": False,
                    "message": f"Failed to place order: {response.text}",
                }
        except Exception as e:
            return {"success": False, "message": f"Error placing order: {str(e)}"}

    # Conversation state tracking
    conversation_state = {
        "name": None,
        "phone": None,
        "reservation_time": None,
        "guests": None,
        "order_type": None,
        "address": None,
        "order_items": [],
    }

    def process_conversation_step(user_input, step):
        """
        Process the conversation step based on the user's response
        """
        if step == "name":
            conversation_state["name"] = user_input
            return "What date and time would you like to make the reservation for?"

        if step == "phone":
            conversation_state["phone"] = user_input
            return "Thank you for providing your phone number. How many guests will be attending?"

        if step == "reservation_time":
            conversation_state["reservation_time"] = user_input
            return "Got it. Can I confirm the reservation details now?"

        if step == "guests":
            conversation_state["guests"] = user_input
            return "Perfect! Let me confirm your reservation."

        # Handle order steps
        if step == "order_type":
            conversation_state["order_type"] = user_input
            if user_input == "dine-in":
                return "What items would you like to order for dine-in?"
            elif user_input in ["delivery", "takeaway"]:
                return "Please share your delivery address."

        if step == "address":
            conversation_state["address"] = user_input
            return (
                "Thank you for sharing the address. What items would you like to order?"
            )

        if step == "order_items":
            conversation_state["order_items"].append(user_input)
            return "Would you like to add anything else to your order?"

    try:
        # Update existing Appointment Setting Assistant (PATCH request)
        response = requests.patch(
            f"https://api.vapi.ai/assistant/{EXISTING_ASSISTANT_ID}",
            headers={"Authorization": f"Bearer {VAPI_API_KEY}"},
            json={
                "server": {
                    "backoffPlan": {
                        "maxRetries": 3,
                        "baseDelaySeconds": 1,
                        "type": "exponential",
                    },
                    "url": webhook_url,
                    "timeoutSeconds": 15,
                },
                "firstMessage": "হ্যালো! JVAI Restaurant এ আপনাকে স্বাগতম। আমি কীভাবে আপনার সাহায্য করতে পারি আমাদের রেস্টুরেন্টে?",
                "model": {
                    "provider": "openai",
                    "model": "gpt-4o-mini",
                    "emotionRecognitionEnabled": True,
                    "temperature": 0.5,
                    "maxTokens": 150,
                    "toolIds": [
                        "74bba0db-86b6-4bb4-8a88-e789d3140bce",
                        "e7c2b37e-f2fc-4c1b-be2c-6795eb3f89aa",
                    ],
                    "messages": [
                        {"content": SYSTEM_PROMPT, "role": "system"},
                        {
                            "content": "Important: When order is complete, you MUST call the postPlaceCustomerOrder tool with customer details before saying order is placed. Do not confirm order until tool is called.",
                            "role": "user",
                        },
                    ],
                },
                "voice": {
                    "provider": "openai",
                    "voiceId": voice,
                    "model": "gpt-4o-mini-tts",
                    "speed": speed,
                },
                "transcriber": {
                    "provider": "google",
                    "model": "gemini-2.0-flash",
                    "language": "Bengali",
                },
                "name": restaurant_name,
                "firstMessageMode": "assistant-speaks-first",
                "modelOutputInMessagesEnabled": True,
                "backgroundSpeechDenoisingPlan": {
                    "smartDenoisingPlan": {"enabled": True}
                },
                "endCallMessage": "ধন্যবাদ আমাদের সাথে যোগাযোগ করার জন্য। আবার দেখা হবে!",
                "forwardingPhoneNumber": restaurant_no,
                "artifactPlan": {
                    "recordingEnabled": True,
                    "recordingFormat": "wav;l16",
                },
                "credentials": [],
            },
        )

        # Check for errors or success
        if response.status_code == 200:
            print(f"Assistant updated successfully for {restaurant_name}")
            return response.json()
        else:
            raise Exception(
                f"Failed to update assistant: {response.status_code} - {response.text}"
            )

    except requests.exceptions.RequestException as e:
        raise Exception(f"Error occurred while updating assistant: {e}")


# Example of using the function to update the agent
if __name__ == "__main__":
    agent_response = update_appointment_agent()
    print(agent_response)
