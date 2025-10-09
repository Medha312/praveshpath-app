// 1. Imports and Initial Setup
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 2. Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// 3. Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Allows the server to accept and parse JSON bodies

// 4. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 5. API Routes
// Any request to /api/users will be handled by userRoutes.js
app.use('/api/users', require('./routes/userRoutes'));

// Any request to /api/colleges will be handled by collegeRoutes.js
app.use('/api/colleges', require('./routes/collegeRoutes'));

// Any request to /api/predict will be handled by predictorRoutes.js
app.use('/api/predict', require('./routes/predictorRoutes'));

// A simple welcome route to test if the server is up
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the PraveshPath API! 🎉" });
});

// 6. Start the Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});