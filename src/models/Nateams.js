const { Schema, model } = require("mongoose");

const NateamSchema = new Schema(
  {
    name: {
      type: String,
    },
    rating: {
      type: Number,
    },
    flag: {
      type: String,

    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Nateam", NateamSchema);
