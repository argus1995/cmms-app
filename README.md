# 🛠️ CMMS Backend (Express + Prisma)

Backend service for a **Computerized Maintenance Management System
(CMMS)** built using **Express.js**, **Prisma ORM**, and **Neon
PostgreSQL**.\
This backend provides authentication, asset category management, and
will be expanded with asset and work order modules.

## 🚀 Tech Stack

### **Backend**

-   Node.js
-   Express.js
-   Prisma ORM
-   Neon PostgreSQL
-   JWT (HTTP-only Cookies)
-   bcrypt
-   express-async-handler

### **Middleware**

-   Not Found Handler
-   Global Error Handler
-   Auth Middleware

### **Future**

-   Asset module
-   Work Order module
-   React frontend

## 📂 Folder Structure

    src/
    │── controllers/
    │     ├── userController.js
    │     └── assetCategoryController.js
    │── middleware/
    │     ├── authMiddleware.js
    │     ├── errorMiddleware.js
    │── routes/
    │     ├── userRoutes.js
    │     └── assetCategoryRoutes.js
    │── server.js
    prisma/
    |── migrations/
    │── schema.prisma

## ⚙️ Installation

### 1. Clone the repository

    git clone <your-repo-url>
    cd <project-folder>

### 2. Install dependencies

    npm install

### 3. Create `.env` file

    DATABASE_URL="your_neon_connection_url"
    JWT_SECRET="your_jwt_secret"
    NODE_ENV="development"
    PORT=3000

### 4. Run Prisma migrations

    npx prisma migrate dev

### 5. Generate Prisma client

    npx prisma generate

## ▶️ Running the Application

### Development

    npm run dev

### Production

    npm start

## 🔐 Authentication Features

-   Register
-   Login
-   Logout (clears cookie)
-   Protected routes using JWT
-   Password hashing with bcrypt

## 📦 Asset Category Features (CRUD)

-   Create asset category
-   Get all categories
-   Get single category
-   Update category
-   Delete category

## 🛣️ Roadmap

### ✔️ Completed

-   Express + Prisma setup
-   Authentication
-   Asset Category CRUD
-   Error handling

### 🕒 In Progress / Future

-   Asset module
-   Work order module
-   Preventive maintenance
-   React frontend UI
-   Dashboard

## 🧪 Testing (future)

-   Jest

## 📜 License

This project is open-source and available under the MIT License.
