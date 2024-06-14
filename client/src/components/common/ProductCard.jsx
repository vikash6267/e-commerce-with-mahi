import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helper/utills";
import "./ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

function ProductCard({ products }) {
  useEffect(() => {
    AOS.init({ duraction: 2000, once: true });
  }, []);
  const { _id, title, description, price, highPrice, sizes, images } = products;
  const truncatedDescription =
    description.length > 25
      ? description.substring(0, 25) + "..."
      : description;

  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleAddToCart = (products) => {
    dispatch(addToCart({ products }));
  };

  const newPrice = displayMoney(price);
  const oldPrice = displayMoney(highPrice);
  return (
    <div className=" font-montserrat flex flex-col gap-0  " data-aos="zoom-in">
      <figure className=" ">
        <Link
          to={`/product/${_id}`}
          className="flex  justify-center items-center"
        >
          <div className="flex justify-center items-center">
            <div className="relative flex justify-center items-center">
              <img
                src={images[0]?.url}
                alt={title}
                className=" transition duration-1000 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              />
              <img
                src={images[1]?.url}
                alt={title}
                className=" absolute top-0 left-0 opacity-0 transition duration-1000 ease-in-out transform hover:opacity-100"
              />
            </div>
          </div>
        </Link>
      </figure>

      <div className=" -space-y-2 ">
      
        <h3 className="">
          <Link
            to={`/product/${_id}`}
            className=" text-gray-700 lg:text-[13px] text-[12px] "
          >
            {title}
          </Link>
        </h3>
     

        <h2 className="  flex text-[12px] lg:text-[13px]  sm:text-xl md:text-xl xs:text-sm justify-between">
          {newPrice} &nbsp;
          <small>
            <del className=" text-red-600">{oldPrice}</del>
          </small>
        </h2>

     
      </div>
    </div>
  );
}

export default ProductCard;
