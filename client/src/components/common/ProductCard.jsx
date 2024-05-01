import React from "react";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helper/utills";
import "./ProductCard.css";

function ProductCard({ products }) {
  const {
    _id,
    title,
    description,
    price,
    sizes,
    images,
    } = products;
    const truncatedDescription = description.length > 25 ? description.substring(0, 25) + "..." : description;

 
  const newPrice = displayMoney(price);
  const oldPrice = displayMoney(price);
  return (
    <div className="card products_card font-montserrat  ">
      <figure className="products_img ">
        <Link
          to={`/product/${_id}`}
          className="flex  justify-center items-center"
        >
          <div className="flex justify-center items-center">
            <div className="relative flex justify-center items-center">
              <img
                src={images[0].url}
                alt={title}
                className=" transition duration-1000 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              />
              <img
                src={images[1].url}
                alt={title}
                className=" absolute top-0 left-0 opacity-0 transition duration-1000 ease-in-out transform hover:opacity-100"
              />
            </div>
          </div>
        </Link>
      </figure>

      
      <div className="products_details">
        {/* <span className="rating_star">
          {[...Array(totalrating)].map((_, i) => (
            <IoMdStar key={i} />
          ))}
        
        </span> */}
        <h3 className="products_title">
          <Link to={`/product/${_id}`} className=" font-bold text-xl">{title}</Link>
        </h3>
        <h5 className="products_info text-base w-full">{truncatedDescription}</h5>



       
        <div className=" ">
        
          <ul className="flex  gap-3 mt-3 font-bold text-sm">
            {sizes.map((size, index) => (
              <li key={index}>{size}</li>
            ))}
          </ul>
        </div>
        <div className="w-0 bg-white  transition-all origin-left"></div>
      


        <div class="my-4 border-t border-gray-600"></div>

        <h2 className="products_price font-bold">
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
