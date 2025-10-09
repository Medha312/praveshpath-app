const express = require('express');
const router = express.Router();
const College = require('../models/College');
const Branch = require('../models/Branch');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// @route   POST /api/colleges
// @desc    Create a new college
// @access  Private/Admin
router.post('/', [authMiddleware, adminMiddleware], async (req, res) => {
    try {
        const newCollege = new College(req.body);
        await newCollege.save();
        res.status(201).json(newCollege);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/colleges
// @desc    Get all colleges
// @access  Public
router.get('/', async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/colleges/search?q=...
// @desc    Search colleges by name
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const colleges = await College.find({
      name: { $regex: query, $options: 'i' }
    });
    res.json(colleges);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/colleges/:id
// @desc    Get a single college by its ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const college = await College.findById(req.params.id);
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.json(college);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/colleges/:id
// @desc    Update a college
// @access  Private/Admin
router.put('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
    try {
        let college = await College.findById(req.params.id);
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(college);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/colleges/:id
// @desc    Delete a college
// @access  Private/Admin
router.delete('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    await Branch.deleteMany({ collegeId: req.params.id });
    await College.findByIdAndDelete(req.params.id);
    res.json({ message: 'College and associated branches removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;