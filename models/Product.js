// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  mainSection: { type: String, enum: ['his', 'her'], required: true },
  category: { type: String, required: true },
  subcategory: { type: String }, // optional
  name: String,
  imageUrls: [String],
  price: Number,
  priority: { type: String, enum: ['high', 'normal', 'low'], default: 'normal' }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;