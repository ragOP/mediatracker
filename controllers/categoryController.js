import Category from '../models/Category.js';

export const getCategoriesBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const categories = await Category.find({ mainSection: section });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};