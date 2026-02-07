const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI not set in .env');
  process.exit(1);
}

const products = [
  { name: 'Gold Necklace', price: 1999, image: 'https://via.placeholder.com/600x400?text=Gold+Necklace' },
  { name: 'Diamond Ring', price: 2999, image: 'https://via.placeholder.com/600x400?text=Diamond+Ring' },
  { name: 'Silver Bracelet', price: 799, image: 'https://via.placeholder.com/600x400?text=Silver+Bracelet' },
  { name: 'Pearl Earrings', price: 1299, image: 'https://via.placeholder.com/600x400?text=Pearl+Earrings' },
];

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing products (optional)
    await Product.deleteMany({});
    const created = await Product.insertMany(products);
    console.log(`Inserted ${created.length} products`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed', err.message || err);
    process.exit(1);
  }
}

run();
