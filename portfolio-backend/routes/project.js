const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const db = req.app.get('db');
  const [projects] = await db.query('SELECT * FROM projects');
  console.log('Fetched Projects:', projects); // Add this
  return res.send(projects);
});


router.post('/', async (req, res) => {
  const db = req.app.get('db');
  const { title, description, tech_stack, link, image } = req.body;
  await db.query(
    'INSERT INTO projects (title, description, tech_stack, link, image) VALUES (?, ?, ?, ?, ?)',
    [title, description, tech_stack, link, image]
  );
  res.status(201).send('Project added');
});
router.get('/api/skills', (req, res) => {
  db.query('SELECT * FROM skills', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST Skill
router.post('/api/skills', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO skills (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Skill added' });
  });
});

// GET Achievements
router.get('/api/achievements', (req, res) => {
  db.query('SELECT * FROM achievements', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST Achievement
router.post('/api/achievements', (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO achievements (title) VALUES (?)', [title], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Achievement added' });
  });
})
module.exports = router;
// UPDATE project
router.put("/:id", (req, res) => {
  
  const { title, description, link } = req.body;
  db.query("UPDATE projects SET title=?, description=?, link=? WHERE id=?", [title, description, link, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✏ Project updated" });
  });
});

// DELETE project
router.delete("/:id", (req, res) => {
  const db = req.app.get('db');
  db.query("DELETE FROM projects WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑 Project deleted" });
  });
});

module.exports = router;

