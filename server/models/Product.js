const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema
(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    highPrice: {
      type: Number,
      // required: true,
    },
    view: {
      type: Number,
      // required: true,
      default:0
    },

    
    fabric: {
      type: String,
      // required: true,
    },
    gsm: {
      type: String,
      // required: true,
    },
    washingInstructions : {
      type: String,
      // required: true,
    },
    printing : {
      type: String,
      // required: true,
    },
    sizes: [{
      type: String,
      required: true
    }],
    gender: [{
      type: String,
      required: true
    }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Category",
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],



    ratingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],

  },
  { timestamps: true }
);


//Export the model
module.exports = mongoose.model("Product", productSchema);