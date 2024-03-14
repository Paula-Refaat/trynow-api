const { check } = require("express-validator");

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
    .toLowerCase(),
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
