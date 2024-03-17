const { check } = require("express-validator");
const User = require("../../models/userModel");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.signupValidator = [
  check("name")
    .notEmpty()
    .withMessage("User Required")
    .isLength({ min: 3 })
    .withMessage("Too short user name"),
  check("email")
    .notEmpty()
    .withMessage("email Required")
    .isEmail()
    .withMessage("invalid email address")
    .toLowerCase()
    .custom((val) =>
      User.findOne({ email: val }).then((email) => {
        if (email) {
          throw new Error("E-mail already registered before");
        }
      })
    ),
  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email reauired")
    .isEmail()
    .withMessage("invalid email address"),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Too short password"),
  validatorMiddleware,
];

exports.changeLoggedUserPasswordValidator = [
  check("confirmPassword")
    .notEmpty()
    .withMessage("Please enter your new password confirm"),
  check("newPassword")
    .notEmpty()
    .withMessage("Please enter your new password")
    .custom(async (val, { req }) => {
      // 1)verify current password
      const user = await User.findById(req.user._id);
      if (!user) {
        throw new Error("User not found");
      }
      // 2)verify  password confrim
      if (val !== req.body.confirmPassword) {
        throw new Error("password does not match");
      }
      return true;
    }),
  validatorMiddleware,
];
