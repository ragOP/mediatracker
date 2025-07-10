import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// ------------------- CONFIG -------------------
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ------------------- DB SCHEMA -------------------
const pathSchema = new mongoose.Schema({
  path: String,
  language: String,
  isLive: Boolean,
  category: {
    type: String,
    enum: ['medicare', 'finalexpense', 'aca'],
  },
  ringbaScript: String,
  gtagHead: String,
  gtagBody: String,
  did: String,
  displayDid: String,
  url1: String,
  url2: String,
  cloaking: Boolean,
  aggressive: Boolean,
  testing: Boolean,
  startDate: Date,
  updatedBy: String,
}, { timestamps: true });

const websiteSchema = new mongoose.Schema({
  websiteName: { type: String, required: true },
  paths: [pathSchema],
}, { timestamps: true });

const Website = mongoose.model('Website', websiteSchema);

// ------------------- ROUTES -------------------

// Add a new website with multiple paths
app.post('/api/websites', async (req, res) => {
  try {
    const { websiteName, paths } = req.body;

    const newWebsite = new Website({
      websiteName,
      paths,
    });

    const saved = await newWebsite.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all websites with their paths
app.get('/api/websites', async (req, res) => {
  try {
    const websites = await Website.find();
    res.json(websites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new path to existing website
app.post('/api/websites/:id/paths', async (req, res) => {
  try {
    const { id } = req.params;
    const pathData = req.body;

    const website = await Website.findById(id);
    if (!website) return res.status(404).json({ message: 'Website not found' });

    website.paths.push(pathData);
    await website.save();

    res.json(website);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get a single website by ID (used in EditWebsite.jsx)
app.get('/api/websites/:id', async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) return res.status(404).json({ message: 'Website not found' });

    res.json(website);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific path by path ID inside a website
app.put('/api/websites/:websiteId/paths/:pathId', async (req, res) => {
  try {
    const { websiteId, pathId } = req.params;
    const updatedData = req.body;

    const website = await Website.findById(websiteId);
    if (!website) return res.status(404).json({ message: 'Website not found' });

    const path = website.paths.id(pathId);
    if (!path) return res.status(404).json({ message: 'Path not found' });

    Object.assign(path, updatedData);

    await website.save();
    res.json(website);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------------------- START SERVER -------------------
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection failed:', err));
