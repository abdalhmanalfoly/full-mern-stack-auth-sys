# 🛡️ Auth Backend System

A fully functional authentication backend built with **Node.js**, **Express**, and **MongoDB**, supporting:

- User registration with email verification  
- Login & Logout  
- Forgot & Reset password functionality  
- Welcome emails after verification  
- JWT token authentication with secure cookies  

---

## 🧰 Technologies Used

- Node.js  
- Express.js  
- MongoDB with Mongoose  
- JWT for authentication  
- bcryptjs for password hashing  
- crypto for token generation  
- Mailtrap for sending emails  

---

## 📁 Project Structure

--------------------------------------------------------

structre 

📦project-root
 ┣ 📂controllers
 ┃ ┗ 📜auth.controller.js
 ┣ 📂models
 ┃ ┗ 📜user.model.js
 ┣ 📂routes
 ┃ ┗ 📜auth.routes.js
 ┣ 📂mails
 ┃ ┣ 📜emails.js
 ┃ ┣ 📜emailTemplates.js
 ┃ ┗ 📜mailtrap.config.js
 ┣ 📂utils
 ┃ ┣ 📜generateTokenAndSetCookie.js
 ┃ ┗ 📜generateVerificationCode.js
 ┣ 📜.env
 ┣ 📜server.js
 ┗ 📜README.md

------------------------------------------------------------
---

## 🔐 API Endpoints

| Method | Endpoint                | Description                         | Auth Required |
|--------|-------------------------|-------------------------------------|---------------|
| POST   | `/signup`               | Register new user + send code       | ❌            |
| POST   | `/verify-email`         | Verify email using code             | ❌            |
| POST   | `/login`                | Login and get token                 | ❌            |
| POST   | `/logout`               | Logout and clear token              | ❌            |
| POST   | `/forgot-password`      | Send password reset email           | ❌            |
| POST   | `/reset-password/:token`| Reset password using token          | ❌            |
| GET    | `/check-auth`           | Check user session (JWT token)      | ✅            |

---
-----------------------------------------------------------------

## 📌 Features

### ✅ Signup (`/signup`)
- Requires: `email`, `password`, `username`, `name`
- Hashes the password
- Generates a verification code
- Sends email with verification link (using Mailtrap)
- Auto logs the user in by sending JWT in cookie

### ✉️ Verify Email (`/verify-email`)
- Requires: `verificationCode`
- Validates the code and marks the user as `isVerified`
- Sends welcome email after success

### 🔐 Login (`/login`)
- Requires: `email`, `password`
- Verifies credentials
- Updates last login
- Sends JWT token

### 🔓 Logout (`/logout`)
- Clears the JWT cookie

### 🔁 Forgot Password (`/forgot-password`)
- Sends password reset link with a secure token
- Token valid for 1 hour

### 🔄 Reset Password (`/reset-password/:token`)
- Accepts new password and resets after validating token
- Sends confirmation email on success

### 🔍 Check Auth (`/check-auth`)
- Protected route to check if user is logged in and token is valid

---

## 🔒 Authentication

Authentication is done via **JWT Token**, stored securely in **HTTP-only cookies**.  
Middleware `verifyToken` is used for protected routes.

---

## 💌 Emails

Emails are handled using **Mailtrap**, including:

- Verification Email  
- Welcome Email  
- Password Reset Email  
- Password Reset Success Email  

---

## ⚙️ Environment Variables

Create a `.env` file in the root and add the following:

```env
MONGO_URL=your_mongo_connection_string
PORT=your_port
JWT_SECRET=your_jwt_secret
API_URL_MAIL=your_mail_api_url
TOKEN_MAIL=your_mail_api_token
CLIENT_URL=http://localhost:5000
RESET_PASSWORD_URL=reset-password
