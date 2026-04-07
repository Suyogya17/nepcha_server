// routes/authRoutes.js
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Hardcoded admin for now — later move to DB
const ADMIN = {
  email: 'admin@nepcha.com',
  password: bcrypt.hashSync('nepcha123', 10),
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN.email)
    return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, ADMIN.password);
  if (!isMatch)
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({ token });
});

module.exports = router;