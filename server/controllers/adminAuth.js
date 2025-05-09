const OTP = require("../models/OTP");
const Admin = require("../models/admin");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Session = require("../models/sessionModel");
const getLocation = require("../utills/goeLocation");



function generateSessionId() {
  return otpGenerator.generate(32, { alphabets: true, specialChars: false });
}

function getClientIp(req) {
  let ipAddress = req.headers['x-forwarded-for'] || 
                  req.connection?.remoteAddress || 
                  req.socket?.remoteAddress || 
                  (req.connection?.socket ? req.connection.socket.remoteAddress : null);

  // Handle multiple IPs in the x-forwarded-for header
  if (ipAddress && ipAddress.includes(',')) {
      ipAddress = ipAddress.split(',')[0].trim();
  }

  // Handle IPv6 to IPv4 mapping if needed
  if (ipAddress && ipAddress.startsWith('::ffff:')) {
      ipAddress = ipAddress.substring(7);
  }

  return ipAddress || 'Unknown IP';
}



exports.adminSignup = asyncHandler(async (req, res) => {
  try {
    // Destructure fields from the request body
    const { name, email, password,  contactNumber } = req.body;

    // Check if All Details are there or not
    if (!name || !email || !password || !contactNumber) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const admin = await Admin.create({
      name,
      email,
      contactNumber,
      password: hashedPassword,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${name} `,
    });

    // Return success response
    return res.status(200).json({
      success: true,
      admin,
      message: "Admin registered  successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Admin cannot be registered. Please try again.",
    });
  }
});

exports.adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: `Your Not A Admin `,
      });
    }

    // if (admin.isBlocked && admin.blockUntil > Date.now()) {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Account is blocked until ${admin.blockUntil.toISOString()}`,
    //   });
    // }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      admin.failedAttempts += 1;

      // Block account if failed attempts reach 5
      if (admin.failedAttempts >= 5) {
        admin.isBlocked = true;
        admin.blockUntil = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
      }

      await admin.save();
      return res
        .status(401)
        .json({ success: false, message: "Invalid password Try Again" });
    }

    // Reset failed attempts on successful login
    admin.failedAttempts = 0;
    admin.isBlocked = false;
    admin.blockUntil = null;

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
});

exports.verifyAdmin = asyncHandler(async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and OTP.",
      });
    }

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    //   Find the admin
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    const token = jwt.sign(
      { email: admin.email, id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );


    const sessionId = generateSessionId();
    const device = req.headers['user-agent'];
    // console.log(req.ip)
    // console.log(req.headers); // To see all headers received
// console.log(req.headers['x-forwarded-for']); // To specifically check this header

    const ipAddress = await getClientIp(req);
    // console.log(ipAddress)
    const location = await getLocation(ipAddress); // You can use a geolocation API

    await Session.create({
      userId: admin._id,
      device,
      location,
      loginTime: new Date(),
      sessionId, 
      ipAddress,
    });

      // Logout previous sessions if needed
    // await Session.deleteMany({ userId: user._id, sessionId: { $ne: sessionId } });



    // Save token to admin document in database
    admin.token = token;
    admin.password = undefined;
    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      admin,
      sessionId,    
      message: `admin Login Success`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "OTP verification failed. Please try again.",
    });
  }
});






// In your authController.js or a similar file
exports.logoutSession = async (req, res) => {
  const { sessionId } = req.body; // Extract session ID from the request body
  const userId = req.user?.id; // Extract user ID from authenticated user info

  if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Session ID required.' });
  }

  try {
      // Find and remove the session
      const result = await Session.deleteOne({ userId, sessionId });

      if (result.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'Session not found.' });
      }

      res.status(200).json({ success: true, message: 'Session logged out successfully.' });
  } catch (error) {
      console.error('Error logging out session:', error);
      res.status(500).json({ success: false, message: 'Error logging out session.' });
  }
};



// In your authController.js or a similar file

exports.getSessions = async (req, res) => {
    const userId = req.user?.id; // Extract user ID from authenticated user info

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID required.' });
    }

    try {
        // Retrieve all sessions for the user
        const sessions = await Session.find({ userId });
        res.status(200).json({ success: true, sessions });
    } catch (error) {
        console.error('Error retrieving sessions:', error);
        res.status(500).json({ success: false, message: 'Error retrieving sessions.' });
    }
};
