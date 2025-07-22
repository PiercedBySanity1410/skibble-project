# Skibble - Chat Web Application

A full-stack application built with **React (Vite + TypeScript)** on the frontend and **Flask + Supabase + Socket.IO** on the backend.  
The project aims to provide a seamless real-time experience with secure authentication and database integration.

---

## 📌 Figma UI Design
[**Figma Design Link (Add here)**](https://www.figma.com/design/2H23khFwLY5eIgwvs6Igi9/Chat-Application?node-id=0-1&t=iWCSrPwICtsTFgbw-1) 

---

## 🚀 Tech Stack

### **Frontend (skibble/)**
- React + Vite + TypeScript
- SCSSS
- ESLint for code linting

### **Backend (api/)**
- Python Flask
- Socket.IO for real-time communication
- Supabase for authentication & database
- Utility scripts for modular backend handling

---

## 📂 Project Structure

```

skibble-project/
│
├── skibble/                # Frontend (React + Vite)
│   ├── src/                # React source code
│   ├── public/             # Static assets
│   ├── index.html          # Entry HTML file
│   ├── package.json        # Frontend dependencies
│   └── vite.config.ts      # Vite configuration
│
└── api/                    # Backend (Flask)
├── app.py              # Main Flask entry point
├── routes/             # API route definitions
├── supabase\_config.py  # Supabase database configuration
├── socket\_service.py   # Socket.IO server logic
├── utilities.py        # Helper functions
└── requirements.txt    # (Create this if not present)

````

---

## ⚡ Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone <your-repo-url>
cd skibble-project
````

---

### **2️⃣ Frontend Setup (`skibble/`)**

```bash
cd skibble
npm install
npm run dev
```

Runs the frontend on: **[http://localhost:5173](http://localhost:5173)**

---

### **3️⃣ Backend Setup (`api/`)**

```bash
cd api
pip install -r requirements.txt
python app.py
```

Runs the backend on: **[http://localhost:5000](http://localhost:5000)**

*(If `requirements.txt` is missing, generate it using:)*

```bash
pip freeze > requirements.txt
```

---

## ✅ Features

* Real-time communication with **Socket.IO**
* Authentication & database using **Supabase**
* Modular, scalable architecture
* Vite-powered fast frontend development
---

## 🤝 Contributing

Pull requests are welcome. Please fork the repo and create a feature branch before submitting.

---

## 📜 License

This project is licensed under the **MIT License** – feel free to modify and distribute.