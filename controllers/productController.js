// controllers/productController.js
import Product from '../models/Product.js';

export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add product' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { mainSection, category, subcategory } = req.query;
    const filter = {};

    if (mainSection) filter.mainSection = mainSection;
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
