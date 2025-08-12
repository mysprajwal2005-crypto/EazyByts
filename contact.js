const express = require('express');
const router = express.Router();

// GET contacts
router.get('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    const [rows] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST contact
router.post('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    const { name, email, message } = req.body;
    await db.query(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    res.json({ message: '📩 Message sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE contact message
router.put("/:id", (req, res) => {
  const db = req.app.get('db');
  const { name, email, message } = req.body;
  db.query("UPDATE contacts SET name=?, email=?, message=? WHERE id=?", [name, email, message, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✏ Contact message updated" });
  });
});

// DELETE contact message
router.delete("/:id", (req, res) => {
  const db = req.app.get('db');
  db.query("DELETE FROM contacts WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑 Contact message deleted" });
  });
});

module.exports = router;
