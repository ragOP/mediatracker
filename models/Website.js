import mongoose from 'mongoose';

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

export default mongoose.model('Website', websiteSchema);