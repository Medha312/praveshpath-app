const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const College = require('../models/College');
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(201).json({ 
        message: 'User registered successfully!',
        user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const payload = {
      user: {
        id: user.id,
        role: user.role // Add role to the token payload
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        // CORRECTED RESPONSE:
        res.json({
          message: 'Login successful!',
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Add to Shortlist Route
router.put('/shortlist/:collegeId', authMiddleware, async (req, res) => {
  try {
    const college = await College.findById(req.params.collegeId);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    const user = await User.findById(req.user.id);
    if (user.shortlist.includes(req.params.collegeId)) {
      return res.status(400).json({ message: 'College already in shortlist' });
    }
    user.shortlist.unshift(req.params.collegeId);
    await user.save();
    res.json(user.shortlist);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Get Shortlist Route
router.get('/shortlist', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('shortlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.shortlist);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Delete from Shortlist Route
router.delete('/shortlist/:collegeId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.shortlist = user.shortlist.filter(
      (collegeId) => collegeId.toString() !== req.params.collegeId
    );
    await user.save();
    res.json(user.shortlist);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;