const {
  signup,
  login,
  getUsers,
  protect,
  allowTo,
} = require("../services/authServices");

const {
  loginValidator,
  signupValidator,
} = require("../utils/validators/authValidator");

const router = require("express").Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.get("/getAll", protect, allowTo("admin"), getUsers);

module.exports = router;
