Developer Directory (React + Django REST Framework)
Source code available on GitHub. Live demonstration available during interviews.

  A full-stack Developer Directory application built with React and Django REST Framework. The application allows users to browse, search, filter, create, edit, and delete developer profiles while demonstrating modern frontend and backend development practices.

---
I will take down the frontend vercel site since I implemented a backend to this project, therefore requiring another hosting site for the backend, and honestly, I'd rather show my work personally.

### GitHub Repository
https://github.com/Odycarus

---

# 📌 Overview

Developer Directory is a full-stack CRUD application designed as a portfolio project to demonstrate practical software engineering skills.

The frontend is built with React, while the backend uses Django REST Framework to provide RESTful API endpoints. Users can manage developer profiles through a clean and responsive interface.

The project emphasizes reusable components, API-driven development, state management, responsive UI design, and modern frontend/backend architecture.

---

# ✨ Features

## Developer Management

- View all developer profiles
- View detailed developer profiles
- Create new developers
- Edit existing developers
- Delete developers with confirmation modal
- Upload developer profile images

---

## Search & Filtering

- Search developers by name
- Filter developers by location
- Sort developers alphabetically
- Pagination for developer listings
- Empty search results state

---

## User Experience

- Responsive layout
- Loading skeletons
- Error handling
- Form validation
- Success notifications
- Delete confirmation modal
- Browser title updates
- Custom 404 page

---

## Theme System

- Dark mode by default
- Light mode toggle
- Theme preference saved using Local Storage

---

## REST API

The application communicates with a custom Django REST API.

Supported operations include:

- GET developers
- GET developer by ID
- POST create developer
- PATCH update developer
- DELETE developer

---

# 🛠️ Technologies Used

## Frontend

- React
- JavaScript (ES6+)
- React Router
- CSS
- Vite

---

## Backend

- Django
- Django REST Framework
- SQLite

---

## State Management

- React Context API

### React Hooks

- useState
- useEffect
- useContext
- useNavigate
- useLocation
- useParams

---

## API

- RESTful API
- Fetch API

---

## Deployment

### Frontend

- Vercel

### Version Control

- Git
- GitHub

---

Through this project, I demonstrated:

- Building reusable React components
- Designing a scalable component structure
- Managing application state with Context API
- Creating RESTful APIs with Django REST Framework
- Performing full CRUD operations
- Fetching and updating backend data
- Handling image uploads
- Implementing client-side routing
- Implementing server-side data management
- Form validation
- Responsive UI development
- Creating confirmation modals and notifications
- Managing themes with CSS variables
- Persisting user preferences using Local Storage
- Connecting a React frontend to a Django backend

---

# 🚀 Future Improvements

- Migrate from SQLite to PostgreSQL (Can't due to hardware issues)
- Containerize the application with Docker (Can't due to hardware issues)
- Deploy it? (Maybe when we upgrade hardware)
- Add JWT authentication
- User accounts and login system
- Role-based permissions
- Skill filtering