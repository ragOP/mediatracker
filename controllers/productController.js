import Product from '../models/Product.js';
// ss 
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error('Add Product Error:', err);

    if (err.name === 'ValidationError') {
      // Collect all validation error messages
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: 'Validation Error', details: errors });
    }

    res.status(500).json({ error: err.message || 'Failed to add product' });
  }
};

export const getProducts = async (req, res) => {
  try {
    let { mainSection, category, subcategory } = req.query;
    const filter = {};

    if (mainSection) filter.mainSection = decodeURIComponent(mainSection);
    if (category) {
      category = decodeURIComponent(category).replace(/20/g, ' ');
      filter.category = new RegExp(`^${category}$`, 'i'); // case-insensitive exact match
    }
    if (subcategory) {
      subcategory = decodeURIComponent(subcategory).replace(/20/g, ' ');
      filter.subcategory = new RegExp(`^${subcategory}$`, 'i');
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    console.error('Get Products Error:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch products' });
  }
};
