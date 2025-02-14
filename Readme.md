# Upshore

## 🚀 Project Overview

**Upshore** is a cutting-edge platform designed to connect talents with companies, offering seamless profile management, talent discovery, and job application features. Built using **MERN stack**, it ensures efficiency, scalability, and security.

## 📌 Features

### 🔹 Authentication & Authorization

- **User Registration & Login** (Email & Password)
- **Google OAuth Integration**
- **JWT-based Authentication**
- **Role-based Access Control (RBAC)**
- **Password Reset & Email Verification**

### 🔹 User Profile Management

- Upload and update profile pictures using **Cloudinary**
- **Profile Editing** (Name, Bio, Contact Information)
- **Talent Experience, Skills & Education Management**

### 🔹 Resume & Cover Letter Generation

- **AI-powered Resume Generator**
- **Pre-filled Resume Templates**
- **Download Resume as DOCX/PDF**
- **Cover Letter Generation with AI**

### 🔹 Talent & Job Matching

- **Search & Filter Talents** by skills, location, and experience
- **Apply for Jobs** with pre-filled resumes
- **Company Profiles & Job Listings**

### 🔹 Subscription & Credits System

- **Stripe Payment Integration**
- **Monthly Subscription Plans**
- **One-time Credit Purchases**

### 🔹 Notifications & Alerts

- **Email & In-App Notifications**
- **Job & Application Status Updates**

### 🔹 Admin Dashboard

- **Manage Users & Companies**
- **View Subscription Details**
- **Monitor Uploaded Resumes & Profiles**

## 🛠️ Tech Stack

### **Frontend**

- **React, Redux Toolkit** (State Management)
- **Tailwind CSS** (UI Styling)
- **React Router** (Client-side Navigation)
- **React-Quill** (Rich Text Editor for Cover Letters)

### **Backend**

- **Node.js, Express.js** (REST API)
- **MongoDB & Mongoose** (Database Management)
- **JWT Authentication**
- **Stripe API** (Payment Processing)

### **DevOps & Deployment**

- **AWS Amplify** (Frontend Hosting)
- **AWS EC2** (Backend Hosting)
- **Cloudinary** (Image Upload & Management)
- **Vercel** (Testing & Staging)

## 📄 Setup & Installation

### Prerequisites

- **Node.js** (v16+)
- **MongoDB** (Local or Atlas)
- **Cloudinary Account**
- **Stripe Account** (for payments)

### 🔹 Clone the Repository

```sh
git clone https://github.com/your-username/upshore.git
cd upshore
```

### 🔹 Install Dependencies

```sh
npm install  # For both frontend and backend
```

### 🔹 Set Up Environment Variables

Create a **.env** file in the root directory with the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_key
```

### 🔹 Run the Project

```sh
npm run dev   # Starts both frontend & backend
```

## 📬 API Endpoints

| Endpoint              | Method | Description         |
| --------------------- | ------ | ------------------- |
| /api/auth/register    | POST   | User Registration   |
| /api/auth/login       | POST   | User Login          |
| /api/users/profile    | GET    | Get User Profile    |
| /api/users/update     | PATCH  | Update User Profile |
| /api/resumes/generate | POST   | Generate Resume     |
| /api/subscription     | POST   | Manage Subscription |

## 📢 Contributing

We welcome contributions! Feel free to open issues and submit pull requests.

## 📜 License

MIT License © 2024 Upshore

## 🤝 Contact

For support, email us at **support@upshore.com**
