# AI-Assisted Telemedicine Platform 🏥🤖

A futuristic telemedicine platform connecting Patients and Doctors with secure video consultations, AI-powered symptom analysis, and digital medical record management.

## 🌟 Features

### 🔐 Authentication & Roles
- **Secure Login/Signup:** JWT-based auth with secure HttpOnly cookies.
- **Role-Based Access:** Distinct dashboards for **Patients** and **Doctors**.
- **Persistent Session:** Silent refresh mechanism keeps users logged in securely.

### 📹 Video Consultation
- **HD Video Calls:** Integrated **Jitsi Meet** for high-quality, secure video consultations.
- **One-Time Access:** "Join Call" links automatically expire after the call ends for security.
- **No External App Needed:** Works directly in the browser.

### 🤖 AI Symptom Checker (Gemini Pro)
- **AI Analysis:** Users can describe symptoms in plain English.
- **Powered by Google Gemini:** Returns precise predictions, severity assessment, and recommendations.
- **Fallback Mode:** Works offline with basic keyword matching if API key is missing.

### 📋 Medical Records & Prescriptions
- **Patient Uploads:** Patients can securely upload past reports (PDF/Images).
- **Doctor Prescriptions:** Doctors can write and save digital prescriptions instantly during appointments.
- **History View:** Complete medical history accessible in one click.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), TailwindCSS, TypeScript, Lucide Icons, Shadcn/UI.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose Schema).
- **Real-Time Video:** Jitsi Meet External API.
- **AI Model:** Google Gemini Pro API.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local or Atlas URL)

### 2. Clone the Repository
```bash
git clone <repository-url>
cd AI-ASSISTED-TELEMEDICINE
```

### 3. Backend Setup
1. Navigate to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file in `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=1h
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_REFRESH_EXPIRE=7d
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
4. Start the server:
   ```bash
   npm start
   ```
   *Server runs on: `http://localhost:5000`*

### 4. Frontend Setup
1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file in `frontend/` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *App runs on: `http://localhost:3000`*

---

## 📂 Project Structure

```
AI-ASSISTED-TELEMEDICINE/
├── backend/                 # Node.js + Express Server
│   ├── src/
│   │   ├── controllers/     # Logic (Auth, Appointments, AI)
│   │   ├── models/          # Mongoose Schemas (User, Report)
│   │   ├── routes/          # API Routes
│   │   └── middleware/      # Auth & Error Handling
│   └── server.js            # Entry Point
│
├── frontend/                # Next.js Application
│   ├── app/                 # App Router Pages
│   │   ├── dashboard/       # Doctor & Patient Dashboards
│   │   ├── video-room/      # Jitsi Video Integration
│   │   └── (auth)/          # Login/Register Pages
│   ├── components/          # Reusable UI Components
│   ├── context/             # Auth Context (Global State)
│   └── lib/                 # API Utilities (Axios Interceptors)
```

---

## 👨‍⚕️ Workflow

1.  **Patient** signs up and logs in.
2.  Patient books an appointment with a **Doctor**.
3.  Doctor logs in and **Accepts** the appointment.
4.  At the scheduled time, both click **"Join Call"**.
5.  After the call, Doctor clicks **"Records"** to write a prescription.
6.  Call link expires, and status updates to **"Completed"**.

---

## 🛡️ Security Note

- **Environment Variables:** `.env` files are ignored by git. You must create them manually using the templates above.
- **Passwords:** All passwords are hashed using `bcryptjs` before storage.
- **Tokens:** Access Tokens stored in Memory/LocalStorage, Refresh Tokens in Secure HttpOnly Cookies.

---

### Developed by [Your Name] 🚀
```
