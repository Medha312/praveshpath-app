const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'admin'], // Only allows these two values
    default: 'student' // New users are students by default
  },
  shortlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College'
  }]
}, { timestamps: true });

// Ensure this last line is correct
module.exports = mongoose.model('User', userSchema);