const mongoose = require("mongoose");

const terrainSchema = new mongoose.Schema(
  {
   Id: {
      type: String,
    },
   Name: {
      type: String,
      required: [true, "first name is required"],
    },
    taille : {
      type: String,
      required: [true, ],
    },
    type_surface: {
      type: String,
      required: [true],
    },
    équipements_disponibles:{
      type: String,
      required: [false],
    },
   
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "wrok timing is required"],
    },
  },
  { timestamps: true }
);

const terrainModel = mongoose.model("terrains", terrainSchema);
module.exports = terrainModel;
