const { Schema, model } = require("mongoose");

const TeamSchema = new Schema(
  {
    name: {
      type: String,
    },
    rating: {
      type: Number,
    },
    shield: {
      type: String,
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Team", TeamSchema);
