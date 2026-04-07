// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});

const connectDB = require('./config/db');

const app = express();
const clientBuildPath = path.join(__dirname, 'client', 'dist');

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: [process.env.CLIENT_URL, 'https://nepchainternational.com.np'],
  credentials: true,
}));
app.use(express.json());

// Logging
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Serve React build for frontend routes (SPA fallback)
app.use(express.static(clientBuildPath));
app.use((req, res, next) => {
  // Skip API and uploads routes
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));