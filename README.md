# 💎 Naksh Jewels — Premium E-Commerce Platform

![Node.js](https://img.shields.io/badge/Node.js-20.x-green) ![React](https://img.shields.io/badge/React-19-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green) ![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## 📖 Overview
A modern, full-featured e-commerce application built with React and Node.js, showcasing jewelry products with a beautiful, responsive UI. Features include role-based access (buyer/seller), product management, shopping cart, and MongoDB persistence with intelligent demo fallback.

**Live Demo**: [Deploy Instructions Below](#-deployment-guide)

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
- **Fixed**: Product card focus bug - cards no longer highlight when clicking "Add to Cart"

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

# Copy the example .env file and configure it
cp .env.example .env

# Edit backend/.env with your MongoDB connection string:
# MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/naksh_jewels?retryWrites=true&w=majority
# PORT=5000

# Optional: Seed the database with sample products
npm run seed

# Start the backend server
npm start
```

The backend will start on `http://localhost:5000` and attempt to connect to MongoDB. If connection fails, it will automatically start in demo mode with fallback data.

**⚠️ SECURITY NOTE**: Never commit `.env` files to Git! Always use `.env.example` for templates.

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

---

## 🚀 Deployment Guide

### Prerequisites for Deployment
- Git installed
- Node.js v20+ installed (for manual deployment)
- MongoDB Atlas account (free tier available)
- Deployment platform account (choose one):
  - **Vercel** (Frontend) + **Render/Railway** (Backend) - Easiest
  - **Netlify** (Frontend) + **Heroku** (Backend)
  - **AWS EC2** or **DigitalOcean** - Full control
  - **Docker** on any VPS

---

### 🌐 Option 1: Vercel + Render (Recommended - Free Tier)

#### **Step 1: Setup MongoDB Atlas**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster (M0 Sandbox)
3. Create a database user with password
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere for cloud deployment)
5. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/naksh_jewels`

#### **Step 2: Deploy Backend to Render**

1. **Push to GitHub** (if not already):
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/naksh-react-node-assignment.git
   git push -u origin main
   ```

2. **Deploy on Render**:
   - Go to [render.com](https://render.com/) and sign up
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `naksh-jewels-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free
   - Add Environment Variables:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `PORT`: `5000`
   - Click "Create Web Service"
   - Note your backend URL: `https://naksh-jewels-backend.onrender.com`

#### **Step 3: Deploy Frontend to Vercel**

1. **Update Frontend .env**:
   ```env
   # frontend/.env
   REACT_APP_API_URL=https://naksh-jewels-backend.onrender.com
   ```

2. **Deploy on Vercel**:
   ```powershell
   # Install Vercel CLI
   npm install -g vercel

   # Navigate to frontend
   cd frontend

   # Deploy
   vercel
   ```
   
   Or use Vercel Dashboard:
   - Go to [vercel.com](https://vercel.com/) and sign up
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`
     - **Environment Variables**:
       - `REACT_APP_API_URL`: `https://naksh-jewels-backend.onrender.com`
   - Click "Deploy"

3. **Your app is live!** 🎉
   - Frontend: `https://naksh-jewels.vercel.app`
   - Backend: `https://naksh-jewels-backend.onrender.com`

---

### 🐳 Option 2: Docker on VPS (DigitalOcean/AWS/Azure)

#### **Step 1: Setup VPS**
```powershell
# SSH into your server
ssh root@your-server-ip

# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
apt-get install docker-compose-plugin -y
```

#### **Step 2: Clone and Configure**
```bash
# On server
git clone https://github.com/YOUR_USERNAME/naksh-react-node-assignment.git
cd naksh-react-node-assignment

# Create backend/.env
nano backend/.env
# Add:
MONGO_URI=your_mongodb_uri
PORT=5000

# Update docker-compose.yml for production
nano docker-compose.yml
```

**Production docker-compose.yml**:
```yaml
services:
  backend:
    build:
      context: ./backend
    env_file:
      - ./backend/.env
    ports:
      - "5000:5000"
    restart: always
    environment:
      - NODE_ENV=production

  frontend:
    build:
      context: ./frontend
      args:
        - REACT_APP_API_URL=http://YOUR_SERVER_IP:5000
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: always

  # Optional: Add Nginx reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/ssl:ro
    depends_on:
      - frontend
      - backend
    restart: always
```

#### **Step 3: Deploy**
```bash
# Build and start
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Your app is now running!
# Frontend: http://YOUR_SERVER_IP
# Backend: http://YOUR_SERVER_IP:5000
```

#### **Step 4: Setup SSL with Let's Encrypt (Optional)**
```bash
# Install certbot
apt-get install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is configured automatically
```

---

### ☁️ Option 3: Netlify + Railway

#### **Backend on Railway**
1. Go to [railway.app](https://railway.app/)
2. "New Project" → "Deploy from GitHub repo"
3. Select repository
4. Configure:
   - Root directory: `backend`
   - Start command: `npm start`
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `PORT`: `5000`
6. Deploy and note the URL

#### **Frontend on Netlify**
1. Go to [netlify.com](https://netlify.com/)
2. "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Configure:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
5. Environment variables:
   - `REACT_APP_API_URL`: Your Railway backend URL
6. Deploy!

---

### 🔧 Post-Deployment Checklist

#### **Backend Health Check**
```bash
# Test backend is running
curl https://your-backend-url.com/health

# Expected response:
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-02-08T10:30:00.000Z"
}
```

#### **Frontend Environment**
```bash
# Check if API URL is correct
curl https://your-frontend-url.com

# Open browser console and check:
console.log(process.env.REACT_APP_API_URL)
```

#### **Database Connection**
```bash
# Test products endpoint
curl https://your-backend-url.com/products

# Should return array of products
```

#### **CORS Configuration**
If you get CORS errors, update `backend/index.js`:
```javascript
// backend/index.js
app.use(cors({
  origin: ['https://your-frontend-url.com', 'http://localhost:3000'],
  credentials: true
}));
```

---

### 🔒 Production Security Checklist

- [ ] **Environment Variables**: All secrets in `.env` files, never in code
- [ ] **MongoDB IP Whitelist**: Restrict to deployment platform IPs (not 0.0.0.0/0)
- [ ] **CORS**: Restrict to your frontend domain only
- [ ] **HTTPS**: Enable SSL certificates (Let's Encrypt free)
- [ ] **Rate Limiting**: Add express-rate-limit to prevent abuse
- [ ] **Input Validation**: Validate all user inputs
- [ ] **Error Handling**: Don't expose stack traces in production
- [ ] **Monitoring**: Setup logging (Winston, LogRocket)
- [ ] **Backups**: Enable MongoDB automatic backups
- [ ] **Update Dependencies**: Regularly run `npm audit fix`

**Add to backend/index.js**:
```javascript
const rateLimit = require('express-rate-limit');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Production error handling
if (process.env.NODE_ENV === 'production') {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });
}
```

---

### 📊 Monitoring & Maintenance

#### **Log Management**
```bash
# View Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Download logs
docker-compose logs backend > backend.log
```

#### **Database Management**
```bash
# Backup MongoDB
mongodump --uri="your_mongodb_uri" --out=/backup

# Restore
mongorestore --uri="your_mongodb_uri" /backup

# Or use MongoDB Atlas built-in backups (recommended)
```

#### **Updates**
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Or for non-Docker:
npm install  # in both frontend and backend
npm run build  # in frontend
pm2 restart all  # if using PM2
```

---

### 🆘 Deployment Troubleshooting

#### **Build Fails on Vercel/Netlify**
```bash
# Common issues:
# 1. Missing .env variables → Add in platform dashboard
# 2. Build command wrong → Check package.json scripts
# 3. Node version mismatch → Add .nvmrc file:
echo "20" > .nvmrc
```

#### **Backend Can't Connect to MongoDB**
```bash
# Check:
# 1. MONGO_URI is correct
# 2. IP whitelist includes 0.0.0.0/0 or deployment platform IPs
# 3. Database user has correct permissions
# 4. Network access is enabled in MongoDB Atlas
```

#### **CORS Errors in Production**
```javascript
// backend/index.js - Update CORS config
const allowedOrigins = [
  'https://your-frontend-url.com',
  'https://your-frontend-url.netlify.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
```

#### **Docker Container Crashes**
```bash
# Check logs
docker-compose logs backend

# Common fixes:
# 1. Increase memory limit in docker-compose.yml
# 2. Check environment variables are set
# 3. Ensure MongoDB connection string is valid
```

---

### 💰 Cost Estimation

#### **Free Tier (Recommended for Demo)**
- **MongoDB Atlas**: Free M0 Sandbox (512MB storage)
- **Vercel**: Free (100GB bandwidth/month)
- **Render**: Free (750 hours/month, sleeps after 15 min inactive)
- **Total**: $0/month ✨

#### **Production-Ready**
- **MongoDB Atlas**: M2 Cluster - $9/month
- **Vercel Pro**: $20/month (unlimited bandwidth)
- **Render Standard**: $7/month (always online)
- **Domain**: $10-15/year
- **Total**: ~$36/month

#### **Enterprise Scale**
- **DigitalOcean Droplet**: $12-48/month
- **MongoDB Atlas M10**: $57/month
- **Cloudflare CDN**: Free
- **Total**: ~$69-105/month

---

## 🔐 Security Notice

⚠️ **IMPORTANT**: This repository contains a `.env` file with MongoDB credentials for demonstration purposes only.

**For your deployment:**
1. **Never commit `.env` files to Git**
2. Use `.env.example` as a template
3. Add `.env` to `.gitignore` (already done)
4. Rotate MongoDB credentials if exposed
5. Use environment variables in deployment platforms

**If you forked this repo:**
```powershell
# Remove .env from Git history
git rm --cached backend/.env frontend/.env
git commit -m "Remove .env files from tracking"
git push origin main

# Create new .env files locally and add your own credentials
```

---

## 🤝 Contributing

This is an assignment project, but suggestions are welcome!

## 📄 License

ISC

## 👨‍💻 Author

**Jayasimha**
- GitHub: [@Jayasimha-2005](https://github.com/Jayasimha-2005)

---

Made with ❤️ for Naksh Jewels Internship Assignment

