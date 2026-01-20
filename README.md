# 🎬 Fav-Flicks

Fav-Flicks is a full-stack MERN application that allows users to search movies using the OMDB API, add them to favourites, and manage their wishlist with authentication and pagination.

# 🚀 Features

🔍 Search movies with debounce

❤️ Add / Remove from Favourites

🔐 JWT Authentication

🧱 Repository Pattern – Clean backend structure for better scalability and maintainability.

⚡ Vite + React frontend


# 🛠️ Tech Stack

Frontend: React, TypeScript, Tailwind CSS

Backend: Node.js, Express.js, TypeScript

Database: MongoDB, Mongoose

APIs: OMDB Api

Auth: JWT

# 🏗️ Architecture Overview
The backend follows a Repository Pattern, organizing code into:

Controllers – Handle requests and responses.

Services – Contain business logic.

Repositories – Interact with the database.

This keeps the codebase clean, modular, and easy to maintain.


# 📦 How to Run Locally
1️⃣ Clone the project
```bash
git clone https://github.com/adarsh6282/FavFlicks.git
cd FavFlicks
```

2️⃣ Backend Setup
```bash
cd server
npm install
npm run dev
```


Add your .env file:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
OMDB_API_KEY=your_omdb_key
OMDB_BASE_URL=https://www.omdbapi.com/
```
3️⃣ Frontend Setup
```bash
cd client
npm install
npm run dev
```
