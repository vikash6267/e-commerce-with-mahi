import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addAddress } from "../../../serivces/operations/user.js";
import { IoClose } from "react-icons/io5"; // Changed the icon import
import styles from "./styles.js";
import { AddressIcon, CheckIcon } from "../../../constant/svgIcons";
import { Link } from "react-router-dom";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");

  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.profile);
  const {  token } = useSelector((state) => state.auth);

  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const handleDefaultAddressChange = () => {
    setIsDefaultAddress(!isDefaultAddress); // Toggle the state of default address
  };

  useEffect(()=>{
console.log(user)
  },[])

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !city || !zipCode || !address ) {
      toast.error("Please fill all the required fields!");
    } else {
      try {
        const addressData = {
          city,
          zipCode,
          state,
          phone,
          address: address,
          isDefault: isDefaultAddress,
        };

        await dispatch(addAddress(addressData, token));

        setOpen(false);
        resetFormFields();
      } catch (error) {
        console.error("Error adding address:", error);
        toast.error("Failed to add address. Please try again later.");
      }
    }
  };

  const resetFormFields = () => {
    setCountry("");
    setCity("");
    setZipCode("");
    setAddress("");
    setAddressType("");
  };

  const handleDelete = (address) => {
    // Add logic to delete address
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-white rounded shadow-lg p-6">
            <div className="flex justify-end">
              <IoClose
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-2xl font-bold mb-4">
              Add New Address
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div></div>
              <div>
                <label htmlFor="zipCode" className="block">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full border rounded p-2"
                  placeholder="Enter Zip Code"
                />
              </div>
              <div>
                <label htmlFor="city" className="block">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border rounded p-2"
                  placeholder="Enter City"
                />
              </div>

              <div>
                <label htmlFor="state" className="block">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full border rounded p-2"
                  placeholder="Enter State"
                />
              </div>

              <div>
                <label htmlFor="address" className="block">
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded p-2"
                  placeholder="Enter Full Address (House No. Area etc.)"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block">
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border rounded p-2 "
                  placeholder="Enter Phone Number"
                />
              </div>

              <div className='flex gap-1 items-center'>
          <input
            type="checkbox"
            id='isDefault'
            checked={isDefaultAddress} // Bind checked state to the state variable
            onChange={()=> setIsDefaultAddress(!isDefaultAddress)} // Handle click event
          />
          <label htmlFor="isDefault">Save As Default Address</label>
        </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`${styles.button} px-4 py-2 bg-blue-500 text-white rounded-md`}
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-700">My Addresses</h1>
        <div
          className={`${styles.button} bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer`}
          onClick={() => setOpen(true)}
        >
          Add New
        </div>
      </div>
      <br />
      {user && (
  <div className="a-list">
    {user.addresses
      .slice() // Create a shallow copy of the addresses array
      .sort((a, b) => b.isDefault - a.isDefault) // Sort addresses to place default first
      .map((address, index) => (
        <Link
          to={`/dashboard/address/edit/${address._id}`}
          key={index}
          className="block"
        >
          <div className="flex items-center mb-3 address-box">
            <div className="mx-3">
              <AddressIcon />
            </div>
            <div className="flex-1 p-3 lg:p-4">
              {address.isDefault ? (
                <div className="flex items-center justify-between mb-2">
                  <h4 className="mb-0 mr-2 truncate">
                    Default Delivery Address
                  </h4>
                  <CheckIcon className="text-green" />
                </div>
              ) : (
                <h4 className="mb-0">Delivery Address</h4>
              )}
              <p className="mb-2 address-desc">
                {`${address?.address} ${address?.city}, ${address?.country}, ${address?.zipCode}`}
              </p>
            </div>
          </div>
        </Link>
      ))}
  </div>
)}



      {user && user.addresses.length === 0 && (
        <p className="text-gray-700">You have not saved any addresses.</p>
      )}
    </div>
  );
};

export default Address;
