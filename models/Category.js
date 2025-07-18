import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  mainSection: { type: String, enum: ['his', 'her'], required: true },
  name: { type: String, required: true },
  subcategories: [String]  // optional list of subcategory names
});

const Category = mongoose.model('Category', categorySchema);

export default Category; // ✅ Correct way for ESM
