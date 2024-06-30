const Product = require("../models/Product");
const slugify = require("slugify");
const validateMongoDbId = require("../utills/validateMongoDbId");
const Category = require("../models/Category")
// Controller to create a new product
exports.createProduct = async (req, res) => {
  try {
    // Extracting data from the request body
    const {
      title,
      description,
      price,
      category,
      sizes,
      quantity,
      fabric,
      highPrice,
      gsm,
      washingInstructions,
      printing,
      gender,
    } = req.body;

    const imagesArray = JSON.parse(req.body.images);
    const sizeArray = JSON.parse(sizes);
    const genderArray = JSON.parse(gender);

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !sizes ||
      !quantity ||
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

    // Creating a new product object
    const newProduct = await Product.create({
      title,
      slug: slugify(title),
      description,
      price,
      category: categoryDetails._id,
      sizes:sizeArray,
      gender :genderArray,
      quantity,
      fabric,
      highPrice:highPrice || 0,
      gsm,
      washingInstructions,
      printing,
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


    console.log(req.body)
    const imagesArray = JSON.parse(req.body.images) ;
    const sizeArray = JSON.parse(sizes);
    const genderArray = JSON.parse(gender);

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !sizes ||
      !quantity ||
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
        slug: slugify(title),
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
    const allProduct = await Product.find().populate("category");
    res.status(200).json({
      success: true,
      data: allProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
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

    productDetails.view = (productDetails.views || 0) + 1;
    await productDetails.save();

    return res.status(200).json({
      success: true,
      data: {
        productDetails,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
