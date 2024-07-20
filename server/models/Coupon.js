const mongoose = require("mongoose");


const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

couponSchema.methods.isExpired = function() {
  return this.expiry < new Date(); // Returns true if expiry date is in the 
};


couponSchema.methods.isExpired = function() {
  return this.expiry < new Date();
};


couponSchema.methods.applyDiscount = function(originalPrice) {
  if (this.discountType === 'percentage') {
    return originalPrice - (originalPrice * (this.discount / 100));
  } else if (this.discountType === 'fixed') {
    return originalPrice - this.discount;
  }
  return originalPrice;
};
//Export the model
module.exports = mongoose.model("Coupon", couponSchema);
