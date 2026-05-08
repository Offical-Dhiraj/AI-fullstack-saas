# 🚀 Quick.ai – Full Stack AI SaaS Platform

An advanced Full Stack AI SaaS application built using the **PERN Stack** with multiple AI-powered tools like image generation, background removal, object removal, blog generation, and resume review.

## 🌐 Live Features

* ✍️ AI Blog Title Generator
* 📝 AI Article Writer
* 🎨 AI Image Generator
* 🖼️ AI Background Remover
* ❌ AI Object Remover
* 📄 AI Resume Reviewer
* 🌍 Community Image Sharing
* 🔐 Authentication with Clerk
* ☁️ Cloudinary Image Storage
* ⚡ Responsive Modern UI

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Clerk Authentication
* React Hot Toast

## Backend

* Node.js
* Express.js
* PostgreSQL / Neon DB
* Clerk Backend Auth
* Cloudinary
* AI APIs (Gemini / OpenAI / Grok)

---

# 📁 Project Structure

```bash
AI-fullstack-saas/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── Server/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── aiController.js
│   │   └── userController.js
│   │
│   ├── middlewares/
│   │   └── auth.js
│   │
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── README.md
└── package.json
```

---

# ⚙️ Environment Variables

## Frontend `.env`

```env
VITE_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

---

## Backend `.env`

```env
PORT=3000

DATABASE_URL=your_database_url

CLERK_SECRET_KEY=your_clerk_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Offical-Dhiraj/AI-fullstack-saas.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd ../Server
npm install
```

---

# ▶️ Run Project

## Start Backend

```bash
npm run server
```

OR

```bash
npm run dev
```

---

## Start Frontend

```bash
cd client
npm run dev
```

---

# 🔥 Features Breakdown

## 📝 AI Writing Tools

* Blog Title Generation
* Full Article Writing
* SEO Friendly Content

## 🎨 AI Image Tools

* AI Image Generation
* Remove Background
* Remove Objects from Images

## 📄 Resume AI

* Resume Review
* Skill Suggestions
* ATS Optimization

## 🌍 Community Section

* Publish AI Creations
* Explore Community Posts
* Share Generated Images

---

# 🔐 Authentication

This project uses **Clerk Authentication** for:

* Sign In / Sign Up
* Session Management
* User Protection
* Secure APIs

---

# ☁️ Cloudinary Integration

Cloudinary is used for:

* Image Hosting
* Image Optimization
* AI Image Transformations

---

# 📦 API Routes

## AI Routes

```bash
/api/ai/generate-article
/api/ai/generate-image
/api/ai/remove-background
/api/ai/remove-object
/api/ai/review-resume
```

---

## User Routes

```bash
/api/user/get-user-creations
/api/user/get-published-creations
/api/user/toggle-like-creations
```

---

# 📸 Screenshots

Add your project screenshots here.

```md
![Home Page](./screenshots/home.png)
![Dashboard](./screenshots/dashboard.png)
```

---

# 🚀 Deployment

## Frontend

* Vercel
* Netlify

## Backend

* Render
* Railway
* VPS

## Database

* Neon PostgreSQL

---

# 📈 Future Improvements

* 💳 Stripe Subscription System
* 🤖 AI Chat Assistant
* 📊 Analytics Dashboard
* 🧠 Multiple AI Model Support
* 🌐 Social Sharing
* 📱 Mobile Responsive Improvements

---

# 🤝 Contributing

Pull requests are welcome.

For major changes, please open an issue first to discuss what you would like to change.

---

# 📄 License

MIT License

---

# 👨‍💻 Author

## Dhiraj Kumar

* GitHub: https://github.com/Offical-Dhiraj
* LinkedIn: Add Your LinkedIn
* Portfolio: Add Your Portfolio

---

# ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork the project
* 🛠️ Contribute improvements
* 📢 Share with others
