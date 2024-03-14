const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name required"],
    minLength: [3, "Too short user name"],
  },
  email: {
    type: String,
    required: [true, "email Required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: [6, "Too short password"],
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// userSchema.pre("save", function (next) {
//   this.password = bcrypt.hashSync(this.password, 12);
//   next();
// });

module.exports = mongoose.model("User", userSchema);
