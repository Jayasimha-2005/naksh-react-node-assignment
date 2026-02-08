const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
// Increase JSON and URL-encoded body size limits to accept base64 image payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from React frontend build
app.use(express.static(path.join(__dirname, 'public')));

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error('⚠️  Missing MONGO_URI in environment');
  console.log('Starting server in demo mode...');
  startServer({ dbConnected: false });
} else {
  connectToMongoDB();
}

// MongoDB connection with retry logic
async function connectToMongoDB() {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      console.log(`🔄 Attempting to connect to MongoDB (attempt ${retries + 1}/${maxRetries})...`);
      
      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        tls: true,
        tlsAllowInvalidCertificates: false,
        tlsAllowInvalidHostnames: false,
      });
      
      console.log('✅ MongoDB connected successfully');
      console.log(`📊 Database: ${mongoose.connection.name}`);
      
      // Handle connection errors after initial connection
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err.message);
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️  MongoDB disconnected');
      });

      mongoose.connection.on('reconnected', () => {
        console.log('✅ MongoDB reconnected');
      });

      startServer({ dbConnected: true });
      return;
    } catch (err) {
      retries++;
      console.error(`❌ MongoDB connection failed (attempt ${retries}/${maxRetries}):`, err.message);
      
      if (retries >= maxRetries) {
        console.warn('\n⚠️  Could not connect to MongoDB after multiple attempts');
        console.log('💡 Possible solutions:');
        console.log('   1. Check your MONGO_URI in .env file');
        console.log('   2. Whitelist your IP address in MongoDB Atlas');
        console.log('   3. Ensure network connectivity');
        console.log('   4. If using Node 22+, try Node 20 LTS for better compatibility\n');
        console.log('🎬 Starting server in demo mode with fallback data...\n');
        startServer({ dbConnected: false });
        return;
      }
      
      // Wait before retrying (exponential backoff)
      const waitTime = Math.min(1000 * Math.pow(2, retries), 5000);
      console.log(`⏳ Waiting ${waitTime}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

// Start the server with or without database
function startServer({ dbConnected } = { dbConnected: false }) {
  if (dbConnected) {
    app.use('/products', productRoutes);
    app.use('/cart', cartRoutes);
    console.log('🚀 Using MongoDB for data persistence');
  } else {
    // Demo data and minimal demo cart endpoints for when DB is not available
    const demoProducts = [
      { _id: 'd1', name: 'Gold Necklace', price: 1999, image: 'https://via.placeholder.com/600x400/FFD700/000000?text=Gold+Necklace' },
      { _id: 'd2', name: 'Diamond Ring', price: 2999, image: 'https://via.placeholder.com/600x400/B9F2FF/000000?text=Diamond+Ring' },
      { _id: 'd3', name: 'Silver Bracelet', price: 799, image: 'https://via.placeholder.com/600x400/C0C0C0/000000?text=Silver+Bracelet' },
      { _id: 'd4', name: 'Pearl Earrings', price: 1299, image: 'https://via.placeholder.com/600x400/FFF5EE/000000?text=Pearl+Earrings' },
      { _id: 'd5', name: 'Ruby Pendant', price: 3499, image: 'https://via.placeholder.com/600x400/E0115F/FFFFFF?text=Ruby+Pendant' },
      { _id: 'd6', name: 'Emerald Bracelet', price: 4299, image: 'https://via.placeholder.com/600x400/50C878/000000?text=Emerald+Bracelet' },
    ];

    app.get('/products', (req, res) => res.json(demoProducts));
    app.post('/products', (req, res) => res.status(503).json({ message: 'Product creation is unavailable in demo mode' }));
    app.put('/products/:id', (req, res) => res.status(503).json({ message: 'Product update is unavailable in demo mode' }));
    app.delete('/products/:id', (req, res) => res.status(503).json({ message: 'Product deletion is unavailable in demo mode' }));
    
    app.get('/cart', (req, res) => res.json([]));
    app.post('/cart', (req, res) => res.status(503).json({ message: 'Cart is unavailable in demo mode' }));
    app.put('/cart/:id', (req, res) => res.status(503).json({ message: 'Cart is unavailable in demo mode' }));
    app.delete('/cart/:id', (req, res) => res.status(503).json({ message: 'Cart is unavailable in demo mode' }));
    
    console.log('🎭 Running in DEMO MODE (read-only demo products, no persistence)');
  }

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      database: dbConnected ? 'connected' : 'demo mode',
      timestamp: new Date().toISOString()
    });
  });

  // Centralized error handler
  app.use(errorHandler);

  // Serve React frontend for all other routes (SPA fallback)
  // This must be AFTER error handler
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`\n🌐 Server running on http://localhost:${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`📦 Products API: http://localhost:${PORT}/products`);
    if (!dbConnected) {
      console.log('\n💡 Tip: Configure MONGO_URI in .env for full functionality\n');
    }
  });
}
