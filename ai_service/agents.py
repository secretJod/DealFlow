import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_ai_response(user_msg, intent, inventory, history):
    # --- 1. PRODUCT SEARCH (With Buying Logic) ---
    if intent == "product_search":
        system_msg = (
            "You are the DealFlow Sales Assistant. "
            "Your ONLY knowledge of products comes from this LIVE INVENTORY: \n"
            f"--- START INVENTORY ---\n{inventory}\n--- END INVENTORY ---\n"
            "INSTRUCTIONS:\n"
            "1. If an item is in stock, describe it and ALWAYS include its Image_URL.\n"
            "2. If the user expresses interest in buying or seeing a specific product, "
            "you MUST end your message with the tag 'PRODUCT_ID: [ID]' using the ID from the inventory.\n"
            "3. Example: 'That iPhone looks great! PRODUCT_ID: 5'.\n"
            "4. If the product is not in the list, say it's out of stock."
        )

    # --- 2. SELLING HELP ---
    elif intent == "selling_help":
        system_msg = (
            "You are a Marketplace Appraiser. Suggest a fair market price in INR (₹) "
            "based on common trends. Ask about the item's condition to be more accurate."
        )

    # --- 3. POLICY SEARCH ---
    elif intent == "policy_search":
        system_msg = (
            "You are a Support Agent for DealFlow. Shipping takes 3-5 days. "
            "Returns are allowed within 30 days."
        )

    # --- 4. FALLBACK ---
    else:
        system_msg = "You are a helpful assistant for DealFlow, a community marketplace."

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": f"{system_msg}\n\nHistory:\n{history}"},
                {"role": "user", "content": user_msg}
            ],
            temperature=0.2, 
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Agent Error: {str(e)}"