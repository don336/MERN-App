import asyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import generateToken from "../utils/genToken.js";
// @desc Auth user/set token
// route POST /api/users/auth
// @access Public

const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth User" });
});

// @desc Register User
// route POST /api/users/auth
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return res.status(400).json({
      message: "User not registered",
    });
  }
  res.status(200).json({ message: "Register User" });
});

// @desc Logout user
// route POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Register User" });
});
// @desc Get user profile
// route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Profile" });
});
// @desc Update user profile
// route PUT /api/users/profile/
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update User Profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
