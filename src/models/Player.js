const { Schema, model } = require("mongoose");

const PlayerSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    shortname: {
      type: String,
    },
    age: {
      type: Number,
    },
    country: {
      type: String,
    },
    pos1: {
      type: String,
    },
    pos2: {
      type: String,
    },
    pos3: {
      type: String,
    },
    altura: {
      type: String,
    },
    peso: {
      type: String,
    },
    rating: {
      type: Number,
    },
    potential: {
      type: Number,
    },
    value: {
      type: String,
    },
    salary: {
      type: String,
    },
    releaseclause: {
      type: String,
    },
    team: {
      type: String,
    },
    foot: {
      type: String,
    },
    skills: {
      type: String,
    },
    weakfoot: {
      type: String,
    },
    reputation: {
      type: String,
    },
    pic: {
      type: String,

    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Player", PlayerSchema);
