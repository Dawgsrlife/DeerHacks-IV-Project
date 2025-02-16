# Eterna - AI-Powered Memory Search

![Eterna Logo](frontend/public/app.ico)

Eterna is an AI-powered memory retrieval system that allows users to **search for past experiences, images, and moments** using natural language queries. The application integrates **Google Gemini AI** for intelligent memory tagging and **offline storage** for customization.

## 🌟 Features

- **AI-Powered Search** – Retrieve images and descriptions based on AI-generated tags.
- **Timeline View** – View your past moments with a clean, structured UI.
- **Image Uploads** – Store and categorize images with automatic AI tagging.
- **Offline Storage** – Dark mode and notification settings saved using `localStorage`.
- **Fast & Responsive UI** – Built with **React + Tailwind CSS** for a smooth user experience.

---

## 📸 Screenshots

### **Personal Tasks**
![Memory Search](frontend/src/assets/screenshots/personal_tasks.png)

### **Usage Statistics**
![Timeline](frontend/src/assets/screenshots/statistics.png)

### **Image Upload with AI Tagging**
![Upload Feature](frontend/src/assets/screenshots/profile.png)

---

## 🚀 Getting Started

### 1️⃣ Backend Setup

#### **Step 1: Install Dependencies**
Ensure you have **Python 3.10+** installed, then run:
```sh
cd backend
pip install -r requirements.txt
```

#### **Step 2: Run the Backend Server**
Start the Flask API:
```sh
python app.py
```
The backend will be running at: **`http://127.0.0.1:5000`**

### 2️⃣ Frontend Setup

#### **Step 1: Install Dependencies**
Ensure you have **Node.js 16+** installed, then run:
```sh
cd frontend
npm install
```
This installs all required packages from `package.json`.

#### **Step 2: Start the Frontend**
Run the development server:
```sh
npm start
```
The frontend will be live at: **`http://localhost:3000`**

---

## 🛠 Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Flask, Google Gemini AI, Google Cloud Vision
- **Database:** Local JSON Storage
- **Authentication:** None (Future Support Planned)

---

## 📝 Contributing
Want to improve Eterna? Feel free to fork and submit a PR! 🚀

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes & commit (`git commit -m 'Added new feature'`)
4. Push your branch (`git push origin feature-branch`)
5. Open a pull request

---

## 📜 License
Eterna is licensed under the **MIT License** – free to use and modify!

---

## 💡 Acknowledgments
Special thanks to **Google GenAI** for their incredible APIs that power 
Eterna’s intelligence. 🙌

