import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    return Category.insertMany([
      {
        mainSection: 'her',
        name: 'Cool Dress',
        subcategories: ['Babydoll', 'Revealing Dresses', 'Saree & Blouses', 'Sex Toys']
      },
      { mainSection: 'her', name: 'Western' },
      { mainSection: 'her', name: 'Desi Diva' },
      { mainSection: 'her', name: 'Dream Dress' },
      { mainSection: 'her', name: 'Wedding Dress' },
      { mainSection: 'her', name: 'Footwear' },
      { mainSection: 'her', name: 'Bags' },
      { mainSection: 'her', name: 'Skincare & Beauty' },
      { mainSection: 'her', name: 'Jewellery' },

      {
        mainSection: 'his',
        name: 'Top Wear',
        subcategories: ['Tshirt', 'Shirt']
      },
      { mainSection: 'his', name: 'Jeans' },
      { mainSection: 'his', name: 'Trouser' },
      { mainSection: 'his', name: 'Half Pant' },
      { mainSection: 'his', name: 'Footwear' },
      { mainSection: 'his', name: 'Sunglasses' },
      { mainSection: 'his', name: 'Gym Accessories' },
      { mainSection: 'his', name: 'Watches' },
      { mainSection: 'his', name: 'Kurta' },
      { mainSection: 'his', name: 'Perfume' },
      { mainSection: 'his', name: 'Suits' },
      { mainSection: 'his', name: 'Skincare' },
      { mainSection: 'his', name: 'Tech Accessories' }
    ]);
  })
  .then(() => {
    console.log('Categories seeded');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit();
  });