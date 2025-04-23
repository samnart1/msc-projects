# ☁️ Cloud Computing Project – E-Commerce Platform

This repository contains a full-stack cloud-based e-commerce platform built with **Spring Boot** (Java) for the backend and **React** (TypeScript) for the frontend. The goal of this project is to demonstrate scalable cloud-based application development as part of my Cloud Computing coursework/internship/research (adjust accordingly).

---

## 📁 Project Structure


---

## 🚀 Technologies Used

### ☕ Backend (Spring Boot)
- Java 17
- Spring Boot 3+
- Spring Data JPA
- Spring Security
- MySQL / PostgreSQL
- Docker (optional for containerization)
- RESTful APIs
- Cloud deployment ready (e.g., AWS, Azure, or GCP)

### ⚛️ Frontend (React)
- React 18 (TypeScript)
- Redux Toolkit
- Axios
- React Router
- Tailwind CSS / Material UI
- Vite (optional for faster dev)

---

## 🌐 Features

### Backend
- User authentication and authorization (JWT)
- Product catalog (CRUD)
- Order processing and checkout flow
- Payment integration (mocked or real)
- Admin panel endpoints for managing products and orders

### Frontend
- Modern e-commerce UI
- Browse products and search
- Add to cart and checkout
- User registration/login
- Dashboard for user orders
- Admin view (if implemented)

---

## ☁️ Cloud Deployment

### Backend
- Dockerized Spring Boot App
- Deployed on: `EC2 / App Engine / Azure App Services` (choose your platform)
- Exposed via NGINX or Spring's default server

### Frontend
- Deployed on: `Vercel / Netlify / S3 + CloudFront` (choose your platform)
- Connected to backend using environment variables

---

## 🛠️ Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- Maven or Gradle
- MySQL/PostgreSQL
- Docker (optional)

### Setup Instructions

#### Backend
```bash
cd backend
# Configure application.yml or application.properties
./mvnw spring-boot:run
```

