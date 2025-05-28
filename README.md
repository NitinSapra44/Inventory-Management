# 📦 Inventory Management Web App for Printing Industry

A full-stack inventory management system designed specifically for a **box manufacturing industry**, where each box consists of two components: a **Cover (Top)** and a **Bottom**. This app helps efficiently manage customer orders, track inventory, monitor low-stock alerts, and maintain dispatch and print logs.

### 🔗 Live Demo  
👉 [Live App on Render](https://inventory-management-frontend-eugc.onrender.com)

---

## 🚀 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Image Upload:** Multer + Cloudinary
- **Deployment:** Render
- **Utilities:** JWT for authentication, Concurrently for development workflow

---

## 📋 Features

- Add customers and their products
- Each box is managed as two parts: **Cover** and **Bottom**
- View all bottoms of a similar size when a cover is dispatched
- Smart To-Do List: Automatically shows items with quantity < 1500 for production
- Daybook: Track all printed/dispatched records in a time period
- Secure login & context-based user management
- Seamless image uploads with Cloudinary
- Fast and responsive UI using Tailwind CSS

---

## 🛠️ Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### Step 2: Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Step 3: Setup Environment Variables

Create a `.env` file inside the `backend/` directory with the following:

```env
PORT=5000
url=your_mongodb_connection_string
jwtSecret=your_jwt_secret_key
CLOUDINARY_API_SECRET=your_cloudinary_API_secret
CLOUDINARY_API_KEY=your_cloudinary_API_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### Step 4: Start the Development Server

From the root directory, run:

```bash
npm run dev
```

This will start both the frontend and backend servers simultaneously using **concurrently**.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📧 Contact

For questions or suggestions, feel free to reach out at **nitinsapra.2000@gmail.com**
