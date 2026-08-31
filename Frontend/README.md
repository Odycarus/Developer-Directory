# Developer Directory (React + Django REST Framework)

Source code available on GitHub. Live demonstration available during interviews.

A full-stack Developer Directory application built with React and Django REST Framework. The application allows users to browse, search, filter, create, edit, and delete developer profiles while demonstrating modern frontend and backend development practices, authentication, authorization, and REST API integration.

**---**

The frontend is currently intended for personal demonstration rather than a public live deployment. The project includes a custom Django backend and PostgreSQL database, allowing the complete application to be demonstrated locally.

**### GitHub Repository**

https://github.com/Odycarus

**---**

# 📌 Overview

Developer Directory is a full-stack CRUD application designed as a portfolio project to demonstrate practical software engineering skills.

The frontend is built with React, while the backend uses Django REST Framework to provide RESTful API endpoints. PostgreSQL is used for persistent data storage.

Users can browse developer profiles, search and filter the directory, create and manage developer profiles, and authenticate through a secure JWT-based authentication system.

The project emphasizes reusable components, API-driven development, state management, authentication, authorization, responsive UI design, and modern frontend/backend architecture.

**---**

# ✨ Features

## Developer Management

* View all developer profiles
* View detailed developer profiles
* Create new developer profiles
* Edit existing developer profiles
* Delete developer profiles with confirmation modal
* Upload developer profile images
* Developer ownership system
* Restrict editing and deletion based on ownership and permissions

**---**

## Search & Filtering

* Search developers by name
* Filter developers by location
* Filter developers by skills
* Sort developers alphabetically
* Sort developers by location
* Sort developers by affiliation/title
* Pagination for developer listings
* Empty search results state
* Automatically resets pagination when filters change

**---**

## Authentication & Authorization

* User registration
* User login
* User logout
* JWT access and refresh tokens
* Automatic access-token refreshing
* Authentication persistence using Local Storage
* Current authenticated-user endpoint
* Protected frontend routes
* Backend authentication enforcement
* Developer ownership permissions
* Administrator permissions
* Administrator-only user management
* Administrator user deletion
* Prevention of administrators deleting their own accounts

**---**

## User Experience

* Responsive layout
* Loading skeletons
* Error handling
* Form validation
* Success and error notifications
* Delete confirmation modals
* Browser title updates
* Custom 404 page
* Responsive navigation
* Mobile-friendly layouts
* Easter egg functionality

**---**

## Theme System

* Dark mode
* Light/Bright mode toggle
* Theme preference saved using Local Storage
* CSS variables for consistent theming

**---**

# 🔐 Authentication

Authentication is handled using JSON Web Tokens (JWT).

The frontend communicates with Django REST Framework through authenticated API requests. Access tokens are automatically attached to protected requests, while refresh tokens are used to obtain a new access token when the current one expires.

The backend also enforces permissions independently of the frontend, preventing unauthorized users from performing restricted operations.

Authentication includes:

* User registration
* Login
* Logout
* Access and refresh tokens
* Automatic token refresh
* Current-user retrieval
* Protected routes
* Role-based administrative access
* Developer ownership permissions

**---**

# REST API

The application communicates with a custom Django REST API.

Supported developer operations include:

* GET developers
* GET developer by ID
* POST create developer
* PATCH update developer
* DELETE developer

Authentication endpoints include:

* POST register
* POST login
* POST refresh token
* GET current authenticated user

Administrative endpoints include:

* GET users
* DELETE user

**---**

# 🛠️ Technologies Used

## Frontend

* React
* JavaScript (ES6+)
* React Router
* CSS
* CSS Variables
* Vite
* Fetch API

**---**

## Backend

* Django
* Django REST Framework
* Django Simple JWT
* PostgreSQL
* Python

**---**

## State Management

* React Context API

### React Hooks

* useState
* useEffect
* useContext
* useNavigate
* useLocation
* useParams

**---**

## API

* RESTful API
* Fetch API
* JWT Authentication
* Access and refresh token handling
* Automatic token refresh

**---**

## Database

* PostgreSQL

The Django backend uses PostgreSQL for persistent application data, including developer profiles and user accounts.

**---**

## Version Control

* Git
* GitHub

**---**

Through this project, I demonstrated:

* Building reusable React components
* Designing a scalable component structure
* Managing application state with Context API
* Creating RESTful APIs with Django REST Framework
* Performing full CRUD operations
* Connecting a React frontend to a Django backend
* Working with PostgreSQL
* Implementing JWT authentication
* Implementing user registration and login
* Managing access and refresh tokens
* Implementing protected routes
* Implementing role-based permissions
* Implementing ownership-based permissions
* Creating administrator-only functionality
* Managing users through the backend API
* Handling image uploads
* Implementing client-side routing
* Implementing server-side data management
* Implementing search and filtering
* Implementing pagination
* Form validation
* Responsive UI development
* Creating confirmation modals and notifications
* Managing themes with CSS variables
* Persisting user preferences using Local Storage
* Handling loading and error states
* Structuring a full-stack application with separate frontend and backend layers

**---**

# 🚀 Future Improvements

* Deploy the frontend and backend publicly
* Containerize the application with Docker
* Implement production deployment configuration
* Add automated testing
* Add API documentation
* Improve backend validation and error handling
* Add additional administrative management features
* Improve application monitoring and logging


The React frontend communicates with the Django REST API through HTTP requests, while Django handles authentication, authorization, business logic, and database operations.
