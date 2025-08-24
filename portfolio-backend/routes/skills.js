const express = require('express');
const router = express.Router();

// GET Skills
router.get('/', async (req, res) => {
  const db = req.app.get('db');
  try {
    const [skills] = await db.query('SELECT * FROM skills');
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Skill
router.post('/', async (req, res) => {
  const db = req.app.get('db');
  const { name } = req.body;
  try {
    await db.query('INSERT INTO skills (name) VALUES (?)', [name]);
    res.status(201).json({ message: 'Skill added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// UPDATE skill
router.put("/:id", (req, res) => {
  const db = req.app.get('db');
  const { name, level } = req.body;
  db.query("UPDATE skills SET name=?, level=? WHERE id=?", [name, level, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✏ Skill updated" });
  });
});

// DELETE skill
router.delete("/:id", (req, res) => {
  const db = req.app.get('db');
  db.query("DELETE FROM skills WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑 Skill deleted" });
  });
});

module.exports = router;
