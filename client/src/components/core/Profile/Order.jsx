import React, { useEffect, useState } from 'react';
import { getAllOrder } from "../../../serivces/operations/order";
import { useSelector } from 'react-redux';
import { FaTruck, FaMoneyBillAlt } from 'react-icons/fa';

function Order() {
    const [orders, setOrders] = useState([]);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchAllOrders = getAllOrder(); // This returns a function
                const res = await fetchAllOrders(token); // Call the returned function to fetch orders
                setOrders(res);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchData();
    }, [token]);

    // Function to format price to INR currency
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
    };

    return (
        <div className='flex flex-col'>
            <div className='w-full flex justify-center text-2xl font-bold p-2 border-b-2'>
                <h2>Your Orders</h2>
            </div>

         {
            orders.length === 0 ? <div className=' text-center text-2xl mt-10'>No Order Found</div> : 
            <div className="container mx-auto">
                {orders.map(order => (
                    <div key={order._id} className="my-4 p-4 border border-gray-300 rounded shadow-md">
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600">Order ID: {order.order_id}</span>
                            <span className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Shipping Information:</h3>
                            <p>{order.shippingInfo.name}</p>
                            <p>{order.shippingInfo.address}</p>
                            <p>{order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pincode}</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Order Items:</h3>
                            <ul className="list-disc pl-4">
                                {order.orderItems.map(item => (
                                    <li key={item._id} className="flex items-center">
                                        <img src={item.product.images[0].url} alt={item.product.name} className="w-12 h-12 object-cover rounded-full mr-2" />
                                        <span>{item.product.title} - Quantity: {item.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 flex items-center">
                                <FaMoneyBillAlt className="mr-2" />Total Price: {formatPrice(order.totalPrice)}
                            </span>
                            {/* <span className="text-gray-600 flex items-center">
                                <FaTruck className="mr-2" />Payment Status: {order.orderStatus}
                            </span> */}
                        </div>
                    </div>
                ))}
            </div>
         }
        </div>
    );
}

export default Order;
