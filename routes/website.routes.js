import express from 'express';
const router = express.Router();
import Website from '../models/Website.js';
import jwt from 'jsonwebtoken';

// middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

// CREATE
router.post('/', verifyToken, async (req, res) => {
  try {
    const website = new Website(req.body);
    website.paths.forEach(p => { p.updatedBy = req.user.email });
    await website.save();
    res.status(201).json(website);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL
router.get('/', async (req, res) => {
  try {
    const websites = await Website.find();
    res.json(websites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ONE
router.get('/:id', async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    res.json(website);
  } catch (error) {
    res.status(404).json({ error: "Website not found" });
  }
});

// UPDATE
router.put('/:id', verifyToken, async (req, res) => {
  try {
    if (req.body.paths) {
      req.body.paths.forEach(p => { p.updatedBy = req.user.email });
    }
    const updated = await Website.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Website.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;