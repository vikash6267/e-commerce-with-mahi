const Product = require("../models/Product");
const slugify = require("slugify");
const validateMongoDbId = require("../utills/validateMongoDbId");
const Category = require("../models/Category")
const Notification = require("../models/productNotification");
const productStock = require("../mails/productStock");
const mailSender = require("../utills/mailSender");

// Controller to create a new product
exports.createProduct = async (req, res) => {
  try {
    // Extracting data from the request body
    const {
      title,
      description,
      price,
      category,
      sizes, // Expecting an array of size-quantity objects
      fabric,
      highPrice,
      gsm,
      washingInstructions,
      printing,
      gender,
    } = req.body;

    const imagesArray = JSON.parse(req.body.images);
    const sizeArray = JSON.parse(sizes); // Parsing the sizes array to handle sizes with quantities
    const genderArray = JSON.parse(gender);

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !sizes || // Ensure sizes are provided
      !fabric ||
      !gsm ||
      !washingInstructions ||
      !printing ||
      !gender ||
      !imagesArray
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    // Calculate total quantity
    const totalQuantity = sizeArray.reduce((acc, size) => acc + (size.quantity || 0), 0);

    // Creating a new product object
    const newProduct = await Product.create({
      title,
      slug: slugify(title),
      description,
      price,
      category: categoryDetails._id,
      sizes: sizeArray, // Use the parsed sizeArray directly
      gender: genderArray,
      fabric,
      highPrice: highPrice || 0,
      gsm,
      washingInstructions,
      printing,
      quantity: totalQuantity, // Store the total quantity
      images: imagesArray,
    });

    res.status(200).json({
      success: true,
      data: newProduct,
      message: "Product Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};






// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      sizes,
      quantity,
      fabric,
      gsm,
      washingInstructions,
      printing,
      gender,
    } = req.body;


 
    const imagesArray = JSON.parse(req.body.images) ;
    const sizeArray = JSON.parse(sizes);
    const genderArray = JSON.parse(gender);

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !sizes || // Ensure sizes are provided
      !fabric ||
      !gsm ||
      !washingInstructions ||
      !printing ||
      !gender ||
      !imagesArray
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.body.id,
      {
        title,
       description,
        price,
        category: categoryDetails._id,
        sizes:sizeArray,
        gender :genderArray,
        quantity,
        fabric,
        gsm,
        washingInstructions,
        printing,
        images: imagesArray,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }



// Notify users about the size availability
const availableSizes = sizeArray.map(sizeObj => sizeObj.size);

// Find notifications for the updated product and available sizes
const notifications = await Notification.find({
  product: updatedProduct._id,
  size: { $in: availableSizes },
});

if (notifications.length > 0) {
  await Promise.all(notifications.map(async (notification) => {
    const emailBody = productStock({
      size: notification.size,
      title: updatedProduct.title,
      photo: updatedProduct.images[0]?.url, // Assuming first image for simplicity
      price: updatedProduct.price,
      _id:updatedProduct._id
    });

    await mailSender(notification.email, `Good News! Size ${notification.size} is Back in Stock!`, emailBody);
  }));

  // Optionally remove notifications after sending emails
  // await Notification.deleteMany({
  //   product: updatedProduct._id,
  //   size: { $in: availableSizes }
  // });
}












    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.body;
  try {
    // Check if the product exists
    const product = await Product.findByIdAndDelete(productId);
    
   
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Delete the product
    await product.remove();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getAllProduct = async (req, res) => {
  try {
    const allProduct = await Product.find().populate("category").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: allProduct,
    });
  } catch (error) {
    console.error("Error fetching products:", error); // Optional: Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching products.",
    });
  }
};



exports.getProductDetails = async (req, res) => {
  try {
    const { productID } = req.body;
    validateMongoDbId(productID);
    const productDetails = await Product.findOne({
      _id: productID,
    });

  
    // .populate("ratingAndReviews").exec()

    if (!productDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${productID}`,
      });
    }

    productDetails.view = (productDetails.view || 0) + 1;
    await productDetails.save();

    return res.status(200).json({
      success: true,
      data: {
        productDetails,
      },
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.notifi = async (req, res) => {
  const { email, size, productId } = req.body;

  try {
    // Check if a notification with the same email, size, and product already exists
    const existingNotification = await Notification.findOne({ email, size, product: productId });

    if (existingNotification) {
      // If a notification already exists, respond with a message
      return res.status(400).send({ message: 'You have already requested to be notified for this size.' });
    }

    // Save new notification request to the database
    const notification = new Notification({ email, size, product: productId });
    await notification.save();

    // Optionally, send an email to confirm receipt (not shown here)

    res.status(200).send({ message: 'Notification request received' });
  } catch (error) {
    console.error('Error saving notification:', error);
    res.status(500).send({ error: 'Failed to save notification' });
  }
};