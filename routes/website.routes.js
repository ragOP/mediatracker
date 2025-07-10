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

// EXISTING ROUTES...
router.post('/', verifyToken, async (req, res) => { /* ... */ });
router.get('/', async (req, res) => { /* ... */ });
router.get('/:id', async (req, res) => { /* ... */ });
router.put('/:id', verifyToken, async (req, res) => { /* ... */ });
router.delete('/:id', verifyToken, async (req, res) => { /* ... */ });


// 🔽 ADD THESE NEW PATH ROUTES BELOW 🔽

// Add new path
router.post('/:id/paths', verifyToken, async (req, res) => { /* ... */ });

// Edit a specific path
router.put('/:id/paths/:pathId', verifyToken, async (req, res) => { /* ... */ });

// Delete a path
router.delete('/:id/paths/:pathId', verifyToken, async (req, res) => { /* ... */ });

export default router;
