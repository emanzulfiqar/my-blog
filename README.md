# 📝 Blog Management System
A full-stack blog management application with authentication, rich text editing, and modern UI/UX. Built with Node.js/Express backend and React/Next.js frontend.

📌 Features Overview

✅ Backend

JWT Authentication with secure token storage

MongoDB with Mongoose ODM

RESTful API with Express.js

Role-based post management

Input validation and error handling

Security: rate limiting, helmet, CORS

Search, pagination, and API documentation

✅ Frontend

React.js 18 App Router (or CRA-based optional UI)

Authentication & protected routes

Zustand for state management

Rich text editing with React Quill

Responsive UI with Tailwind CSS & Bootstrap

Form validation with Zod + React Hook Form

Toast notifications and clean UI/UX

🏗️ Project Architecture


blog-management/

├── backend/                 # Express.js API

│   ├── models/             # MongoDB models

│   ├── routes/             # API endpoints

│   ├── middleware/         # Auth, validation, error handlers

│   └── server.js           # Entry point

├── frontend/                # Next.js or CRA app

│   ├── app/                # App Router pages (Next.js)

│   ├── components/         # Reusable UI components

│   ├── store/              # Zustand stores

│   ├── services/           # API services

│   └── lib/                # API configuration

└── README.md               # You're here!

🚀 Getting Started

✅ Prerequisites

Node.js v18+

MongoDB (local or Atlas)

npm or yarn

🔧 Backend Setup (/backend)

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Setup environment variables:


cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

Start development server:


npm run dev

📍 Server will run at: http://localhost:5000

💻 Frontend Setup (/frontend)

Navigate to the frontend directory:


cd frontend

Install dependencies:

npm install

Setup environment variables:


cp .env.local.example .env.local
# Edit .env.local with API base URL

Start development server:


npm start

📍 App will run at: http://localhost:3000

🔐 Authentication Flow

Register with name, email, password

Login to receive JWT token

Frontend stores token & uses for requests

Protected routes require authentication

Auto login from localStorage/session

📚 API Endpoints Summary

Auth

POST /api/auth/register – Register new user

POST /api/auth/login – Login and receive token


Posts

GET /api/posts – Get all posts with optional search, pagination

GET /api/posts/:id – Get single post

POST /api/posts – Create post (auth)

PUT /api/posts/:id – Update post (owner only)

DELETE /api/posts/:id – Delete post (owner only)

🧱 Project Structure

📦 Backend (/backend)


models/          # Mongoose models: User, Post

routes/          # Express route handlers

middleware/      # Auth, validation, errors

server.js        # Main app setup

.env             # Environment config

💻 Frontend (/frontend)


app/             # Pages and routing (Next.js App Router)

components/      # UI components (Header, BlogList, etc.)

store/           # Zustand state management

services/        # API service functions

lib/             # Axios configuration

.env.local       # API endpoint config

🛡 Security Features

Backend

JWT token authentication

bcrypt password hashing

Helmet for headers

CORS config

Express rate limiter

MongoDB injection prevention

Frontend

Client-side route protection

Zod + React Hook Form validation

Token stored securely (localStorage or cookies)

XSS prevention via editor sanitization

🧪 Testing

Backend

Jest + Supertest

Authentication test cases

MongoDB in-memory for testing

Frontend

Form and component tests

🛠 Development Commands

Backend

npm run dev        # Start dev server

npm test           # Run tests

npm start          # Start prod server


Frontend

npm run dev        # Start dev server

npm run build      # Build for production

npm run start      # Start prod server

npm run lint       # Code linting


Production Env

.env (backend)


PORT=5000

NODE_ENV=production

MONGODB_URI=your-production-uri

JWT_SECRET=your-secure-secret

.env.local (frontend)

NEXT_PUBLIC_API_URL=https://your-api.com/api

🙌 Contributing

Fork the repository

Create a feature branch:


git checkout -b feature/new-feature

Commit changes:



git commit -m 'Add new feature'

Push and open a Pull Request

📄 License

This project is licensed under the MIT License.

👤 Author

Eman Zulfiqar


🙏 Acknowledgments

React.js & React team

Express & Node.js

MongoDB Atlas

Zustand, React Quill, Tailwind CSS

Bootstrap, Lucide React

Toast notifications (react-hot-toast)

