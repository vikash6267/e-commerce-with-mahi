const Coupon = require("../models/Coupon");

// Create a new coupon
exports.createCoupon = async (req, res) => {
  console.log(req.body)
  let { name, expiry, discount, discountType } = req.body;

  // Convert name to uppercase
  name = name.toUpperCase();

  // Validate discountType
  const validDiscountTypes = ['percentage', 'fixed'];
  if (!validDiscountTypes.includes(discountType)) {
    return res.status(400).json({
      success: false,
      message: "Invalid discount type. Must be 'percentage' or 'fixed'."
    });
  }

  try {
    const newCoupon = new Coupon({ name, expiry, discount, discountType });
    await newCoupon.save();
    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: newCoupon,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get a coupon by name
exports.getCouponByName = async (req, res) => {
  const { name } = req.body;

  try {
    const coupon = await Coupon.findOne({ name: name.toUpperCase() });
    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }
    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.status(200).json({
      success: true,
      data: coupons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Delete a coupon by name
exports.deleteCouponByName = async (req, res) => {
  const { name } = req.params;
  console.log(req.params)

  try {
    const coupon = await Coupon.findByIdAndDelete(name);
    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};
