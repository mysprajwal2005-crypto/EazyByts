const express = require('express');
const router = express.Router();

// GET Achievements
router.get('/', async (req, res) => {
  const db = req.app.get('db');
  try {
    const [achievements] = await db.query('SELECT * FROM achievements');
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Achievement
router.post('/', async (req, res) => {
  const db = req.app.get('db');
  const { title } = req.body;
  try {
    await db.query('INSERT INTO achievements (title) VALUES (?)', [title]);
    res.status(201).json({ message: 'Achievement added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// UPDATE achievement
router.put("/:id", (req, res) => {
  const db = req.app.get('db');
  const { title, description } = req.body;
  db.query("UPDATE achievements SET title=?, description=? WHERE id=?", [title, description, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✏ Achievement updated" });
  });
});

// DELETE achievement
router.delete("/:id", (req, res) => {
  const db = req.app.get('db');
  db.query("DELETE FROM achievements WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑 Achievement deleted" });
  });
});

module.exports = router;

