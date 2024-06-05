// Import the Mongoose library
const mongoose = require("mongoose");

// Define the address schema
const addressSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    virtualMoney: [{
      date:Date,
      money: String,
      message:String,
      
    }],
    totalCredit:{
      type:Number,
      default:0
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactNumber: {
      type: Number,
      trim: true,
    },
    referralCode:{
      type: String,

    },
    referralBy:{
      type: String,

    },
    network:[{
     id:String,
     referralCode:String
    }],
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Customer", "Admin"],
      default: "Customer",
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    image: {
      type: String,
    },
    OTPLogin: {
      type: Number,
    },

    wishlist:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }
    ]
      ,
    
    addresses: [addressSchema], // Array of addresses
  },
  { timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("User", userSchema);
