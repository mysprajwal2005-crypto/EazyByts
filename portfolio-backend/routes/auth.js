const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', async (req, res) => {
  const db = req.app.get('db');
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [req.body.username, req.body.email, hashedPassword]
  );
  res.status(201).send('User registered');
});

router.post('/login', async (req, res) => {
  const db = req.app.get('db');
  const [users] = await db.query('SELECT * FROM users WHERE email = ?', [req.body.email]);
  const user = users[0];
  if (!user) return res.status(400).send('Invalid email');
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send('Invalid password');
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;

