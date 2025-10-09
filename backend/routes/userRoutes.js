const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const College = require('../models/College'); // You might need to add this
const User = require('../models/User'); // You should already have this
// Endpoint:  POST /api/users/register
// Purpose:   Register a new user
router.post('/register', async (req, res) => {
  // Get user data from the incoming request body
  const { name, email, password } = req.body;

  try {
    // 1. Check if a user with that email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // 2. If the user is new, create a new user object
    user = new User({ name, email, password });

    // 3. Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Save the new user to the database
    await user.save();

    // 5. Send back a success response (but not the password!)
    res.status(201).json({ 
        message: 'User registered successfully!',
        user: { id: user.id, name: user.name, email: user.email }
    });
    

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
// Endpoint:  POST /api/users/login
// Purpose:   Authenticate a user and return a token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if a user with that email exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // 2. Compare the submitted password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // 3. If they match, create the JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // 4. Sign the token with your secret key and send it back
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // Token is valid for 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ message: 'Login successful!', token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
// @route   PUT /api/users/shortlist/:collegeId
// @desc    Add a college to a user's shortlist
// @access  Private (notice the authMiddleware)
router.put('/shortlist/:collegeId', authMiddleware, async (req, res) => {
  try {
    // Check if the college exists
    const college = await College.findById(req.params.collegeId);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    // Get the user (the middleware gives us the user's id in req.user.id)
    const user = await User.findById(req.user.id);

    // Check if the college is already in the shortlist
    if (user.shortlist.includes(req.params.collegeId)) {
      return res.status(400).json({ message: 'College already in shortlist' });
    }

    // Add college to shortlist and save
    user.shortlist.unshift(req.params.collegeId);
    await user.save();

    res.json(user.shortlist);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
// @route   GET /api/users/shortlist
// @desc    Get the logged-in user's shortlist with college details
// @access  Private
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
// @route   DELETE /api/users/shortlist/:collegeId
// @desc    Remove a college from a user's shortlist
// @access  Private
router.delete('/shortlist/:collegeId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Create a new shortlist array that excludes the college to be removed
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