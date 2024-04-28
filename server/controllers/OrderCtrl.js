const instance = require ("../config/razorpay")
const Order = require("../models/Order")
const asyncHandler = require("express-async-handler");

const capturePayment = async (req, res) => {
  const { amount } = req.body;
try{

    const option = {
        amount: amount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
      };
   
        // Initiate the payment using Razorpay
        const paymentResponse = await instance.orders.create(option)
        console.log(paymentResponse)
        res.json({
          success: true,
          data: paymentResponse,
        })
      } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ success: false, message: "Could not initiate order." })
      }


};

const paymentVerification = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
  
    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")
  
    if (expectedSignature === razorpay_signature) {
      
      return res.status(200).json({ success: true, message: "Payment Verified" })
    }
  
    return res.status(200).json({ success: false, message: "Payment Failed" })
};


const createOrder = asyncHandler(async (req, res) => {
    const {
      shippingInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      paymentInfo,
    } = req.body;
    const { _id } = req.user;
    try {
      const order = await Order.create({
        shippingInfo,
        orderItems,
        totalPrice,
        totalPriceAfterDiscount,
        paymentInfo,
        user: _id,
      });
      return res.status(200).json({
        success: true,
        message : "Order Succlefully Placed",
        data: order,
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          })
      throw new Error(error);
    }
  });


  
module.exports = {
    capturePayment,
  paymentVerification,
  createOrder
};
