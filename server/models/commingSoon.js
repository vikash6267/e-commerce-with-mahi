const mongoose = require("mongoose");

const commingSoon = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Commingsoon", commingSoon);
