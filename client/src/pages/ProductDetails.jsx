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
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import NotificationModal from "../components/core/Product Details/Notification";
import { MdOutlineLocalShipping } from "react-icons/md";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToWish,
  removeFromWish,
  fetchWishlist,
} from "../serivces/operations/product";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import Error from "./Error";
import SizeSelectionModal from "../components/core/AllProduct.jsx/SizeSelect";
import ImageSlider from "../components/core/Product Details/ImageSlider";
import Details from "../components/core/Product Details/Details";
import ProductCard from "../components/common/ProductCard";
function ProductDetails() {

  const [product, setProduct] = useState(null);
  const [alsoLike, setAlsoLike] = useState([]);

  const [loading, setLoading] = useState(false);
  const { productID } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const { handleActive, activeClass } = useActive(0);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const { wishlistProduct } = useSelector((state) => state.wishlist);

  const { token } = useSelector((state) => state.auth);
  const { allProduct } = useSelector((state) => state.product);

  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle showing/hiding the modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  //
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // useEffect(()=>{
  // console.log("Redux Wishlist",wishlistProduct)
  // },[])

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const res = await fetchWishlist(token, dispatch);
        console.log("hello");

        // console.log(res.wishlist)
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (token) {
      fetchWishlistData();
    }
  }, [token, removeFromWish, addToWish]);

  const handleAddToWishlist = async (productId, token) => {
    if (!token) {
      Swal.fire({
        title: "Please login to add to wishlist",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    addToWish(productId, token, dispatch);
    setWishlistLoading(true);
  };

  const handleRemoveFromWishlist = async (productId, token) => {
    removeFromWish(productId, token, dispatch);
    setWishlistLoading(true);
  };

  const selectRandomProducts = (products) => {
    if (!Array.isArray(products)) {
      console.error("Products is not an array");
      return [];
    }

    // Create a shallow copy of the products array
    const productsCopy = products.slice();

    // Fisher-Yates shuffle algorithm
    for (let i = productsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [productsCopy[i], productsCopy[j]] = [productsCopy[j], productsCopy[i]];
    }

    // Select the first four products from the shuffled array
    return productsCopy.slice(0, 4);
  };




  const [selectedUnavailableSize, setSelectedUnavailableSize] = useState(null);

  const handleSizeClick = (size) => {
    if (product.sizes.includes(size)) {
      setSelectedSize(size === selectedSize ? null : size);

    } else {
      setSelectedUnavailableSize(size);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUnavailableSize(null);
  };

 
let selectedProducts
  // Calculating Avg Review count
  const [avgReviewCount, setAvgReviewCount] = useState(12);
  useEffect(() => {
    const count = GetAvgRating(product?.ratingAndReviews);
    selectedProducts = selectRandomProducts(allProduct);
    setAlsoLike(selectedProducts)
    setAvgReviewCount(count);
  }, [product]);

  // handling Add-to-cart
  const handleAddItem = () => {
    if (selectedSize === null) {
      // toast.error("please Select The Size")
      toggleModal();
      return;
    }
    dispatch(addToCart({ products: product, quantity, size: selectedSize }));
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
    const isProductAvailble = allProduct.find((item) => item._id === productID);

    if (isProductAvailble) {
      setProduct(isProductAvailble);
      setPreviewImg(isProductAvailble?.images[0].url);
      // console.log(isProductAvailble)
    } else {
      (async () => {
        try {
          setLoading(true);
          const res = await fetchProductDetails(productID);
          // console.log("Product details res: ", res);

          if (res.data !== undefined) {
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
    }
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

  const isProductInWishlist = wishlistProduct.some(
    (item) => item._id === product._id
  );

  const WishlistButton = () => {
    if (isProductInWishlist) {
      handleRemoveFromWishlist(product._id, token);
    } else {
      handleAddToWishlist(product._id, token);
    }
  };

  return (
    <div className="prodcutDetialsContainer min-w-screen mb-[200px] ">
      <section className="w-screen " id="product_details">
        <div className="">
          <div className="wrapper prod_details_wrapper lg:w-11/12 mx-auto">
            {/*=== Product Details Left-content ===*/}
            <div className="lg:w-[50%] md:w-[50%] w-screen">
              <ImageSlider slides={product?.images} />
            </div>
            {/*=== Product Details Right-content ===*/}
            <div className="prod_details_right_col_001">
              <div className="">
                <div className=" space-y-2 flex min-w-screen items-center flex-col lg:block">
                  <h1 className=" uppercase text-xl min-w-screen font-semibold  ">
                    {product.title}
                  </h1>
                  <h4 className="">
                    {/* {product.description && product.description} */}

                    <h2 className="price">
                    INR. {product.price} &nbsp;
                    <small className="del_price">
                      <del className=" text-red-500">{oldPrice}</del>
                    </small>
                  </h2>

                  
                  </h4>
                </div>

                {/* <div>
  {isProductInWishlist ? (
    <div className="flex items-center">
      <FaHeart
        onClick={() => handleRemoveFromWishlist(product._id, token)}
        className="text-red-500 bg-white rounded-full p-1 cursor-pointer mr-1 hover:text-red-600 hover:bg-red-100 transition-colors duration-300"
      />
      <span 
        className="text-red-500 bg-white rounded-full p-1 cursor-pointer hover:text-red-600 hover:bg-red-100 transition-colors duration-300" 
        onClick={() => handleRemoveFromWishlist(product._id, token)}
      >
        Remove From Wishlist
      </span>
    </div>
  ) : (
    <div className="flex items-center">
      <FaRegHeart
        onClick={() => handleAddToWishlist(product._id, token)}
        className="bg-red-500 text-white rounded-full p-1 cursor-pointer mr-1 hover:bg-red-600 transition-colors duration-300"
      />
      <span 
        className="bg-red-500 text-white rounded-full p-1 cursor-pointer hover:bg-red-600 transition-colors duration-300" 
        onClick={() => handleAddToWishlist(product._id, token)}
      >
        Add To Wishlist
      </span>
    </div>
  )}
</div> */}
              </div>

              {/* <div className="text-sm flex flex-wrap items-center gap-2 prod_details_ratings">
                  <span className="text-yellow-25">{avgReviewCount}</span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                  <span>{`(${ratingAndReviews.length} reviews)`}</span>
                </div> */}

              <div className="prod_details_price">
                <div className="price_box">
                  {/* <h2 className="price">
                    {newPrice} &nbsp;
                    <small className="del_price">
                      <del>{oldPrice}</del>
                    </small>
                  </h2> */}
                  {/* <p className="saved_price">
                    You save: {savedPrice} ({savedDiscount}%)
                  </p>
                  <span className="tax_txt">(Inclusive of all taxes)</span> */}
                </div>

                {/* <div className="flex items-center min-w-screen  ">
                  {product.quantity >= 1 ? (
                    <span className="instock flex items-center">
                      <MdOutlineDone /> In Stock
                    </span>
                  ) : (
                    <span className="outofstock">
                      <IoClose />
                      Out of stock
                    </span>
                  )}
                </div> */}
              </div>
              {/* <div className="seprator2"></div> */}

              <div className=" flex flex-col  items-center mt-2 lg:block">
                {/* <div className="productDiscriptiopn_text">
                    <h4>Descripition :</h4>
                    <p>{product.description}</p>
                  </div> */}
                <div>
                  <div>
                    {/* <h2>Select Size:</h2> */}
                    <div>
      <div className="flex flex-wrap gap-3">
        {allSizes.map((size) => (
          <div
            key={size}
            onClick={() => handleSizeClick(size)}
            className={`px-2 py-1 rounded border cursor-pointer ${
              size === selectedSize ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            } ${product.sizes.includes(size) ? 'border-gray-500' : 'border-red-500'}`}
          >
            {product.sizes.includes(size) ? (
              size
            ) : (
              <del className="text-red-500">{size}</del>
            )}
          </div>
        ))}
      </div>
      {isModalOpen && <NotificationModal closeModal={closeModal} size={selectedUnavailableSize} />}
    </div>




                  </div>
                </div>
                {/* <div className="deliveryText">
                  <MdOutlineLocalShipping />
                  We deliver! Just say when and how.
                </div> */}
              </div>
              <div className="seprator2"></div>

              <div className="prod_details_additem mt-2">
                <h5>QTY :</h5>
                <div className="additem">
                  <button
                    onClick={deceraseQuantityHandler}
                    className="additem_decrease"
                  >
                    <IoIosRemove />
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
                    <IoIosAdd />
                  </button>
                </div>

              


              
              </div>

          

              <div className=" mt-4 text-wrap flex rounded-xl text-center justify-center flex-col gap-4">
                <button className="p-2 bg-gray-600 rounded-xl text-white   onClick={WishlistButton} flex items-center  justify-center gap-3 "   onClick={WishlistButton}>  
                
                <FaHeart
                  className={` text-[22px] ${
                    isProductInWishlist ? "text-red-600" : "text-gray-200"
                  }  `}
                
                />
                {
                  isProductInWishlist ? "Remove From Wishlist" : "Add To WishList"
                }
                </button>

                {/* <button
                  variant="contained"
                  className="p-2 bg-gray-600 rounded-xl text-white"
                  onClick={handleAddItem}
                  disabled={product.stock <= 0}
                >
                  Add to cart
                </button> */}
                {
                selectedSize === null ?   <button
                  className=" p-2 px-16 rounded-2xl  text-gray border-black border"
                  onClick={handleAddItem}
                  disabled={product.stock <= 0}
                >
                 Selcte Size <span className=" text-[10px]">For Add To cart</span>
                </button> :   <button
                  className=" p-2 px-16 rounded-2xl bg-gray-900 text-white"
                  onClick={handleAddItem}
                  disabled={product.stock <= 0}
                >
                  Add To Cart
                </button>
              }
                  </div>



<div className=" min-h-[200px]"> 
  <Details product={product}></Details>
</div>








            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <SizeSelectionModal
          sizes={product.sizes}
          onSelectSize={handleSizeClick}
          onClose={toggleModal}
          handleAddItem={handleAddItem}
          stock={product.stock <= 0}
        />
      )}

      {/* for Mobile  */}
      {/* <div className="fixed bottom-0 z-40 h-[50px] ">
        <div style={{ zIndex: 100 }} className="bg-white w-full">
        

          <div className="w-[100vw] border-2 p-2  z-50  lg:hidden sm:hidden md:hidden flex justify-between  items-center">
         
            <div className=" w-11/12 mx-auto flex justify-between items-center">
         
              <div>
                <FaHeart
                  className={` text-[27px] ${
                    isProductInWishlist ? "text-red-600" : "text-gray-900"
                  }  `}
                  onClick={WishlistButton}
                />
              </div>


              <div>

              
                <button
                  className=" p-2 px-16 rounded-2xl bg-gray-900 text-white"
                  onClick={handleAddItem}
                  disabled={product.stock <= 0}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className=" lg:mt-[100px]">
<div className=" flex items-center justify-between w-11/12 mx-auto mt-[10px] ">
          <p className=" font-semibold text-[12px]">YOU MAY ALSO LIKE </p>


          <Link
              to="/allProduct"
              className=""
            >
              <div
                to="/allProduct"
                className=" text-[12px] border-2 text-black p-1 px-3 rounded-md"
              >
                Discover More
              </div>

              {/* <IoShirtSharp className=" text-blue-600" /> */}
            </Link>

        </div>
<div className="  w-11/12 mx-auto  grid lg:grid-cols-4 gap-4 sm:grid-cols-3 md:grid-cols-3 xs:grid-cols-2 grid-cols-2 mt-[20px]">
              {allProduct &&
                alsoLike.map((product) => (
                  <ProductCard key={product._id} products={product} />
                ))}
            </div>
</div>
    </div>
  );
}

export default ProductDetails;
