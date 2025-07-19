# Blog Management Frontend

A React-based blog management application with authentication and rich text editing capabilities.

## Features

- User authentication (login/register)
- Create, read, update, and delete blog posts
- Rich text editor for blog content
- Responsive design with Tailwind CSS
- State management with Zustand
- Form validation with React Hook Form and Zod

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Start the development server
- `npm build` - Build the app for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (not recommended)

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx      # Navigation header
│   ├── BlogList.jsx    # Blog posts list
│   ├── ConfirmToast.jsx    # Delete Resuseable Component
│   ├── RichTextEditor.jsx # Rich text editor
│   ├── ProtectedRoute.jsx # Route protection
│   └── providers/      # Context providers
│       └── AuthProvider.jsx
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Register page
│   └── Create.jsx      # Create post page
│   └── Edit.jsx        # Edit post page
│   └── Post.jsx        # Post page
├── store/              # State management
│   ├── authStore.js    # Authentication state
│   └── blogStore.js    # Blog posts state
├── services/               # API Services
│   ├── AuthServices.js     # Authentication services
│   └── DeleteServices.js   # Delete services
│   ├── GetServices.js      # Get Services
│   └── PostServices.js     # Post Services
│   └── PutServices.js      # Put Services
├── lib/                # Utilities
│   └── api.js          # API configuration
├── App.jsx             # Main app component
├── index.js            # Entry point
└── index.css           # Global styles
```

## Technologies Used

- React 18
- React Router DOM
- Zustand (State Management)
- React Hook Form + Zod (Form Validation)
- React Quill (Rich Text Editor)
- Axios (HTTP Client)
- Bootstrap and Tailwind CSS (Styling)
- Lucide React (Icons)
- React Hot Toast (Notifications)

## API Endpoints

The app expects the following API endpoints:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /posts` - Get blog posts (with pagination)
- `POST /posts` - Create new post
- `DELETE /posts/:id` - Delete post

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)
