const express = require('express');
const router = express.Router();

// GET Blogs
router.get('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    const [rows] = await db.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Blog
router.post('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    const { title, content } = req.body;
    await db.query('INSERT INTO blog_posts (title, content) VALUES (?, ?)', [title, content]);
    res.json({ message: '✅ Blog post added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Blog
router.delete('/:id', async (req, res) => {
  try {
    const db = req.app.get('db');
    const blogId = req.params.id;
    await db.query('DELETE FROM blog_posts WHERE id = ?', [blogId]);
    res.json({ message: '🗑 Blog post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", (req, res) => {
    const db = req.app.get('db');
  const { title, content } = req.body;
  db.query("UPDATE blog_posts SET title=?, content=? WHERE id=?", [title, content, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✏ Blog post updated" });
  });
});

module.exports = router;