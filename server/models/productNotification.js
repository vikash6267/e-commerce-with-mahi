const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: String,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", notificationSchema);
