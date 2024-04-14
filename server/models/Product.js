const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Category",
    },
    tag: {
      type: [String],
      required: true,
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
      
        url: String,
      },
    ],
    color: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color" }],
    sizes: [{
      size: {
        type: [String],
        required: true
      },
      // stock: {
      //   type: Number,
      //   required: true,
      //   default: 0
      // }
    }],


    ratings: [
      {
        star: Number,
        comment: String,
        imaggeUrl:String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
