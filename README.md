# AI-IVR-Automation: Intelligent Restaurant Voice Assistant

AI-IVR-Automation is a sophisticated, AI-powered Interactive Voice Response (IVR) system designed specifically for the hospitality industry. It leverages cutting-edge Voice AI to handle restaurant reservations and food orders autonomously, providing a seamless, human-like experience in multiple languages including **English** and **Bangla**.

---

## 🚀 Key Features

- **🗣️ Multilingual Voice AI**: Human-like conversational agents powered by Vapi.ai and OpenAI.
- **📅 Automated Reservations**: Handles table bookings, guest counts, and scheduling without human intervention.
- **🍔 Smart Food Ordering**: Supports Dine-in, Takeaway, and Delivery orders with real-time menu synchronization.
- **📊 Live Dashboard**: A modern web interface to track calls, view live transcripts, and manage order statuses.
- **✉️ Automated Confirmations**: Sends email notifications for successful bookings and orders.
- **🌍 Regional Support**: Optimized for the South Asian market with robust Bengali (Bangla) language support.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: [Django 5.2](https://www.djangoproject.com/)
- **API**: [Django REST Framework](https://www.django-rest-framework.org/)
- **Database**: PostgreSQL (Production), SQLite (Development)
- **Documentation**: [drf-spectacular](https://github.com/tfranzel/drf-spectacular) (OpenAPI 3.0)
- **Task Queue**: Integrated with Vapi Webhooks

### Frontend
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Voice Integration**: [Vapi Web SDK](https://docs.vapi.ai/)

### AI & Voice
- **Voice Orchestration**: [Vapi.ai](https://vapi.ai/)
- **LLM**: OpenAI GPT-4o-mini
- **Transcription (STT)**: Google Gemini 2.0 Flash / Deepgram
- **Speech Synthesis (TTS)**: OpenAI TTS / ElevenLabs

---

## 📁 Project Structure

```text
.
├── backend/            # Django REST API
│   ├── appointment/    # Reservation logic & models
│   ├── restaurant/     # Menu, Categories & Ordering logic
│   ├── conversation/   # Call logs & transcript storage
│   └── ivr/            # Project configuration & settings
├── frontend/           # Next.js Dashboard & Agent UI
│   ├── app/            # Next.js App Router pages
│   ├── Components/     # Reusable UI components
│   ├── Apis/           # API integration layer
│   └── Store/          # Redux state management
└── ivr-ai/             # Python scripts for Vapi Assistant configuration
```

---

## ⚙️ Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL
- Vapi.ai API Key
- OpenAI API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables in `.env` (refer to `.env.sample`):
   ```env
   DEBUG=True
   SECRET_KEY=your_secret_key
   PROD_DB_NAME=your_db
   PROD_DB_USER=your_user
   PROD_DB_PASS=your_password
   PROD_DB_HOST=localhost
   PROD_DB_PORT=5432
   EMAIL_HOST_USER=your_email
   EMAIL_HOST_PASSWORD=your_app_password
   ```
5. Run migrations and seed the menu:
   ```bash
   python manage.py migrate
   python manage.py seed_menu
   ```
6. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### AI Agent Configuration
To update or deploy the Vapi assistants, use the scripts in the `ivr-ai/` directory:
```bash
cd ivr-ai
# Edit bangla.py or english.py with your VAPI_API_KEY
python bangla.py
```

---

## 📖 API Documentation
Once the backend is running, you can access the interactive API documentation at:
- **Swagger UI**: `http://localhost:8000/api/schema/swagger-ui/`
- **Redoc**: `http://localhost:8000/api/schema/redoc/`

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.
