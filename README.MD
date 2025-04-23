# ☁️ Cloud Computing Project – E-Commerce Platform

This repository contains a full-stack cloud-based e-commerce platform built with **Spring Boot** (Java) for the backend and **React** (TypeScript) for the frontend. The goal of this project is to demonstrate scalable cloud-based application development as part of our Cloud Computing coursework project.

---

## 📁 Project Structure


---

## 🚀 Technologies Used

### ☕ Backend (Spring Boot)
- Java 21
- Spring Boot 3+
- Spring Data JPA
- Spring Security
- PostgreSQL
- Docker (optional for containerization)
- RESTful APIs
- Cloud deployment ready (AWS EC2)

### ⚛️ Frontend (React)
- React 18 (TypeScript)
- Redux Toolkit
- Axios
- React Router
- Tailwind CSS && Material UI
- Vite (optional for faster dev)

---

## 🌐 Features

### Backend
- User authentication and authorization (JWT)
- Product catalog (CRUD)
- Order processing and checkout flow
- Admin panel endpoints for managing products and orders

### Frontend
- Modern e-commerce UI
- Browse products and search
- Add to cart and checkout
- User registration/login
- Dashboard for user orders
- Admin view
- Payment integration (Using stripe) integrated with the Backend

---

## ☁️ Cloud Deployment

### Backend
- Dockerized Spring Boot App
- Deployed on: `EC2 AWS`
- Exposed via Spring's default server

### Frontend
- Deployed on: `S3 + CloudFront`
- Connected to backend using environment variables

---

## 🛠️ Getting Started

### Prerequisites
- Java 21+
- Bun.js or Node.js 18+
- Maven
- PostgreSQL
- Docker (optional)

### Setup Instructions

#### Backend
```bash
cd ecommerce-api
# Configure application.yml or application.properties
./mvnw clean install
./mvnw spring-boot:run
```

#### Frontend
```bash
cd ecommerce-webapp
bun install
bun dev

