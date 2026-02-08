# 💎 Naksh Jewels — E-Commerce Assignment

## 📖 Overview
A mini e-commerce application built with React and Node.js as part of the Naksh internship assignment. The project demonstrates product listing, shopping cart functionality, backend APIs, MongoDB integration, and Dockerized deployment.

## ✨ Features

### Buyer Mode
- Browse products in a grid layout
- Search products by name
- Add products to cart
- View cart with item count
- Update quantities and remove items
- Responsive design for mobile and desktop

### Seller Mode (Demo)
- Toggle between Buyer and Seller modes
- Add new products with name, price, and image
- Edit existing products
- Delete products with confirmation

## 🛠️ Tech Stack

### Frontend
- React (Create React App)
- Context API for state management
- Plain CSS

### Backend
- Node.js (v20 LTS)
- Express.js
- MongoDB Atlas (Mongoose)
- CORS enabled

### DevOps
- Docker
- Docker Compose

## 📁 Project Structure

```
naksh-react-node-assignment/
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── context/         # State management
│   │   └── data/            # Demo fallback data
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── middleware/          # Error handling
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js v20 LTS
- npm
- MongoDB Atlas account
- Docker & Docker Compose (optional)

### Local Development

#### 1. Clone the Repository
```bash
git clone https://github.com/Jayasimha-2005/naksh-react-node-assignment.git
cd naksh-react-node-assignment
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo MONGO_URI=your_mongodb_connection_string > .env
echo PORT=5000 >> .env

# Start backend
npm start
```

Backend runs at `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend opens at `http://localhost:3000`

### 🐳 Docker Deployment

```bash
# Build and run
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000

# Stop containers
docker-compose down
```

## 📚 API Endpoints

### Products
- `GET /products` - Get all products
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Cart
- `GET /cart` - Get cart items
- `POST /cart` - Add item to cart
- `PUT /cart/:id` - Update cart item quantity
- `DELETE /cart/:id` - Remove item from cart

### Health Check
- `GET /health` - Check server and database status

## 🔧 Environment Variables

### Backend (`backend/.env`)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/naksh_jewels
PORT=5000
```

### Frontend (`frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🐛 Troubleshooting

**MongoDB Connection**: Verify `MONGO_URI` in `backend/.env` and whitelist your IP in MongoDB Atlas

**Port in Use**: Change `PORT` in `.env` or stop the conflicting process

**Docker Issues**: Ensure Docker Desktop is running

## 👨‍💻 Author

**Jayasimha**  
GitHub: [@Jayasimha-2005](https://github.com/Jayasimha-2005)

---

*Built for Naksh Jewels Internship Assignment*
