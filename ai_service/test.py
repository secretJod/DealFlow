import os
from groq import Groq
from dotenv import load_dotenv, find_dotenv

# 1. Check if .env is found
load_dotenv(find_dotenv())
key = os.getenv("GROQ_API_KEY")

if not key:
    print("❌ Error: GROQ_API_KEY not found in .env")
else:
    print(f"✅ Key Found: {key[:5]}***")

    # 2. Try a simple chat completion
    try:
        client = Groq(api_key=key)
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": "Say 'AI is online'"}],
        )
        print(f"🤖 AI Response: {completion.choices[0].message.content}")
    except Exception as e:
        print(f"❌ Groq Error: {e}")