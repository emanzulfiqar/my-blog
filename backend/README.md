# Blog Management System

A full-stack blog management application with authentication, rich text editing, and modern UI/UX. Built with Node.js/Express backend and React/Next.js frontend.

## 🎯 Project Overview

This is a complete blog management system that allows users to:

- Register and login with JWT authentication
- Create, read, update, and delete blog posts
- Use a rich text editor for content creation
- View posts with author information
- Manage their own posts with proper authorization

## 🏗 Architecture

```
blog-management/
├── backend/                 # Node.js/Express API
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── server.js           # Main server file
├── frontend/               # React/Next.js frontend
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   ├── store/             # Zustand stores
│   ├── services/          # API services
│   └── lib/               # Utility libraries
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp env.local.example .env.local
   # Edit .env.local with your API URL
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## 📚 Features

### Backend Features

- ✅ JWT-based authentication
- ✅ bcrypt password hashing
- ✅ MongoDB with Mongoose ODM
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ Rate limiting and security headers
- ✅ CORS configuration
- ✅ Search and pagination
- ✅ Author-only post management

### Frontend Features

- ✅ Modern React.js
- ✅ Zustand state management
- ✅ React Quill rich text editor
- ✅ Form validation with Zod
- ✅ Responsive design with Bootstrap and Tailwind CSS
- ✅ Toast notifications
- ✅ Protected routes
- ✅ Real-time updates

### API Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /posts` - Get all posts (public)
- `GET /posts/:id` - Get single post (public)
- `POST /posts` - Create post (authenticated)
- `PUT /posts/:id` - Update post (owner only)
- `DELETE /posts/:id` - Delete post (owner only)

## 🛠 Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator
- **Security**: helmet, cors, rate-limit

### Frontend

- **Framework**: React.js 18 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS and Bootstrap
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Rich Text**: React Quill
- **HTTP Client**: Axios

## 📁 Project Structure

### Backend Structure

```
backend/
├── models/
│   ├── User.js          # User model with auth
│   └── Post.js          # Blog post model
├── routes/
│   ├── auth.js          # Authentication routes
│   └── posts.js         # Blog post routes
├── middleware/
│   ├── auth.js          # Auth middleware
│   ├── errorHandler.js  # Error handling
│   └── validate.js      # Validation
├── server.js            # Main server
├── package.json         # Dependencies
└── README.md           # Backend docs
```

### Frontend Structure

```
frontend/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── login/           # Login page
│   ├── register/        # Register page
│   └── create/          # Create post page
├── components/
│   ├── Header.tsx       # Navigation
│   ├── BlogList.tsx     # Posts list
│   └── RichTextEditor.tsx # Rich editor
├── store/
│   ├── authStore.js     # Auth state
│   └── blogStore.js     # Blog state
├── lib/
│   └── api.ts          # API client
└── README.md           # Frontend docs
```

## 🔐 Authentication Flow

1. **Registration**: User creates account with name, email, password
2. **Login**: User authenticates with email/password
3. **JWT Token**: Server returns JWT token for authenticated requests
4. **Protected Routes**: Frontend checks token for protected pages
5. **Auto-login**: Token persistence across browser sessions

## 📝 Blog Post Management

### Creating Posts

- Rich text editor with formatting options
- Title and content validation
- Automatic author assignment
- Real-time preview

### Managing Posts

- View all posts with pagination
- Edit own posts with full editor
- Delete own posts with confirmation
- Author information display

### Rich Text Features

- Headers, bold, italic, underline
- Lists (ordered and unordered)
- Links and blockquotes
- Color and alignment options
- Code blocks

## 🎨 UI/UX Features

### Design System

- **Colors**: Primary blue theme with gray accents
- **Typography**: Inter font family
- **Components**: Consistent button and form styles
- **Responsive**: Mobile-first design approach

### User Experience

- **Loading States**: Spinners and disabled buttons
- **Error Handling**: Toast notifications for feedback
- **Form Validation**: Real-time validation with error messages
- **Navigation**: Intuitive breadcrumbs and back buttons

## 🔧 Development

### Backend Development

```bash
cd backend
npm run dev      # Start development server
npm test         # Run tests
npm start        # Start production server
```

### Frontend Development

```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Variables

#### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/blog-management
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
```

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Backend Deployment

- **Render**: Easy deployment with automatic builds
- **Railway**: Simple Node.js deployment
- **Heroku**: Traditional platform with MongoDB add-on

### Frontend Deployment

- **Vercel**: Recommended for Next.js (automatic deployment)
- **Netlify**: Static site hosting
- **Railway**: Full-stack deployment

### Production Environment Variables

```env
# Backend
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-management
JWT_SECRET=your-super-secure-production-secret

# Frontend
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

## 🧪 Testing

### Backend Testing

- Jest test framework
- Supertest for API testing
- MongoDB test database
- Authentication test cases

### Frontend Testing

- TypeScript for type safety
- ESLint for code quality
- Form validation testing
- Component testing

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Blog Post Endpoints

#### Get All Posts

```http
GET /api/posts?page=1&limit=10&search=javascript
```

#### Create Post

```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Blog Post",
  "content": "<h1>Hello World</h1><p>This is my post content.</p>"
}
```

#### Update Post

```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "<h1>Updated Content</h1>"
}
```

#### Delete Post

```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

## 🔒 Security Features

### Backend Security

- JWT token authentication
- bcrypt password hashing
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Security headers with helmet
- MongoDB injection prevention

### Frontend Security

- Client-side route protection
- Form validation with Zod
- XSS prevention
- Secure token storage
- HTTPS enforcement in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Eman Zulfiqar**
- GitHub: https://github.com/emanzulfiqar

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database
- Bootstrap and Tailwind CSS for the utility-first styling
- React Quill for the rich text editor
- Zustand for the lightweight state management

---

**Note**: This is a complete full-stack application ready for production deployment. Make sure to update environment variables and security settings before deploying to production.
