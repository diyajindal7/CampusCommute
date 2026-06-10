## Live Demo
http://13.60.99.228/

## GitHub Repository
https://github.com/diyajindal7/CampusCommute




# 🚗 CampusCommute

**Secure Campus Ride Coordination Platform for College Students**

CampusCommute is a full-stack web application designed to help students safely coordinate and share rides within a college community. The platform uses Role-Based Access Control (RBAC), OTP-based authentication, and real-time communication features to provide a trusted alternative to informal ride-sharing groups.

---

## 🌟 Features

### 🔐 Secure Authentication

* OTP-based login and verification
* College email verification
* JWT authentication and authorization

### 👥 Role-Based Access Control (RBAC)

* Student Dashboard
* Driver Dashboard
* Admin Dashboard
* Protected routes based on user roles

### 🚘 Ride Management

* Create ride offers
* Search available rides
* Join rides
* Manage ride requests
* View ride history

### 💬 Real-Time Communication

* In-app messaging between riders and drivers
* Ride coordination and updates

### 🛡️ Safety Features

* College-only access
* Verified users
* Admin moderation and monitoring

### ☁️ Cloud Deployment

* Backend hosted on AWS EC2
* Secure server configuration
* Production deployment with role-based access controls

---

## 🏗️ System Architecture

```text
Frontend (React)
        ↓
Node.js + Express Backend
        ↓
MongoDB Database
        ↓
AWS EC2 Deployment
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS / Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication & Security

* JWT Authentication
* OTP Verification
* Role-Based Access Control (RBAC)

### Cloud & DevOps

* AWS EC2
* PM2
* Nginx
* Git & GitHub

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/CampusCommute.git
cd CampusCommute
```

### Backend Setup

```bash
cd server
npm install
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 📌 Future Enhancements

* Live location tracking
* Ride rating system
* Push notifications
* Route optimization
* Mobile application support

---

## 👨‍💻 Contributors

Developed as a secure ride-sharing platform for college students, focusing on safety, accessibility, and efficient campus transportation.

---

## 📄 License

This project is developed for educational and academic purposes.
