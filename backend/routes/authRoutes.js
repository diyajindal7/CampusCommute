require("dotenv").config();



const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const sendOTP = require("../utils/sendOTP");
const authMiddleware =
require("../middleware/authMiddleware");


console.log(
  "AUTH ROUTE JWT:",
  process.env.JWT_SECRET
);

router.post("/register", async (req, res) => {

     
     
  console.log("REGISTER HIT");
  console.log(req.body);
     
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
if (existingUser) {

  if (existingUser.isVerified) {

    return res.status(400).json({
      success: false,
      message: "User already exists",
    });

  }

  const otp = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  existingUser.otp = otp;
  existingUser.otpExpires =
    Date.now() + 5 * 60 * 1000;

  await existingUser.save();

  await sendOTP(email, otp);

  return res.status(200).json({
    success: true,
    message: "OTP Resent",
  });

}

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(
  100000 + Math.random() * 900000
).toString();

    const user = await User.create({
  name,
  email,
  password: hashedPassword,

  otp,

  otpExpires: Date.now() + 5 * 60 * 1000,
});

await sendOTP(email, otp);

   res.status(201).json({
  success: true,
  message: "OTP Sent",
});

  } catch (error) {

  console.error("REGISTER ERROR:");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });

}

});



router.get("/test", (req, res) => {
  res.send("Auth route working");
});


router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password required",
      });
    }

    const user = await User.findOne({ email });

if (!user) {
  return res.status(400).json({
    success: false,
    message: "User not found",
  });
}

if (!user.isVerified) {
  return res.status(400).json({
    success: false,
    message: "Please verify your email first",
  });
}

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }



    console.log(
  "JWT Secret:",
  process.env.JWT_SECRET
);

const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
    roles: user.roles,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);


   res.json({
  success: true,
  message: "Login Successful",

  token,

  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
  },
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

});


router.post("/verify-otp", async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.isVerified = true;

    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.json({
      success: true,
      message: "Account Verified",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});




router.post("/forgot-password", async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.otp = otp;
    user.otpExpires =
      Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendOTP(email, otp);

    res.json({
      success: true,
      message: "Reset OTP Sent",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});



router.post("/reset-password", async (req, res) => {

  try {

    const {
      email,
      otp,
      newPassword,
    } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.json({
      success: true,
      message: "Password Reset Successful",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});



router.get("/profile/:email", async (req, res) => {

  try {

    const user = await User.findOne({
      email: req.params.email,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


router.get(
  "/me",
  authMiddleware,

  (req, res) => {

    res.json(req.user);

  }
);



module.exports = router;