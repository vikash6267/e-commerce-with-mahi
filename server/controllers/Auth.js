const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateUniqueReferralCode } = require("../helper/referservice");
require("dotenv").config();

const asyncHandler = require("express-async-handler");


exports.signup = asyncHandler(async (req, res) => {
  try {
    // Destructure fields from the request body
    const {
      name,
      email,
      password,
      confirmPassword,
      contactNumber,
      refer: referralCodeFromRequest = false,
    } = req.body;

    console.log(referralCodeFromRequest);

    // Check if All Details are there or not
    if (!name || !email || !password || !confirmPassword || !contactNumber) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let referredBy = null;

    let referringUser;
    // If referral code is provided in the request body
    if (referralCodeFromRequest) {
      // Find the user who referred by the provided referral code
      console.log(referralCodeFromRequest);
      referringUser = await User.findOne({
        referralCode: referralCodeFromRequest,
      });
      if (referringUser) {
        referredBy = referringUser._id; // Set referredBy to the ID of the referring user
      }
    }

    // Generate unique referral code
    const referralCode = await generateUniqueReferralCode(name);

    // Create user in the database
    const user = await User.create({
      name,
      email,
      contactNumber,
      password: hashedPassword,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${name} `,
      referralCode: referralCode,
      referralBy: referredBy,
    });

    if (referringUser) {
      // Update the referring user's network to include the referred user's details
      referringUser.network.push({
        id: user._id,
        referralCode: referralCodeFromRequest,
      });
      await referringUser.save();
    }

    // console.log(user)
    // Log in the user after signup
    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Set cookie for token
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, options);

    // Return success response
    return res.status(200).json({
      success: true,
      token,
      user,
      message: "User registered and logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
});

// Login controller for authenticating users
exports.login = asyncHandler(async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Find user with provided email
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      // Save token to user document in database
      user.token = token;
      user.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
});

// Send OTP For Email Verification
exports.sendotp = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    // Find user with provided email
    // const checkUserPresent = await User.findOne({ email })
    // // to be used in case of signup

    // // If user found with provided email
    // if (checkUserPresent) {
    //   // Return 401 Unauthorized status code with error message
    //   // const error = new Error("Error occurred");
    //   // error.status = 401;
    //   // error.status = false;
    //   // next(error)

    // return res.status(401).json({ success: false, message: "user Already please login" })

    // }

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
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

exports.compareOtp = asyncHandler(async (req, res) => {
  try {
    console.log("hello");
    const { otp, email } = req.body;

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(200).json({
        success: true,
        userFind: false,
      });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.accountType,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Save token to user document in database
    existingUser.token = token;
    existingUser.password = undefined;
    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, options).status(200).json({
      success: true,
      userFind: true,
      token,
      existingUser,
      message: `User Login Success`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

exports.fetchMyProfile = asyncHandler(async (req, res) => {
  try {
    // Get email and password from request body
    const id = req.user.id;

    const userDetails = await User.findById(id);

    // Find user with provided email
    const user = await User.findById(id);

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    return res.status(200).json({
      user,
      success: true,
      message: `Fetch Data Successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Error During fetch data`,
    });
  }
});

// Login controller for authenticating users
exports.adminLogin = asyncHandler(async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;
    console.log(email, password);
    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Find user with provided email
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (user.accountType !== "Admin") {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `Protected Route For Admin`,
      });
      throw new Error("Not Authorised");
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      // Save token to user document in database
      user.token = token;
      user.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `Admin Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
});

exports.allUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.status(200).json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

exports.getReferData = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    // console.log(userId)
    const userDetails = await User.findById(userId).populate("network.id");
    // console.log(userDetails)

    if (userDetails) {
      res.status(200).json({
        success: true,
        network: userDetails?.network,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});
