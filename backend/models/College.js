const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true }
  },
  type: {
    type: String,
    enum: ['Govt', 'Private'],
    required: true
  },
  nirfRanking: {
    type: Number
  },
  counsellingCode: {
    type: String,
    unique: true,
    sparse: true // This tells Mongo to ignore documents where this field is null
  },
  // 👇 ADD THESE TWO NEW FIELDS 👇
  websiteUrl: {
    type: String
  },
  imageUrl: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema);