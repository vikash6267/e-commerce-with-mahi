import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ProfileContent = () => {
  const { user, error, successMessage } = useSelector((state) => state.profile);
  const [avatar, setAvatar] = useState(user?.image);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, dispatch]);

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <img
            src={avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
          />
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm font-medium">Full Name</label>
          <p className="mt-1 text-lg font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg p-3">
            {user?.name || "N/A"}
          </p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm font-medium">Email Address</label>
          <p className="mt-1 text-lg font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg p-3">
            {user?.email || "N/A"}
          </p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm font-medium">Phone Number</label>
          <p className="mt-1 text-lg font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg p-3">
            {user?.contactNumber || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
