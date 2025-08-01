import Category from '../models/Category.js';

export const getProductMetadata = async (req, res) => {
  try {
    const { mainSection, category } = req.query;

    if (!mainSection && !category) {
      return res.json({ sections: ['his', 'her'] });
    }

    const categories = await Category.find({ mainSection });

    if (category) {
      const selected = categories.find(c => c.name === category);
      return res.json({ subcategories: selected?.subcategories || [] });
    }

    return res.json({
      categories: categories.map(cat => ({
        name: cat.name,
        subcategories: cat.subcategories
      }))
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
};
