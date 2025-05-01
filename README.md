# ✍️ InkSpire — "where ideas flow and stories glow"  
A Full-Stack Blog Application (MERN)

InkSpire is a full-stack blog platform that lets users create, read, update, and delete blog posts. Built using the **MERN** stack — MongoDB, Express, React, and Node.js — it features rich text editing, image uploads, authentication, and a clean, responsive UI.

---

## 🔥 Features

✅ User Authentication (Login / Register)  
✅ Create and edit blog posts with image upload  
✅ Delete your own posts  
✅ View all posts sorted by latest  
✅ Protected routes with JWT  
✅ Custom UI with responsive design  

---

## ⚙️ Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Context API
- Custom CSS

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (auth)
- Multer (file uploads)
- Cookie-Parser & CORS

---

## 🧑‍💻 How to Setup and Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Samroy963/inkspire.git
cd inkspire

### 2. Setup and Run the Backend (API)

cd api
yarn install                 # install dependencies
yarn global add nodemon      # install nodemon globally (if not already)
nodemon index.js             # run server
🔗 Backend runs at: http://localhost:4000

### 3.  Setup and Run the Frontend (React)

cd ../client
yarn install          # install dependencies
yarn start            # start the frontend
🔗 Frontend runs at: http://localhost:3000


## 📁 Project Layout

inkspire/
│
├── client/               # React frontend
│   ├── src/              # Components, pages, and logic
│   ├── public/           # Static files
│   ├── App.js            # Main app file
│   ├── index.js          # ReactDOM entry
│   └── package.json      # Dependencies
│
├── api/                  # Express backend
│   ├── models/           # Mongoose models (User, Post)
│   ├── uploads/          # Uploaded images (via multer)
│   ├── index.js          # Main server entry
│   └── package.json      # Dependencies
│
└── README.md             # Project documentation (this file)




👨‍💻 Developed By
Roshan J — Final Year CSE Student (2025)
This is a personal project to explore full-stack development using the MERN stack and build a production-ready blog platform.
