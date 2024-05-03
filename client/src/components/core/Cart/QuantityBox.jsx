import React, { useContext } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import {increanQuantity,decreaseQuantity} from "../../../slices/cartSlice"
import { useDispatch } from 'react-redux';

const QuantityBox = (props) => {

    const { itemId, itemQuantity } = props;
const dispatch = useDispatch()
    


    return (
        <>
            <div className=" bg-green-100 lg:w-[20%] flex items-center justify-center">
              <div className=' border-2 flex items-center'>
              <button
                    type="button"
                    onClick={() => dispatch(decreaseQuantity(itemId))}
                    className='p-2 border-2 bg-blue-200 '
                >
                    <FaMinus />
                </button>
                <span className="p-2 font-bold">
                    {itemQuantity}
                </span>
                <button
                    type="button"
                    onClick={() => dispatch(increanQuantity(itemId))}
                    // disabled={itemQuantity >= 5}
                    className='p-2 border-2 bg-blue-200'
                >
                    <FaPlus />
                </button>
              </div>
            </div>
        </>
    );
};

export default QuantityBox;