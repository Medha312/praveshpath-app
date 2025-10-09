const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College', // Links this to a specific college
    required: true,
  },
  branchName: {
    type: String,
    required: true,
    enum: ['CSE', 'ECE', 'ME', 'Civil'] // Define the possible branch names
  },
  closingRanks: [{
    category: {
      type: String,
      required: true,
      enum: ['General', 'OBC', 'SC', 'ST', 'EWS']
    },
    rank: {
      type: Number,
      required: true
    }
  }]
});

module.exports = mongoose.model('Branch', branchSchema);