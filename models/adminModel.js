const User = require("./userModels");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the UserModel
    required: true,
    unique: true, // Ensure only one admin document exists
  },

  isadmin: {
    type: Boolean,
    default: true, // Set the default value to true for admin records
  },
});

const AdminModel = mongoose.model("admins", adminSchema);

module.exports = AdminModel;