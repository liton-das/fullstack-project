# 🚀 Full Stack Blog Application

A modern **full-stack blog platform** built using the **MERN stack** with authentication, blog management, comments, and user profile features. This project demonstrates real-world application architecture, API handling, and deployment using **Vercel**.

---

## 📌 Live Demo

* 🌐 Frontend: https://your-frontend-url.vercel.app

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit (RTK Query)
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication (Access + Refresh Token)
* Multer (File Upload)

### Deployment

* Vercel (Frontend + Backend)
* MongoDB Atlas (Database)

---

## ✨ Features

### 🔐 Authentication

* User Registration
* OTP Verification
* Login & Logout
* Refresh Token System
* Secure Cookie-based Authentication

### 👤 User Features

* Update Profile
* View Profile
* Get User Lists

### 📝 Blog Features

* Create Blog (with thumbnail upload)
* Update Blog
* Delete Blog
* Get Blog Lists (Pagination)
* Read Blog by Slug
* Get Blogs by Author

### 🔍 Search

* Search blogs by keywords

### 💬 Comments

* Add Comments
* Update Comments
* Delete Comments
* Get All Comments

---

## 📁 Project Structure

```
fullstack-project/
│
├── client/              # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/    # RTK Query APIs
│   │   └── app/
│
├── server/              # Backend (Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Environment Variables

Create `.env` file in backend:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLIENT_URL=your_frontend_url
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/liton-das/fullstack-project.git
cd fullstack-project
```

### 2️⃣ Install Dependencies

#### Backend:

```bash
cd server
npm install
```

#### Frontend:

```bash
cd client
npm install
```

---

### 3️⃣ Run Locally

#### Backend:

```bash
npm run start
```

#### Frontend:

```bash
npm run dev
```

---

# 🔗 API Endpoints (Detailed)

## 📝 Blog APIs

| Method | Endpoint                             | Description                  | Auth |
| ------ | ------------------------------------ | ---------------------------- | ---- |
| POST   | `/blog/v1/create-blog`               | Create blog (with thumbnail) | ✅    |
| PUT    | `/blog/v1/update-blog/:id`           | Update blog                  | ✅    |
| GET    | `/blog/v1/get-blog-lists`            | Get all blogs (pagination)   | ❌    |
| GET    | `/blog/v1/single-blog`               | Get blogs by logged-in user  | ✅    |
| GET    | `/blog/v1/search-tarms/:searchItems` | Search blogs                 | ❌    |
| GET    | `/blog/v1/read/:slug`                | Read blog by slug            | ❌    |
| DELETE | `/blog/v1/delete-blog/:id`           | Delete blog                  | ✅    |

---

## 💬 Comment APIs

| Method | Endpoint                             | Description            | Auth |
| ------ | ------------------------------------ | ---------------------- | ---- |
| POST   | `/blog/v1/create-comment/:id`        | Create comment on blog | ✅    |
| GET    | `/blog/v1/get-all-comments`          | Get all comments       | ✅    |
| PUT    | `/blog/v1/update-comment/:commentId` | Update comment         | ✅    |
| DELETE | `/blog/v1/delete-comment/:id`        | Delete comment         | ✅    |

---

## 🔐 Auth APIs

| Method | Endpoint                       |
| ------ | ------------------------------ |
| POST   | `/auth/v1/register`            |
| POST   | `/auth/v1/login`               |
| POST   | `/auth/v1/logout`              |
| POST   | `/auth/v1/verify-otp`          |
| POST   | `/auth/v1/resend-otp`          |
| POST   | `/auth/v1/refreshAccess-token` |
| GET    | `/auth/v1/get-profile`         |

---

## 🧠 Key Learnings

* RTK Query API handling
* JWT Authentication with Refresh Token
* Cookie-based auth in production
* MongoDB connection handling in Vercel
* File upload using Multer
* Full-stack deployment

---

## ⚠️ Common Issues & Fixes

### ❌ MongoDB Connection Error

* Ensure `MONGO_URI` is set in Vercel
* Allow IP: `0.0.0.0/0` in MongoDB Atlas

### ❌ CORS Issue

```js
cors({
  origin: "your-frontend-url",
  credentials: true
})
```

### ❌ Cookies Not Working

```js
sameSite: "none",
secure: true
```

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a PR.

---

## 📄 License

This project is licensed under the MIT License.

---

## 💬 Author

**Liton Das**

* GitHub: https://github.com/liton-das

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
