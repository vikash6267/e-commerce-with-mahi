// const instance = require ("../config/razorpay")
const Order = require("../models/Order")
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid');
const Product = require("../models/Product")
const { instance } = require("../config/razorpay")
const mailSender = require("../utills/mailSender")
const crypto = require("crypto")


const Coupon = require("../models/Coupon")
const User = require("../models/User")

// const capturePayment = async (req, res) => {
//   const { products } = req.body;
// try{

//     const option = {
//         amount: amount * 100,
//         currency: "INR",
//         receipt: Math.random(Date.now()).toString(),
//       };
   
//         // Initiate the payment using Razorpay
//         const paymentResponse = await instance.orders.create(option)
//         console.log(paymentResponse)
//         res.json({
//           success: true,
//           data: paymentResponse,
//         })
//       } catch (error) {
//         console.log(error)
//         res
//           .status(500)
//           .json({ success: false, message: "Could not initiate order." })
//       }


// };




const capturePayment = async (req, res) => {
  const { products, coupon, absenceCoinuse } = req.body;
  console.log(req.body)
  const { id } = req.user;

  try {
    // Check if user ID exists
    if (!id) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Fetch user details including totalCredit (coins)
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // console.log("User:", user);

    // Calculate maximum allowable coin usage (20% of total amount or available coins, whichever is lower)
    let total_amount = 0;
    for (const item of products) {
      const product_id = item.product._id;
      let product;

      try {
        // Find the product by its ID
        product = await Product.findById(product_id);

        // If the product is not found, return an error
        if (!product) {
          return res.status(404).json({ success: false, message: `Product with ID ${product_id} not found` });
        }

        // Add the price of the product to the total amount
        total_amount += product.price;
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    // console.log("Total amount before discount:", total_amount);

    // Apply coupon discount if provided
    if (coupon) {
      const couponValue = await Coupon.findOne({ name: coupon.toUpperCase() });
      if (couponValue) {
        total_amount -= couponValue.discount;
        console.log("Total amount after coupon discount:", total_amount);
      }
    }
    console.log(absenceCoinuse)

    // Calculate maximum coin usage
    const maxCoinUsage = Math.min(total_amount * 0.2, Number(user.totalCredit));



    // Validate absenceCoinUse
    if (absenceCoinuse > maxCoinUsage) {
      return res.status(400).json({
        success: false,
        message: `You can use up to ${maxCoinUsage} coins only (${total_amount * 0.2} of total amount).`
      });
    }

    // Update total_amount after deducting absenceCoinUse
    total_amount -= absenceCoinuse;


  


    
    
    // Prepare payment options
    const options = {
      amount: total_amount * 100, // Amount in paise (multiplied by 100)
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
    };

    // Initiate payment using your preferred gateway (e.g., Razorpay)
    const paymentResponse = await instance.orders.create(options);
    console.log("Payment Response:", paymentResponse);
   
    if (absenceCoinuse > 0) {
      user.totalCredit -= absenceCoinuse;
      user.virtualMoney.push({
        date: new Date(),
        money: -absenceCoinuse.toString(),
        message: `Deducate ${absenceCoinuse} coins for  Use In Order.`,
    });
      await user.save();
      console.log(`Deducted ${absenceCoinuse} coins. Updated totalCredit: ${user.totalCredit}`);
   
    }
    // Send success response with payment data
    res.json({
      success: true,
      data: paymentResponse,
    });

  } catch (error) {
    console.error("Capture Payment Error:", error);
    res.status(500).json({ success: false, message: "Could not initiate order." });
  }
};


const paymentVerification = async (req, res) => {
  console.log("enter verify")
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const product = req.body?.products
    const address = req.body?.address
    const payable = req.body?.payable
  
  const userId = req.user.id

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")
  
      if (expectedSignature === razorpay_signature) {
        try {
          // Call the createOrder function
          await createOrder(product, userId, address, razorpay_order_id, razorpay_payment_id, payable, res);
      
          // Send the response after the order is successfully created
          return res.status(200).json({ success: true, message: "Payment Verified" });
        } catch (error) {
          // Handle any errors that occur during order creation
          console.error("Error creating order:", error);
          return res.status(500).json({ success: false, message: "Error creating order" });
        }
      }
      
  
    return res.status(200).json({ success: false, message: "Payment Failed" })
};


// const createOrder = asyncHandler(async (req, res) => {
//     const {
//       shippingInfo,
//       orderItems,
//       totalPrice,
//       totalPriceAfterDiscount,
//       paymentInfo,
//     } = req.body;
//     const { _id } = req.user;
//     try {
//       const order = await Order.create({
//         shippingInfo,
//         orderItems,
//         totalPrice,
//         totalPriceAfterDiscount,
//         paymentInfo,
//         user: _id,
//       });
//       return res.status(200).json({
//         success: true,
//         message : "Order Succlefully Placed",
//         data: order,
//       })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//           })
//       throw new Error(error);
//     }
//   });





const createOrder = asyncHandler(async (products, userId, address, razorpay_order_id, razorpay_payment_id,payable, res) => {
  const userDetails = await User.findById(userId);
console.log(payable)
  const {
    billingCity,
    billingPincode,
    billingState,
    billingCountry,
    billingAddress,
    billingPhone
  } = address;


  const email = userDetails.email;

  try {
    // const orders = [];
    // for (const product of products) {
    //   const orderId = uuidv4();
    //   const order = await Order.create({
    //     user: userId,
    //     shippingInfo: {
    //       name: userDetails.name, // assuming user has a name field
    //       address: billingAddress,
    //       city: billingCity,
    //       state: billingState,
    //       pincode: billingPincode,
    //     },
    //     paymentInfo: {
    //       razorpayOrderId: razorpay_order_id,
    //       razorpayPaymentId: razorpay_payment_id,
    //     },
    //     orderItems: [
    //       {
    //         product: product.product._id,
    //         size: product.size,
    //         quantity: product.quantity,
    //       }
    //     ],
    //     totalPrice: product.product.price * product.quantity,
    //     orderStatus: "Ordered",
    //   });
    //   orders.push(order);
    // }
      const orderId = uuidv4();

    const order = await Order.create({
      order_id: orderId, // Provide order_id
      shipment_id: 123, // Example shipment_id
      user: userId,
      shippingInfo: {
              name: userDetails.name, // assuming user has a name field
              address: billingAddress,
              city: billingCity,
              state: billingState,
              pincode: billingPincode,
            },
      paymentInfo: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      },
      orderItems: products.map(item => ({
        product: item.product._id,
        size: item.size, // Size as string
        quantity: item.quantity,
      })),
      totalPrice: payable, // Update with actual total price
    });





    const coinToAdd = Math.floor(payable * 0.0667);
    userDetails.totalCredit += coinToAdd
    // Add the calculated amount as coins for the user
    userDetails.virtualMoney.push({
        date: new Date(),
        money: coinToAdd.toString(),
        message: `Earned ${coinToAdd} coins for  order.`,
    });

    for (const product of products) {
      if (product.refer) {
          const referringUser = await User.findOne({ referralCode: product.refer });
          if (referringUser) {
              const randomCoins = Math.floor(Math.random() * 71); // Generate random coins between 0 and 70
              referringUser.totalCredit += randomCoins;
              referringUser.virtualMoney.push({
                  date: new Date(),
                  money: randomCoins.toString(),
                  message: `Earned ${randomCoins} coins for referring a purchase by ${userDetails.name}.`,
              });
              await referringUser.save();
          }
      }
    }
    await userDetails.save()



    for (const item of products) {
      const product = await Product.findById(item.product._id);
      if (!product) {
        throw new Error(`Product with ID ${item.product._id} not found`);
      }

      product.sold += item.quantity;
      product.quantity -= item.quantity;

      if (product.quantity < 0) {
        throw new Error(`Not enough stock for product with ID ${item.product._id}`);
      }

      await product.save();
    }




    const orders = await Order.find({ user: userId }).exec();
    
    if (orders.length === 1 && userDetails.referralBy !== null) {
        const referringUser = await User.findById(userDetails.referralBy);

        console.log(referringUser);

        if (!referringUser) {
            throw new Error("Referring user not found");
        }

        // Add 25 credits to the referring user
        referringUser.totalCredit += 25;

        // Add virtualMoney entry for the referring user
        const currentDate = new Date();
        referringUser.virtualMoney.push({
            date: currentDate,
            money: "25",
            message: ` earned 25 credits for referring ${userDetails.name} on their 1st order.`,
        });

        await referringUser.save();
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

  // Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}






const getAllOrder = async(req,res)=>{
  try {

    const userId = req.user.id

    if(!userId){
      return res.status(401).json({
        success: false,
        message: `User is not Found`,
      })
    }
    
    const orders = await Order.find({ user: userId })
    .populate({
        path: 'orderItems.product',
        model: 'Product',
    })
    .exec();

console.log('Populated Orders:', orders);

    return res.status(200).json({
      orders,
success: true,
message: `Fetch Orders Successfully`,
})

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Error During fetch order`,
    })
  }
}

module.exports = {
    capturePayment,
  paymentVerification,
  createOrder,
  getAllOrder
};
