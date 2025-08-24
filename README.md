
# 🛒 Grocer-Go  
A **MERN-based Ecommerce Web Application** for online grocery shopping with both **customer** and **seller dashboards**.  
Built with **TypeScript**, **React (Vite)**, **TailwindCSS**, **Express.js**, **MongoDB**, and **Stripe**.  



## 🚀 Demo
> [Check it out](https://grocer-go-client.vercel.app/)


## 🚀 Features  

### Customer Features
- 🔐 Secure **JWT authentication** and **bcrypt password hashing**  
- 🛍️ Browse groceries with detailed product pages  
- 🛒 Add/remove products from cart and checkout  
- 💳 Multiple payment options: **Stripe (Online Payment)** & **Cash on Delivery (COD)**  
- 📦 Track order status with real-time updates  
- 🌐 Responsive UI styled with **TailwindCSS**  
- 🔔 Real-time notifications via **React Hot Toast**

### Seller Features
- 📊 Dedicated **Seller Dashboard**  
- ➕ Add and manage products with **Cloudinary + Multer image uploads**  
- 📦 Track progress of customer orders in real-time

  
---


## 🛠️ Tech Stack  

**Frontend (Client)**  
- React + TypeScript (Vite)  
- TailwindCSS for styling  
- Zustand for state management  
- React Router for routing  
- React Hot Toast for notifications  
- Deployment: **Vercel**  

**Backend (Server)**  
- Node.js + Express + TypeScript  
- MongoDB (Mongoose ODM)  
- JWT + bcrypt for authentication & security  
- Stripe API for online payments  
- Multer + Cloudinary for image storage  
- Lodash & Compression for utilities & optimization  
- Development: ts-node + nodemon  
- Deployment: **Render**  

---


## ⚙️ Environment Variables  

Create a `.env` file inside the **Server/** directory:  

```env
PORT=
JWT_SECRET=
NODE_ENV=

# Seller credentials
SELLER_EMAIL=
SELLER_PASSWORD=

# MongoDB setup
MONGO_URL=

# Cloudinary
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=

# Stripe configuration
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```



## ⚙️ Installation

### 1. Clone the repo
```env
git clone https://github.com/student-karan/Grocer-Go.git
cd Grocer-GO
```

### 2 Setup Client
```env
cd Client
npm install
npm run dev
```

### 2 Setup Server
```env
cd Server
npm install
npm run dev
```

## 🌍 Deployment

 Frontend : deployed on **Vercel**

 Backend : deployed on **Render**



## 🙌 Acknowledgements

- This component was built as part of a learning project to strengthen React, TypeScript and NodeJS fundamentals.
- Inspired by **GreatStack**.

