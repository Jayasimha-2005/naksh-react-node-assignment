# 💎 Naksh Jewels — Premium E-Commerce Platform

## 📖 Overview
A modern, full-featured e-commerce application built with React and Node.js, showcasing jewelry products with a beautiful, responsive UI. Features include role-based access (buyer/seller), product management, shopping cart, and MongoDB persistence with intelligent demo fallback.

## ✨ Key Features

### 🛍️ Buyer Features
- **Browse Products**: Beautiful product grid with hover effects and animations
- **Smart Search**: Real-time product filtering
- **Shopping Cart**: Add, remove, update quantities with persistent storage
- **Order Summary**: Detailed breakdown with taxes and totals
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 👔 Seller Features
- **Add Products**: Drag & drop image upload with preview
- **Edit Products**: Update name, price, and images inline
- **Delete Products**: Remove products with confirmation
- **Role Toggle**: Seamlessly switch between buyer and seller modes

### 🎨 Modern UI/UX
- Gradient color schemes with purple and gold accents
- Glassmorphism effects on navigation
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications for user actions
- Mobile-first responsive design

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 with Create React App
- **State Management**: Context API (CartContext, RoleContext)
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **HTTP Client**: Fetch API with AbortController
- **Image Handling**: Base64 encoding with drag & drop support

### Backend
- **Runtime**: Node.js (v20 LTS recommended)
- **Framework**: Express 5
- **Database**: MongoDB Atlas with Mongoose ODM
- **Features**:
  - Retry logic for DB connections
  - Demo mode fallback when DB unavailable
  - Health check endpoint
  - CORS enabled
  - 10MB payload limit for images

### DevOps
- **Containerization**: Docker & Docker Compose
- **Frontend Container**: Multi-stage build with Nginx
- **Backend Container**: Node 20 Alpine
- **Environment**: dotenv for configuration

## 📁 Project Structure

```
naksh-react-node-assignment/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddProduct.js      # Product creation form
│   │   │   ├── AddProduct.css     # Modern form styling
│   │   │   ├── Header.js          # Navigation with search & cart
│   │   │   ├── Header.css         # Gradient header styling
│   │   │   ├── ProductCard.js     # Product display component
│   │   │   ├── ProductCard.css    # Card animations & effects
│   │   │   └── Cart.js            # Cart dropdown
│   │   ├── pages/
│   │   │   ├── ProductList.js     # Main product grid
│   │   │   ├── Cart.js            # Full cart page
│   │   │   └── Cart.css           # Cart page styling
│   │   ├── context/
│   │   │   ├── CartContext.js     # Shopping cart state
│   │   │   └── RoleContext.js     # User role management
│   │   ├── data/
│   │   │   └── products.js        # Demo fallback data
│   │   ├── App.js                 # Main app component
│   │   ├── App.css                # Global styles & animations
│   │   └── index.js               # Entry point
│   ├── Dockerfile                 # Frontend container config
│   ├── .dockerignore
│   ├── package.json
│   └── .env                       # API URL configuration
├── backend/
│   ├── models/
│   │   ├── Product.js             # Product schema
│   │   └── CartItem.js            # Cart item schema
│   ├── controllers/
│   │   ├── productController.js   # Product CRUD logic
│   │   └── cartController.js      # Cart operations
│   ├── routes/
│   │   ├── productRoutes.js       # Product API routes
│   │   └── cartRoutes.js          # Cart API routes
│   ├── middleware/
│   │   └── errorHandler.js        # Centralized error handling
│   ├── scripts/
│   │   └── seedProducts.js        # Database seeding script
│   ├── index.js                   # Server entry point
│   ├── Dockerfile                 # Backend container config
│   ├── .dockerignore
│   ├── package.json
│   └── .env                       # MongoDB URI & config
├── docker-compose.yml             # Multi-container orchestration
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js v20 LTS (recommended) or v22+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Docker & Docker Compose (for containerized deployment)

### Quick Start (Local Development)

#### 1. Clone the Repository
```bash
git clone https://github.com/Jayasimha-2005/naksh-react-node-assignment.git
cd naksh-react-node-assignment
```

#### 2. Backend Setup
```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with your MongoDB connection string
# backend/.env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/naksh_jewels?retryWrites=true&w=majority
PORT=5000

# Optional: Seed the database with sample products
npm run seed

# Start the backend server
npm start
```

The backend will start on `http://localhost:5000` and attempt to connect to MongoDB. If connection fails, it will automatically start in demo mode with fallback data.

#### 3. Frontend Setup
```powershell
# Navigate to frontend (in a new terminal)
cd frontend

# Install dependencies
npm install

# The .env file is already configured:
# REACT_APP_API_URL=http://localhost:5000

# Start the development server
npm start
```

The frontend will automatically open at `http://localhost:3000`.

### 🐳 Docker Deployment (Recommended)

#### Build and Run with Docker Compose
```powershell
# From project root
docker-compose up --build
```

This will:
- Build frontend (multi-stage: React build + Nginx serve)
- Build backend (Node 20 Alpine)
- Start both containers
- Frontend: `http://localhost` (port 80)
- Backend: `http://localhost:5000`

#### Stop the Containers
```powershell
docker-compose down
```

## 📚 API Documentation

### Products API

#### Get All Products
```http
GET /products
```
**Response**: Array of product objects
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Gold Necklace",
    "price": 1999,
    "image": "data:image/jpeg;base64,..."
  }
]
```

#### Create Product (Seller only)
```http
POST /products
Content-Type: application/json

