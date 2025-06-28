🚀 Project Backend Overview
This backend system provides secure user authentication and account management, built using Node.js, Express, and MongoDB. It supports signup, login, email verification, password reset, and session handling using JWT and cookies. 
🔐 Key Functionalities
User Signup
Registers a new user with name, email, username, and password.

Passwords are securely hashed using bcrypt.

Generates a unique email verification code valid for 24 hours.

Sends a verification email via Mailtrap.

Automatically logs the user in after signup using a JWT token stored in cookies.

Email Verification
User enters the received verification code.

Backend validates the token and marks the user as verified.

Sends a welcome email upon successful verification.

Login
Authenticates user credentials (email & password).

Generates a JWT token and stores it in cookies.

Updates the user’s lastLogin timestamp.

Logout
Clears the JWT token from the cookie to log the user out.

Forgot Password
User requests password reset via email.

Generates a secure, time-limited token (1 hour).

Sends a password reset link with the token to the user's email.

Reset Password
Accepts a new password via the reset token link.

Verifies the token and updates the user's password after hashing it.

Sends a confirmation email upon successful reset.

Check Authentication
Verifies the user’s JWT token and returns user info (excluding password).

Used to confirm if the user is still logged in.

📧 Email System
Integrated with Mailtrap for sending transactional emails:

Verification email

Welcome email

Password reset request email

Password reset success email

Email templates are handled dynamically using variables (e.g., name, reset URL, verification code).

🛡️ Security Features
JWT-based authentication system.

Cookies used for session persistence (with httpOnly for protection).

Tokens have expiration to prevent abuse.

Passwords are hashed with bcrypt.

Reset and verification tokens are time-limited.

User input validation and error handling included.

🧱 Technology Stack
Node.js & Express.js for backend logic and routing.

MongoDB + Mongoose for database operations.

Mailtrap for sending transactional emails.

JWT for authentication.

bcryptjs for password hashing.

cookie-parser for managing cookies.

dotenv for secure environment variable management.

CORS configured for cross-origin requests with frontend (localhost:5173).

🗂️ Main API Endpoints
Endpoint	Method	Description
/api/auth/signup	POST	Register a new user
/api/auth/login	POST	Login with email & password
/api/auth/logout	POST	Log out (clear cookie)
/api/auth/verify-email	POST	Verify user email
/api/auth/forgot-password	POST	Send password reset email
/api/auth/reset-password/:token	POST	Reset password with token
/api/auth/check-auth	GET	Check if user is authenticated

