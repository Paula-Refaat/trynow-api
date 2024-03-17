const {
  signup,
  login,
  getUsers,
  protect,
  allowTo,
  deleteUser,
  updateLoggedUserPassword,
} = require("../services/authServices");

const {
  loginValidator,
  signupValidator,
  changeLoggedUserPasswordValidator,
} = require("../utils/validators/authValidator");

const router = require("express").Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.get("/getAll", protect, allowTo("admin"), getUsers);
router.delete("/deleteUser/:id", protect, allowTo("admin"), deleteUser);
router.put(
  "/changePassword",
  protect,
  allowTo("admin"),
  changeLoggedUserPasswordValidator,
  updateLoggedUserPassword
);

module.exports = router;
