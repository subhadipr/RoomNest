# 🏠 RoomNest Backend

RoomNest is a **PG & Room Finder Platform** designed for **students, property owners, and administrators**.

This folder contains the **backend REST API** responsible for authentication, property management, user management, inquiries, messaging, and other server-side operations.

---

## 🚀 Tech Stack

* **Node.js** – JavaScript runtime
* **Express.js** – Backend framework
* **MongoDB** – Database
* **Mongoose** – MongoDB ODM
* **JWT** – Authentication & authorization
* **bcryptjs** – Password hashing
* **Multer** – File/image upload handling
* **Nodemailer** – Email services
* **dotenv** – Environment variable management
* **CORS** – Cross-origin resource sharing

---

## 📁 Folder Structure

```text
backend/
│
├── config/
│   └── Database configuration
│
├── controllers/
│   └── Business logic
│
├── middleware/
│   └── Authentication, authorization & other middleware
│
├── models/
│   └── MongoDB/Mongoose models
│
├── routes/
│   └── REST API routes
│
├── services/
│   └── Email and other service logic
│
├── uploads/
│   └── Uploaded property images/files
│
├── utils/
│   └── Helper and utility functions
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
```

### 2. Navigate to the Backend Folder

```bash
cd RoomNest/backend
```

### 3. Install Dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/roomnest

JWT_SECRET=your_jwt_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

> ⚠️ Never upload your `.env` file to GitHub.

Make sure `.env` is included in `.gitignore`.

---

## ▶️ Running the Server

### Development Mode

If you have `nodemon` installed:

```bash
npm run dev
```

### Normal Mode

```bash
npm start
```

The backend server will run at:

```text
http://localhost:5000
```

---

## 🔗 API Base URL

```text
http://localhost:5000/api
```

---

## 🔑 Authentication

RoomNest uses **JWT (JSON Web Token)** for authentication.

After successful login, the server returns an authentication token.

For protected routes, send the token using:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 👥 User Roles

RoomNest supports multiple types of users:

### 🎓 Student

Students can:

* Register and login
* Search for PG/rooms
* View property details
* Save properties
* Send property inquiries
* Communicate with property owners
* Manage their profile
* Manage account settings

### 🏠 Property Owner

Owners can:

* Register/login
* Add properties
* Upload property images
* Manage their properties
* View inquiries
* Communicate with students
* Update property information
* Manage their profile

### 🛡️ Administrator

Administrators can:

* Manage users
* Manage property owners
* Manage properties
* Review pending properties
* Handle reports
* Manage platform settings
* Monitor platform activities

---

## 🏘️ Main Backend Modules

The backend is designed to support:

* User Authentication
* Student Management
* Owner Management
* Property Management
* Property Image Upload
* Search & Filtering
* Saved Properties
* Property Inquiries
* Messaging
* Admin Management
* Email Services
* Reports
* JWT Authorization

---

## 📡 API Structure

Example API structure:

```text
/api/auth
/api/users
/api/owners
/api/properties
/api/inquiries
/api/messages
/api/admin
/api/reports
```

> The exact routes may change as the RoomNest backend development progresses.

---

## 🗄️ Database

RoomNest uses **MongoDB** as its database and **Mongoose** for database interaction.

Example database:

```text
roomnest
```

Typical collections may include:

```text
users
properties
inquiries
messages
reports
```

---

## 📤 File Uploads

RoomNest uses **Multer** for handling image/file uploads.

Uploaded files are stored inside:

```text
backend/uploads/
```

Example:

```text
uploads/
├── properties/
├── profiles/
└── documents/
```

---

## 📧 Email Service

**Nodemailer** is used for email-related functionality.

Possible use cases:

* Account verification
* Password reset
* Inquiry notifications
* Owner notifications
* System notifications

---

## 🔒 Security

RoomNest follows several security practices:

* Password hashing with `bcryptjs`
* JWT-based authentication
* Protected API routes
* Environment variables for sensitive configuration
* CORS configuration
* Input validation
* Role-based authorization

---

## 🧪 Development

During development, use:

```bash
npm run dev
```

After starting the backend, check:

```text
http://localhost:5000
```

---

## 🌐 Frontend Connection

The RoomNest frontend communicates with this backend through REST APIs.

Example:

```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

Example API request:

```javascript
fetch(`${API_BASE_URL}/properties`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
```

---

## 📦 Production Deployment

Before deploying to production:

1. Configure production MongoDB.
2. Add secure environment variables.
3. Change the JWT secret.
4. Configure CORS for the production frontend.
5. Configure email credentials.
6. Configure file upload/storage.
7. Set the production `PORT`.
8. Test all API endpoints.
9. Disable development-only settings.

---

## 🛠️ Useful Commands

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Run production server:

```bash
npm start
```

Check installed packages:

```bash
npm list
```

---

## 📌 Project Status

🚧 **RoomNest Backend is currently under development.**

Features and API endpoints are being developed and integrated with the RoomNest frontend.

---

## 👨‍💻 Developer

**Subhadip Roy**

Full-Stack Web Developer
B.Tech – Computer Science & Engineering

---

## 📄 License

This project is developed for educational and project development purposes.

© 2026 RoomNest. All rights reserved.
