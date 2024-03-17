const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/ApiError");
const UserAuthorization = require("../utils/UserAuthorization");
const createToken = require("../utils/createToken");

const User = require("../models/userModel");

// @desc    User Register
// @route   POST /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1- create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
  });
  res.status(201).json({ data: user });
});

// @desc    User Login
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || req.body.password !== user.password) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({ role: "user" });
  res.status(200).json({ data: users });
});

// @desc  make sure the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  const userAuthorization = new UserAuthorization();

  const token = userAuthorization.getToken(req.headers.authorization);
  const decoded = userAuthorization.tokenVerifcation(token);
  const currentUser = await userAuthorization.checkCurrentUserExist(decoded);

  req.user = currentUser;
  next();
});

//@desc  Authorization (User Permissions)
exports.allowTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("you are not allowed to access this router", 403)
      );
    }
    next();
  });

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ApiError(`No user found with id ${req.params.id}`, 404));
  }
  res.status(204).json();
});

exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  //update user password passed on user payload (req.user._id)
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: req.body.newPassword,
    },
    {
      new: true,
    }
  );
  //genrate token
  const token = createToken(req.user._id);

  res.status(200).json({ data: user, token });
});
