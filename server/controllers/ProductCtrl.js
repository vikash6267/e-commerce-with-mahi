const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utills/validateMongoDbId");


// exports.createProduct = asyncHandler(async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       price,
//       category,
//       quantity,
//       images,
//       color,
//       sizesWithStock,
//       tag:_tag,
//     } = req.body;

//     // Convert the tag  from stringified Array to Array
//     const tag = JSON.parse(_tag);
//     console.log("tag", tag)

//     if (
//       !title ||
//       !description ||
//       !price ||
//       // !category ||
//       !quantity ||
//       !images ||
//       // !color ||
//       !sizesWithStock ||
//       !tag.length 
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All Fields are Mandatory",
//       });
//     }

//     const slug = slugify(req.body.title);
  
//        // Create a new course with the given details
//        const newProduct = await Product.create({
//         title,
//         slug,
//         description,
//         price,
//         category,
//         quantity,
//         images,
//         color,
//         sizes : sizesWithStock.map(({ size, stock }) => ({ size, stock })),
//         tag,
//       })

//        // Return the new Product and a success message
//     res.status(200).json({
//         success: true,
//         data: newProduct,
//         message: "Product Created Successfully",
//       })
//   } catch (error) {
//     res.status(500).json({
//         success: false,
//         message: "Failed to create product",
//         error: error.message,
//       })
//     throw new Error(error);
   
//   }
// });


exports.editProduct = asyncHandler(async (req, res) => {
    try{
        const { productID } = req.body
        const updates = req.body
        const product = await Product.findById(productID)

        if (!product) {
            return res.status(404).json({ error: "product not found" })
          }

          for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
              if (key === "tag" ) {
                product[key] = JSON.parse(updates[key])
              } else {
                product[key] = updates[key]
              }
            }
          }

    await Product.save()

    const updatedProduct = await Product.findOne({
        _id: productID,
      })
        .populate("ratings")
        .populate("category")
        .populate("color")
        .populate("size")
        .exec()

        res.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
          })
    }catch(error){
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to Product course",
          error: error.message,
        })
    throw new Error(error);

    }
} )



exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params ;
  console.log("id ha" ,id)
  validateMongoDbId(id);
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product Deleted successfully",
      data: deletedProduct,
    })
  } catch (error) {
    console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to Delte Product ",
          error: error.message,
        })
    throw new Error(error);
  }
 } )






exports.createProduct = asyncHandler(async (req, res) => {
  try {
    
    const {
      title,
      description,
      price,
      category,
      quantity,
      images,
      color,
      sizes,
      tag,
    } = req.body;

  
    // Convert the tag from stringified Array to Array
    // const tag = JSON.parse(_tag);


    console.log(    
      // title,
    //   description,
    //   price,
    //   category,
      quantity,
      images,
      color,
      sizes,
      tag
      )

    if (
      !title ||
      !description ||
      !price ||
      !quantity ||
      !images ||
      !sizesWithStock ||
      !tag.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    const slug = slugify(req.body.title);
  
    // Create a new product with the given details
    const newProduct = await Product.create({
      title,
      slug,
      description,
      price,
      category,
      quantity,
      images,
      color,
      sizes : sizes.map(({ size }) => ({ size })),
      tag,
    });

    // Return the new Product and a success message
  return  res.status(200).json({
      success: true,
      data: newProduct,
      message: "Product Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
     throw new Error(error);
  }
});
