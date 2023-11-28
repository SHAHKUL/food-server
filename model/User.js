const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("userdatas", Schema);
module.exports = User;
