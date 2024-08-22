import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { createCoupon, fetchCoupons, deleteCoupon } from "../serivces/operations/product";
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

function Coupons() {
  const [openCreate, setCreate] = useState(false);
  const{token,sessionID} = useSelector(state=>state.profile)
  const [couponsList, setCouponsList] = useState([]);
  const [coupon, setCoupon] = useState({
    name: "",
    expiry: "",
    discount: 0,
    discountType: "percentage", // or "fixed"
  });

  const todayDate = new Date().toISOString().split('T')[0];


  useEffect(() => {
    const fetchCouponsList = async () => {
      try {
        const response = await fetchCoupons();
        setCouponsList(response || []); // Ensure response is an array
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCouponsList();
  }, []);

  const handleCreateCoupon = async () => {
    try {
      await createCoupon(coupon, token,sessionID);
      const response = await fetchCoupons();
      setCouponsList(response || []);
      // setCreate(false);
      // setCoupon({ name: "", expiry: "", discount: 0, discountType: "percentage" });
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCoupon(id, token);
      setCouponsList((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete coupon:", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto p-4">
      <div className="text-center text-2xl font-semibold underline mb-4">
        <h4>Coupons</h4>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setCreate(!openCreate)}
          className="flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none"
        >
          <FaPlusCircle /> Create Coupon
        </button>
      </div>

      <div className={`transition-wrapper ${openCreate ? 'open' : ''}`}>
        {openCreate && (
          <div className="mb-4 p-4 border rounded-lg">
            <h5 className="text-xl font-semibold mb-2">Create Coupon</h5>
            <input
              type="text"
              placeholder="Name"
              value={coupon.name}
              onChange={(e) =>
                setCoupon({ ...coupon, name: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded focus:outline-none"
            />
          <input
            type="date"
            placeholder="Expiry Date"
            value={coupon.expiry}
            onChange={(e) =>
              setCoupon({ ...coupon, expiry: e.target.value })
            }
            min={todayDate}
            className="w-full mb-2 p-2 border rounded focus:outline-none"
          />
            <input
              type="number"
              placeholder="Discount"
              value={coupon.discount}
              onChange={(e) =>
                setCoupon({ ...coupon, discount: parseFloat(e.target.value) })
              }
              className="w-full mb-2 p-2 border rounded focus:outline-none"
            />
            <select
              value={coupon.discountType}
              onChange={(e) =>
                setCoupon({ ...coupon, discountType: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded focus:outline-none"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
            <button
              onClick={handleCreateCoupon}
              className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
            >
              Create
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Expiry Date</th>
              <th className="py-3 px-6 text-left">Discount</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {couponsList.map((coupon) => (
              <tr key={coupon._id} className="hover:bg-gray-100">
                <td className="py-4 px-6">{coupon.name || "N/A"}</td>
                <td className="py-4 px-6">
  {coupon.expiry ? format(new Date(coupon.expiry), 'MMM dd, yyyy') : "N/A"}
</td>
                <td className="py-4 px-6">{coupon.discount || "0"}</td>
                <td className="py-4 px-6">{coupon.discountType || "N/A"}</td>
                <td className="py-2 px-6 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Coupons;
