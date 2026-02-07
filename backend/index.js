const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
// Increase JSON and URL-encoded body size limits to accept base64 image payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('Missing MONGO_URI in environment');
  process.exit(1);
}

// Start the server. If MongoDB is unavailable we fall back to a safe demo mode
function startServer({ dbConnected } = { dbConnected: false }) {
  if (dbConnected) {
    app.use('/products', productRoutes);
    app.use('/cart', cartRoutes);
  } else {
    // Demo data and minimal demo cart endpoints for when DB is not available
    const demoProducts = [
      { _id: 'd1', name: 'Gold Necklace', price: 1999, image: 'https://via.placeholder.com/600x400?text=Gold+Necklace' },
      { _id: 'd2', name: 'Diamond Ring', price: 2999, image: 'https://via.placeholder.com/600x400?text=Diamond+Ring' },
      { _id: 'd3', name: 'Silver Bracelet', price: 799, image: 'https://via.placeholder.com/600x400?text=Silver+Bracelet' },
      { _id: 'd4', name: 'Pearl Earrings', price: 1299, image: 'https://via.placeholder.com/600x400?text=Pearl+Earrings' },
    ];

    app.get('/products', (req, res) => res.json(demoProducts));
    app.get('/cart', (req, res) => res.json([]));
    app.post('/cart', (req, res) => res.status(503).json({ message: 'Cart is unavailable in demo mode' }));
    app.put('/cart/:id', (req, res) => res.status(503).json({ message: 'Cart is unavailable in demo mode' }));
    app.delete('/cart/:id', (req, res) => res.status(503).json({ message: 'Cart is unavailable in demo mode' }));
  }

  // Centralized error handler
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (!dbConnected) console.log('Running in demo mode (DB unavailable). GET /products returns demo data.');
  });
}

// Try to connect to MongoDB, but fall back to demo server if connection fails
mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log('MongoDB connected');
    startServer({ dbConnected: true });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message || err);
    console.warn('Starting server in demo mode (DB unavailable).');
    startServer({ dbConnected: false });
  });
