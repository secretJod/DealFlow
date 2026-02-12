
# 🛒 DealFlow - AI-Powered Community Marketplace

DealFlow is a modern, full-stack marketplace platform featuring an intelligent AI Assistant that helps users discover products, appraise selling prices, and navigate platform policies.

👀 **[Live Demo Link]** | 🚀 **Page Speed (95%+)**

---

## 🔑 Key Features

* 🤖 **AI Assistant:** Powered by **Groq (Llama 3.3-70b)** for real-time interaction.
* 🎯 **Intent Routing:** Uses **Semantic Router** to accurately distinguish between buying, selling, and support.
* 📦 **Dynamic RAG:** AI has direct access to the **Django PostgreSQL** inventory database.
* 🖼️ **Visual Shopping:** Automatic product image rendering directly in the chat interface.
* 🔐 **Secure Auth:** JWT-based authentication for user listings and profiles.
* 📱 **Responsive Design:** Fully crafted with **Tailwind CSS** for all device sizes.

---

## 🏗️ Architecture

The project is built using a microservices-inspired architecture to separate concerns and optimize performance.



---

## 📂 Project Structure

```text
DealFlow/
├── backend/          # Django REST Framework (Core API & DB)
├── ai_service/       # Flask Service (AI Logic & Semantic Router)
└── frontend/         # React.js (Vite + Tailwind UI)

🔧 Local Development
1. Clone the repository
Bash
git clone [https://github.com/secretJod/DealFlow.git](https://github.com/secretJod/DealFlow.git)
cd DealFlow

2. Setup Backend (Django)
Bash
cd backend
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


3. Setup AI Service (Flask)
Bash
cd ../ai_service
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
python app.py


4. Setup Frontend (React)
Bash
cd ../frontend
npm install
npm run dev

📄 Tech Stack
Component,Technologies
Frontend,"React.js, Tailwind CSS, Axios"
Backend,"Django REST Framework, PostgreSQL, JWT"
AI & Logic,"Flask, Groq Cloud (Llama 3), Semantic Router"

📝 Usage for Portfolio Reviewers
Buying: Ask the bot "Show me iPhones" to see live database results with images.

Selling: Ask "What is the price of a used MacBook?" to trigger the AI Appraiser.

Support: Ask about shipping or returns to see the Policy Router in action.


📄 License
Copyright © 2026 Developed by Karan Upadhyay. Code License: Released under the MIT license.
