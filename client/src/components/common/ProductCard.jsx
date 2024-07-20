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
    <Link
    to={`/product/${_id}`}
    key={_id}
    data-aos="zoom-in-down"
  >
    <div className="flex flex-col gap-3 mt-2">
      <div className="h-full min-w-[10rem] overflow-hidden relative">
        <img
          src={images[0]?.url}
          alt=""
          className="object-cover  w-full transition duration-500 ease-in-out transform hover:-translate-y-1"
        />
        <img
          src={images[1]?.url}
          alt=""
          className="object-cover h-full w absolute top-0 left-0 opacity-0 transition duration-500 ease-in-out transform hover:opacity-100"
        />
      </div>
      <div>
        <p className="font-montserrat lg:text-lg text-gray-600 text-[13px]">
          {title}
        </p>
        <p className="font-montserrat lg:text-sm text-gray-600 text-[12px]">
          {" "}
          {displayMoney(price)}
        </p>
        {/* <div className="flex gap-2 text-[11px] text-red-500">
          {sizes?.map((size, index) => (
            <div key={index} className="relative ">
              {size}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  </Link>
  );
}

export default ProductCard;
