import React, { useState, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import styles from "./styles";
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.profile);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.contactNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="grid w-11/12 mx-auto lg:mr-28 -ml-0 overflow-x-hidden gap-20">
      <div className="flex justify-center w-full mt-14">
        <div className="relative">
          <img
            src={`${user?.image}`}
            className="w-[150px] h-[150px] rounded-full object-cover border-4 border-green-500"
            alt="Profile"
          />
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer absolute bottom-1 right-1">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <label htmlFor="image">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} aria-required={true} className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-52 right-6 lg:top-48 lg:right-20 m-4 bg-tr"
          >
            {isEditing ? <ImCross size={25} /> : <FaEdit size={25} />}
          </button>
          <div className="w-full">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              className={`${styles.input} w-full h-14 p-3 text-sm`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="w-full">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              className={`${styles.input} w-full h-14 p-3 text-sm`}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="w-full">
            <label className="block pb-2">Phone Number</label>
            <input
              type="tel"
              className={`${styles.input} w-full h-14 p-3 text-sm`}
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
        {isEditing && (
          <div className="flex ">
            <input
              className="w-64 h-10 border border-blue-500 text-center text-blue-500 rounded-md mt-8 cursor-pointer mb-20"
              value="Update"
              type="submit"
              disabled={!isEditing}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileContent;
