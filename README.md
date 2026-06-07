# Smart Patient Registration & Kiosk App

A modern, self-check-in kiosk application for hospitals and clinics. Patients can register themselves, choose a department, and receive a unique consultation token. Administrators can view, search, and manage registered patients through a premium, responsive dashboard.


## Features

- **Patient Registration**
- **Token Generation**
- **SQLite Database**
- **Admin Dashboard**
- **Search Patients**
- **Department Filter**
- **Print Token**


## Tech Stack

### Frontend
- **React**

### Backend
- **Node.**
- **Express**



## 📂 Project Structure


Patient-kiosk App/
├── backend/
│   ├── controllers/      # Route handler controllers (e.g., patientController.js)
│   ├── database/         # SQLite database configuration (db.js)
│   ├── models/           # Table schema definitions (patientModel.js)
│   ├── routes/           # API endpoints routing definitions (patientRoutes.js)
│   ├── hospital.db       # SQLite database file
│   ├── server.js         # Express app entry point
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── pages/        # Welcome, Register, TokenScreen, AdminDashboard pages
    │   ├── services/     # API integration services (AdminApi, PatientApi)
    │   ├── styles/       # Styling and CSS variables
    │   ├── App.jsx       # App configuration and routing
    │   └── main.jsx
    ├── package.json
    └── index.html



## Installation 


### Backend Server

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Frontend Application

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```


##  API Endpoints

- POST /api/patients

- GET /api/patients

- GET /api/patients/:id

- GET /api/patients?search=name