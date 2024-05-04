import React, { useState, useEffect } from "react";
import { fetchProductDetails } from "../serivces/operations/product";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { displayMoney, calculateDiscount } from "../helper/utills";
import useActive from "../hooks/useActive";
import RatingStars from "../components/common/RatingStars";
import GetAvgRating from "../helper/avgRating";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { IoIosAdd,IoIosRemove  } from "react-icons/io";

import { MdOutlineLocalShipping } from "react-icons/md";
import {addToCart} from "../slices/cartSlice"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux";
import Error from "./Error";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { productID } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const { handleActive, activeClass } = useActive(0);
    const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1);


  
  
  const handleSizeClick = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };
  const handlePreviewImg = (images, i) => {
    setPreviewImg(images[i].url);
    handleActive(i);
  };


  // Calculating Avg Review count
  const [avgReviewCount, setAvgReviewCount] = useState(12);
  useEffect(() => {
    const count = GetAvgRating(product?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [product]);

   // handling Add-to-cart
   const handleAddItem = () => {

        if(selectedSize === null){
            toast.error("please Select The Size")
            return;
        }
    dispatch(addToCart({products:product, quantity,size:selectedSize}));
  
  };

  function increaseQuantityHandler() {
    if (product.stock <= quantity) {
      return;
    }

    setQuantity((prv) => prv + 1);
  }

  function deceraseQuantityHandler() {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prv) => prv - 1);
  }

  useEffect(() => {
    // Calling fetchProductDetails fucntion to fetch the details
    (async () => {
      try {
        setLoading(true);
        const res = await fetchProductDetails(productID);
        // console.log("Product details res: ", res);
     
        if(res.data !== undefined){
        setProduct(res?.data?.productDetails);
        console.log(res?.data?.productDetails?.images[0].url);
        setPreviewImg(res?.data?.productDetails?.images[0].url);
       } 
       setLoading(false);
     
      } catch (error) {
       
        console.log("Could not fetch Course Details");
        setLoading(false);
      }
    })();
  }, [productID]);




  if (loading || !product) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>


      </div>
      
    );
  }

      // calculating Prices

  const discountedPrice = product?.highPrice - product?.price;
  const newPrice = product ? displayMoney(product.price) : 0;
  const oldPrice = product ? displayMoney(product.highPrice) : 0;
  const savedPrice = displayMoney(discountedPrice);
  const savedDiscount = calculateDiscount(discountedPrice, product?.price);




  return (
    <div className="prodcutDetialsContainer min-w-screen">
      <section className="section" id="product_details">
        <div className="product_container">
          <div className="wrapper prod_details_wrapper">
            {/*=== Product Details Left-content ===*/}
            <div className="prod_details_left_col">
              <div className="prod_details_tabs">
                {product.images &&
                  product.images.map((img, i) => (
                    <div
                      key={i}
                      className={`tabs_item ${activeClass(i)}`}
                      onClick={() => handlePreviewImg(product.images, i)}
                    >
                      <img src={img.url} alt="product-img" />
                    </div>
                  ))}
              </div>
              <figure className="prod_details_img">
                <img src={previewImg} alt="product-img" />
              </figure>
</div>
              {/*=== Product Details Right-content ===*/}
              <div className="prod_details_right_col_001">
                <h1 className="prod_details_title">{product.title}</h1>
                <h4 className="prod_details_info">
                  {product.description && product.description}
                </h4>

                <div className="text-sm flex flex-wrap items-center gap-2 prod_details_ratings">
                  <span className="text-yellow-25">{avgReviewCount}</span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                  {/* <span>{`(${ratingAndReviews.length} reviews)`}</span> */}
                </div>

                <div className="prod_details_price">
                  <div className="price_box">
                    <h2 className="price">
                      {newPrice} &nbsp;
                      <small className="del_price">
                        <del>{oldPrice}</del>
                      </small>
                    </h2>
                    <p className="saved_price">
                      You save: {savedPrice} ({savedDiscount}%)
                    </p>
                    <span className="tax_txt">(Inclusive of all taxes)</span>
                  </div>

                  <div className=" ">
                    {product.quantity >= 1 ? (
                      <span className="instock">
                        <MdOutlineDone /> In Stock
                      </span>
                    ) : (
                      <span className="outofstock">
                        <IoClose />
                        Out of stock
                      </span>
                    )}
                  </div>
                </div>
                <div className="seprator2"></div>

                <div className="productDescription">
                  <div className="productDiscriptiopn_text">
                    <h4>Descripition :</h4>
                    <p>{product.description}</p>
                  </div>
                  <div>
                    <div>
                      <h2>Select Size:</h2>
                      <div>
                        {product.sizes?.map((size) => (
                          <Button
                            key={size}
                            variant={
                              size === selectedSize ? "contained" : "outlined"
                            }
                            color="primary"
                            onClick={() => handleSizeClick(size)}
                            style={{ margin: "5px" }}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="deliveryText">
                    <MdOutlineLocalShipping />
                    We deliver! Just say when and how.
                  </div>
                </div>
                <div className="seprator2"></div>


                <div className="prod_details_additem">
                      <h5>QTY :</h5>
                      <div className="additem">
                        <button
                          onClick={deceraseQuantityHandler}
                          className="additem_decrease"
                        >
                          <IoIosRemove  />
                        </button>
                        <input
                          readOnly
                          type="number"
                          value={quantity}
                          className="input"
                        />
                        <button
                          onClick={increaseQuantityHandler}
                          className="additem_increase"
                        >
                          <IoIosAdd  />
                        </button>
                      </div>

                      <Button
                        variant="contained"
                        className="prod_details_addtocart_btn"
                        onClick={handleAddItem}
                        disabled={product.stock <= 0 }
                      >
                        Add to cart 
                      </Button>
                    </div>

              </div>
            </div>
          </div>
       
      </section>
    </div>
  );
}

export default ProductDetails;
