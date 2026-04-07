// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000',  "https://nepchainternational.com.np"],
  credentials: true,
}));

app.use(express.json());


// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes (we'll add these next)
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/upload',   require('./routes/uploadRoutes'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));