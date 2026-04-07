// routes/uploadRoutes.js
const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// 🔥 configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// 🔥 replace diskStorage with cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'nepcha-products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  // 🔥 return cloudinary URL instead of local path
  res.json({ ImageUrl: req.file.path });
});

module.exports = router;