{
  "name": "Diamond Ring",
  "price": 2999,
  "image": "data:image/jpeg;base64,..."
}
```

#### Update Product
```http
PUT /products/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 3499,
  "image": "data:image/jpeg;base64,..." (optional)
}
```

#### Delete Product
```http
DELETE /products/:id
```

### Cart API

#### Get Cart Items
```http
GET /cart
```

#### Add to Cart
```http
POST /cart
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439011",
  "name": "Gold Necklace",
  "price": 1999,
  "quantity": 1
}
```

#### Update Cart Item
```http
PUT /cart/:id
Content-Type: application/json

{
  "quantity": 2
}
```

#### Remove from Cart
```http
DELETE /cart/:id
```

### Health Check
```http
GET /health
```
**Response**:
```json
{
  "status": "ok",
  "database": "connected" | "demo mode",
  "timestamp": "2026-02-08T10:30:00.000Z"
}
```

## 🎯 Features Demonstration

### Role Switching
1. Click the "Seller" checkbox in the header
2. Watch UI transform to show:
   - Yellow "Seller mode" badge
   - "Add New Product" form at the top
   - Edit (✏️) and Delete (🗑️) buttons on each product card

### Adding Products (Seller Mode)
1. Toggle to Seller mode
2. Drag & drop an image or click to upload
3. Enter product name and price
4. Click "Add Product"
5. Success notification appears
6. Product automatically appears in the grid

### Managing Cart (Buyer Mode)
1. Click "Add to Cart" on any product
2. Cart badge shows item count (red badge)
3. Click cart icon (🛒) to view cart page
4. Adjust quantities with +/- buttons
5. Remove items with "Remove" button
6. View order summary with taxes and total

### Search Functionality
1. Type in the search bar in the header
2. Product grid filters in real-time
3. Shows "No products found" if no matches

## 🔧 Configuration

### Environment Variables

#### Backend (`backend/.env`)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/naksh_jewels
PORT=5000
```

#### Frontend (`frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:5000
```

### MongoDB Atlas Setup
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with read/write permissions
3. Whitelist your IP address (0.0.0.0/0 for testing, specific IPs for production)
4. Get connection string and add to `backend/.env`

## 🐛 Troubleshooting

### MongoDB Connection Issues
**Problem**: Backend shows "Could not connect to MongoDB"
**Solutions**:
1. Verify `MONGO_URI` in `backend/.env`
2. Whitelist your IP in MongoDB Atlas
3. Check network connectivity
4. If using Node 22+, try Node 20 LTS
5. Server will automatically fall back to demo mode

### Port Already in Use
**Problem**: "Port 5000 is already allocated"
**Solution**:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual ID)
taskkill /PID <PID> /F
```

### Docker Issues
**Problem**: "Docker daemon not running"
**Solution**: Start Docker Desktop and wait for it to fully initialize

### Frontend Won't Start
**Problem**: `npm start` fails
**Solutions**:
```powershell
# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install
npm start
```

## 🎨 UI/UX Highlights

- **Modern Gradients**: Purple to violet gradients throughout
- **Glassmorphism**: Frosted glass effects on buttons and badges
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Responsive Grid**: Auto-adjusting product grid for all screen sizes
- **Loading Indicators**: Spinners and skeleton screens
- **Error Handling**: User-friendly error messages
- **Empty States**: Beautiful placeholders for empty cart and no products
- **Accessibility**: ARIA labels, keyboard navigation support

## 📝 Assignment Compliance

This project meets all assignment requirements:

✅ **Product Management**
- [x] Display products in a grid
- [x] Add new products (seller mode)
- [x] Edit existing products
- [x] Delete products with confirmation

✅ **Shopping Cart**
- [x] Add products to cart
- [x] Update quantities
- [x] Remove items
- [x] Calculate totals with taxes
- [x] Persistent cart storage

✅ **Role-Based Features**
- [x] Buyer/Seller mode toggle
- [x] Conditional UI based on role
- [x] LocalStorage persistence for role

✅ **Backend API**
- [x] RESTful endpoints
- [x] MongoDB integration
- [x] Error handling
- [x] CORS enabled

✅ **Modern UI**
- [x] Responsive design
- [x] Professional styling
- [x] Loading states
- [x] User feedback (notifications)

✅ **Docker Deployment**
- [x] Frontend Dockerfile
- [x] Backend Dockerfile
- [x] docker-compose.yml
- [x] Easy one-command deployment

## 🚀 Performance Optimizations

- **Frontend**:
  - React.memo for expensive components
  - useMemo for computed values
  - AbortController for fetch cleanup
  - Debounced search input

- **Backend**:
  - Connection pooling with Mongoose
  - Index optimization on Product.name
  - Request payload limits
  - Centralized error handling

## 🔒 Security Considerations

**Current Implementation** (Prototype):
- Base64 image storage (OK for demo)
- No authentication/authorization
- CORS open to all origins
- Environment variables for secrets

**Production Recommendations**:
- Use Cloudinary/S3 for image storage
- Add JWT-based authentication
- Implement role-based access control
- Restrict CORS to specific origins
- Use Docker secrets for MongoDB URI
- Add rate limiting
- Implement input validation and sanitization

## 📈 Future Enhancements

- [ ] User authentication (JWT)
- [ ] Order management system
- [ ] Payment gateway integration
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Image optimization and CDN
- [ ] Search with filters (price range, categories)

## 🤝 Contributing

This is an assignment project, but suggestions are welcome!

## 📄 License

ISC

## 👨‍💻 Author

**Jayasimha**
- GitHub: [@Jayasimha-2005](https://github.com/Jayasimha-2005)

---

Made with ❤️ for Naksh Jewels Internship Assignment

