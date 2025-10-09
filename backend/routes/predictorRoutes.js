const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');

// @route   POST /api/predict
// @desc    Predict colleges based on rank, category, and branch
router.post('/', async (req, res) => {
  const { rank, category, branch } = req.body;

  try {
    // Find branches that match the user's criteria
    const eligibleBranches = await Branch.find({
      branchName: branch, // Match the preferred branch
      'closingRanks.category': category, // Match the category
      'closingRanks.rank': { $gte: rank } // Find where closing rank is greater than or equal to user's rank
    }).populate('collegeId'); // IMPORTANT: Get the full college details

    // Extract just the college details from the results
    const colleges = eligibleBranches.map(b => b.collegeId);

    res.json(colleges);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;