const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor

const adminSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
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
          password: {
        type: String,
        required: true,
      },

      active: {
        type: Boolean,
        default: true,
      },
      token: {
        type: String,
      },role:{
        type: String,
        // enum: ["Customer", "Admin"],
        default: "Admin",
        required: true,
      },
     image: {
        type: String,
      },
      failedAttempts: {
        type: Number,
        default: 0,
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      blockUntil: {
        type: Date,
      },
  
           
      
    },
    { timestamps: true }
  );
  
  // Export the Mongoose model for the user schema, using the name "user"
  module.exports = mongoose.model("Admin", adminSchema);
  