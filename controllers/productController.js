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

    // Normalize input (remove spaces and lowercase)
    const normalize = (str) => str.replace(/\s+/g, '').toLowerCase();

    if (mainSection) filter.mainSection = decodeURIComponent(mainSection).toLowerCase();

    if (category) {
      category = decodeURIComponent(category);
      filter.category = new RegExp(`^${normalize(category)}$`, 'i');
    }

    if (subcategory) {
      subcategory = decodeURIComponent(subcategory);
      filter.subcategory = new RegExp(`^${normalize(subcategory)}$`, 'i');
    }

    // Fetch all products and normalize their category for matching
    const products = await Product.find().lean();
    const filtered = products.filter((p) => {
      const cat = p.category ? normalize(p.category) : '';
      const sub = p.subcategory ? normalize(p.subcategory) : '';
      return (
        (!category || cat === normalize(category)) &&
        (!subcategory || sub === normalize(subcategory)) &&
        (!mainSection || p.mainSection.toLowerCase() === mainSection)
      );
    });

    res.json(filtered);
  } catch (err) {
    console.error('Get Products Error:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch products' });
  }
};
