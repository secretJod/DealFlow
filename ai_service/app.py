import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv
from router import get_intent
from agents import get_ai_response

load_dotenv(find_dotenv())
app = Flask(__name__)
CORS(app)

# Check if Key is loaded on startup
print(f"--- 🔑 AI Key Check: {'Loaded' if os.getenv('GROQ_API_KEY') else 'MISSING'} ---")

chat_memory = []

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_msg = data.get("message", "")
    inventory = data.get("inventory", "No inventory available.")
    
    # --- DB CHECK ---
    # This prints the data Django fetched from the database
    print(f"\n📦 DB DATA RECEIVED: {inventory[:200]}...") 
    
    intent = get_intent(user_msg)
    
    # --- INTENT CHECK ---
    print(f"🎯 DETECTED INTENT: {intent}")

    history_str = "\n".join([f"{m['role']}: {m['content']}" for m in chat_memory[-10:]])
    
    try:
        response = get_ai_response(user_msg, intent, inventory, history_str)
        
        chat_memory.append({"role": "user", "content": user_msg})
        chat_memory.append({"role": "assistant", "content": response})
        
        return jsonify({"reply": response, "intent": intent})
    
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return jsonify({"reply": "I'm having a brain freeze!", "error": str(e)}), 500

if __name__ == "__main__":
    # Using 0.0.0.0 makes it listen on all local addresses
    app.run(host="0.0.0.0", port=5001, debug=True)