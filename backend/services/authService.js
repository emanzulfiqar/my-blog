const jwt = require("jsonwebtoken");
const User = require("../models/User");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });


  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};


const loginUser = async (credentials) => {
  const { email, password } = credentials;

  
  const user = await User.findByEmail(email).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }


  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};


const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};


const updateUserProfile = async (userId, updateData) => {
  const { name, email } = updateData;
  const updateFields = {};

  if (name) updateFields.name = name;
  if (email) {
   
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new Error("Email is already taken by another user");
    }

    updateFields.email = email.toLowerCase();
  }

  const user = await User.findByIdAndUpdate(userId, updateFields, {
    new: true,
    runValidators: true,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserProfile,
};
