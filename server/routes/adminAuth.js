// routes/adminRoutes.js

const express = require('express');
const { adminSignup, adminLogin, verifyAdmin } = require('../controllers/adminAuth');
const router = express.Router();

// Route for Admin Signup
router.post('/signup', adminSignup);

// Route for Admin Login
router.post('/login', adminLogin);

// Route for OTP Verification
router.post('/verify-otp', verifyAdmin);

module.exports = router;
