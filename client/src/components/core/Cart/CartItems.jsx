import React from 'react';
import { TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../slices/cartSlice';
import QuantityBox from './QuantityBox';
import { displayMoney } from '../../../helper/utills';

const CartItems = ( props) => {
    const dispatch = useDispatch();
    const { _id, images, title,  price, highPrice} = props.product;
    const{quantity,size} = props;
     
    const newPrice = displayMoney(price);
    const oldPrice = displayMoney(highPrice);

    return (
        <div className="cart_item grid grid-cols-[0.25fr,0.8fr] gap-12  py-4 items-center border-b-2 w-11/12 mx-auto">
            <figure className="w-[130px] h-full">
                <Link to={`/product/${_id}`} className='h-[1220px]'>
                    <img src={images[0].url} alt="product-img min-h-[1220px]"  />
                </Link>
            </figure>
            <div className="cart_item_info flex flex-col gap-3">
                <div className="cart_item_head flex items-center justify-between">
                    <h4 className="cart_item_title">
                        <Link to={`/product/${_id}`} className='text-xl font-montserrat font-bold'>{title}</Link>
                    </h4>
                    <div className="cart_item_del relative group flex lg:mr-10">
                        <span onClick={() => dispatch(removeFromCart(_id))} className="cursor-pointer group-hover:text-red-500 text-xl">
                            <TbTrash />
                        </span>
                        <div className="hidden group-hover:block absolute top-[30px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded w-[86px]">
                            Remove Item
                        </div>
                    </div>
                </div>
                <h2 className="cart_item_price font-bold text-lg leading-6">
                    {newPrice} &nbsp;
                    <small><del>{oldPrice}</del></small>
                </h2>
                <div className='font-montserrat text-base font-semibold'>
                    Size: <span className='font-bold'>{size}</span>
                </div>
                <QuantityBox itemId={_id} itemQuantity={quantity} />
            </div>
        </div>
    );
};

export default CartItems;
