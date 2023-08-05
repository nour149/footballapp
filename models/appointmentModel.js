const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    Id: {
      type: String,
      required: true,
    },
    
      userInfo: {
        type: Array,
        required: true,
      },
      terrainInfo:{
        type: Array,
        required: true,
      },
      adminInfo:{
      type:String,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel;