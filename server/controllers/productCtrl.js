const Product = require("../models/Product");
const slugify = require("slugify");


// Controller to create a new product
exports.createProduct = async (req, res) => {
  try {
    // Extracting data from the request body
    const { title, description, price, category, sizes, quantity, images } =
      req.body;

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !sizes ||
      !quantity ||
      !images
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    // Creating a new product object
    const newProduct = await Product.create({
      title,
      slug: slugify(title),
      description,
      price,
      category,
      sizes,
      quantity,
      images,
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


exports.getAllProduct = async (req, res)=>{
    try {
        const allProduct = await Product.find()
        res.status(200).json({
          success: true,
          data: allProduct,
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
}


