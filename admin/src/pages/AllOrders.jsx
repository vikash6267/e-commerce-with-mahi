import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../serivces/operations/admin';

function AllOrders() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await getAllOrders();
        setOrders(response || []);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">Order ID</th>
                            <th className="py-2 px-4 border-b">User</th>
                            <th className="py-2 px-4 border-b">Product Image</th>
                            <th className="py-2 px-4 border-b">Product</th>
                            <th className="py-2 px-4 border-b">Size</th>
                            <th className="py-2 px-4 border-b">Quantity</th>
                            <th className="py-2 px-4 border-b">Total Price</th>
                            <th className="py-2 px-4 border-b">Order Status</th>
                            <th className="py-2 px-4 border-b">Order Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <React.Fragment key={order._id}>
                                {order.orderItems.map((item, index) => (
                                    <tr key={item._id} className=' my-4 '>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={order.orderItems.length} className="py-2 px-4 border-b">
                                                    {order.order_id}
                                                </td>
                                                <td rowSpan={order.orderItems.length} className="py-2 px-4 border-b">
                                                    {order.user?.name} ({order.user?.email})
                                                </td>
                                            </>
                                        )}
                                        <td className="py-2 px-4 border-b">
                                            <img
                                                src={item.product?.images[0]?.url} // Adjust according to your data structure
                                                alt={item.product?.title}
                                                className="h-16 w-16 object-cover"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">{item.product?.title}</td>
                                        <td className="py-2 px-4 border-b">{item.size}</td>
                                        <td className="py-2 px-4 border-b">{item.quantity}</td>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={order.orderItems.length} className="py-2 px-4 border-b">
                                                    {order.totalPrice}
                                                </td>
                                                <td rowSpan={order.orderItems.length} className="py-2 px-4 border-b">
                                                    {order.orderStatus}
                                                </td>
                                                <td rowSpan={order.orderItems.length} className="py-2 px-4 border-b">
                                                    {new Date(order.createdAt).toLocaleString()}
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllOrders;