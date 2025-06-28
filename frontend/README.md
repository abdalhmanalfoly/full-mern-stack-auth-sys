# 🧑‍💻 Fullstack Authentication Frontend (React + Zustand + TailwindCSS)

This is the **frontend part** of a fullstack authentication system built with **React 19**, **Vite**, **Zustand**, **TailwindCSS**, and **Framer Motion**. It supports features like user registration, email verification, login, logout, session handling, and protected routing.

---

## 🚀 Features

- ✅ **Signup Page**
  - Full name, username, email, password fields
  - Password strength meter + criteria checklist
  - Redirects to email verification page

- ✅ **Email Verification**
  - 6-digit code input system
  - Smart focus and paste behavior
  - Shows verification errors and success toast

- ✅ **Login Page**
  - Email & password input
  - Redirects to Dashboard if verified
  - Redirects to verify page if not verified

- ✅ **Dashboard**
  - Displays user profile (name, email)
  - Shows account activity (createdAt, lastLogin)
  - Logout button

- ✅ **Forgot Password Page**
  - (UI prepared — backend functionality to be added)

- ✅ **Protected Routes**
  - Non-authenticated users are redirected to login
  - Unverified users are redirected to verify-email

- ✅ **State Management**
  - Using Zustand to manage user, auth status, loading, and errors

- ✅ **UI/UX**
  - TailwindCSS styled components
  - Responsive layout
  - Smooth animations using Framer Motion
  - Toast notifications with `react-hot-toast`

---

## 🛠️ Tech Stack

| Layer        | Tech                         |
|--------------|------------------------------|
| UI           | React 19, TailwindCSS        |
| Animations   | Framer Motion                |
| State Mgmt   | Zustand                      |
| HTTP Client  | Axios                        |
| Routing      | React Router v7              |
| Icons        | Lucide React                 |
| Notifications| React Hot Toast              |
| Tooling      | Vite, ESLint                 |

---

## 📂 Project Structure

frontend/
├── components/ # Reusable UI components (Input, PasswordStrength, Spinner)
├── pages/ # Application pages (Signup, Login, Dashboard, etc.)
├── store/ # Zustand store for auth management
├── utils/ # Utility functions (date formatting, etc.)
├── App.jsx # Routing + route protection logic
├── main.jsx # Entry point
├── index.css # Tailwind + custom styles
├── package.json # Project config & dependencies
└── vite.config.js # Vite settings


---

## 🔐 Zustand Store (`authStore.js`)

Manages:
- `user` object
- `isAuthenticated`, `isloading`, `ischeckingAuth`
- `error` messages

And exposes actions:
- `signup(email, password, name, username)`
- `verifyEmailfunction(code)`
- `login(email, password)`
- `logout()`
- `checkAuthfront()` – to check auth status on app load

All requests are sent to `http://localhost:5000/api/auth`.

---

## 🧪 How to Run

1. Install dependencies:
```bash
npm install
