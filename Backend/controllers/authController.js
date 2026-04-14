import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role, address, farmDetails } = req.body;

  console.log('📝 Register attempt:', { email, name });

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  if (!phone || !/^\d{10}$/.test(phone)) {
    res.status(400);
    throw new Error('Please provide a valid 10-digit phone number');
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: role || 'buyer',
    address: address || {},
    farmDetails: farmDetails || {},
  });

  if (user) {
    console.log('✅ User registered:', user.email);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      farmDetails: user.farmDetails,
      isVerified: user.isVerified,
      isActive: user.isActive,
      createdAt: user.createdAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log('🔐 Login attempt:', { email });

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    console.log('❌ User not found:', email);
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const isPasswordMatch = await user.matchPassword(password);
  console.log('Password match:', isPasswordMatch);

  if (user && isPasswordMatch) {
    if (!user.isActive) {
      console.log('❌ Account deactivated:', email);
      res.status(401);
      throw new Error('Your account has been deactivated. Please contact support.');
    }

    console.log('✅ Login successful:', user.email);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profileImage: user.profileImage,
      address: user.address,
      farmDetails: user.farmDetails,
      isVerified: user.isVerified,
      isActive: user.isActive,
      createdAt: user.createdAt,
      token: generateToken(user._id),
    });
  } else {
    console.log('❌ Invalid credentials for:', email);
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    
    if (req.body.farmDetails) {
      user.farmDetails = { ...user.farmDetails, ...req.body.farmDetails };
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      profileImage: updatedUser.profileImage,
      address: updatedUser.address,
      farmDetails: updatedUser.farmDetails,
      isVerified: updatedUser.isVerified,
      isActive: updatedUser.isActive,
      createdAt: updatedUser.createdAt,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Upload profile image
// @route   POST /api/auth/upload-image
// @access  Private
export const uploadProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image file provided');
  }

  const user = await User.findById(req.user._id);
  user.profileImage = req.file.path;
  await user.save();

  res.json({ message: 'Image uploaded successfully', imageUrl: req.file.path });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  const user = await User.findById(req.user._id).select('+password');
  
  if (user && (await user.matchPassword(currentPassword))) {
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } else {
    res.status(401);
    throw new Error('Current password is incorrect');
  }
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    res.status(404);
    throw new Error('No user found with this email');
  }
  
  res.json({ message: 'Password reset link sent to your email' });
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  
  // Find user by reset token (simplified)
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() }
  });
  
  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }
  
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  
  res.json({ message: 'Password reset successful' });
});