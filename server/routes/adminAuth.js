// routes/adminRoutes.js

const express = require('express');
const { adminSignup, adminLogin, verifyAdmin ,logoutSession,getSessions} = require('../controllers/adminAuth');
const { adminAuth, verifySession } = require('../middlewares/auth');
const router = express.Router();

// Route for Admin Signup
router.post('/signup', adminSignup);

// Route for Admin Login
router.post('/login', adminLogin);

// Route for OTP Verification
router.post('/verify-otp', verifyAdmin);

router.post('/logout', adminAuth,verifySession, logoutSession);
router.get('/getsession', adminAuth,verifySession, getSessions);

module.exports = router;
