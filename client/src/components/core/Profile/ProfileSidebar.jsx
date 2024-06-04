import React, { useEffect } from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { logout } from "../../../serivces/operations/user";

import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
  MdLocationOn,
  MdCreditCard,
  MdShare,
  MdPassword
} from "react-icons/md";

import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    console.log(user);
  }, []);

  const logoutHandler = () => {
    dispatch(logout(navigate))
  };

  return (
    <div className="sm:w-[40px] md:w-[120px]   ">
      <div className="bg-gray-300 flex flex-col rounded pt-6 pl-2 ">
        <MenuItem
          icon={<RxPerson size={20} />}
          name="Profile"
          number={1}
          setActive={setActive}
          active={active}
        />
        <MenuItem
          icon={<HiOutlineShoppingBag size={20} />}
          name="Orders"
          number={2}
          setActive={setActive}
          active={active}
        />
        <MenuItem
          icon={<MdLocationOn size={20} />}
          name="Address"
          number={3}
          setActive={setActive}
          active={active}
        />
        <MenuItem
          icon={<MdCreditCard size={20} />}
          name="My Credit"
          number={4}
          setActive={setActive}
          active={active}
        />
        <MenuItem
          icon={<MdOutlineTrackChanges size={20} />}
          name="Track Order"
          number={5}
          setActive={setActive}
          active={active}
        />
        <MenuItem
          icon={<MdShare size={20} />}
          name="Refer & Earn"
          number={6}
          setActive={setActive}
          active={active}
        />
        <MenuItem
          icon={<MdPassword size={20} />}
          name="Change Password"
          number={7}
          setActive={setActive}
          active={active}
        />
   
   <div
        className=" flex items-center cursor-pointer w-full mb-8"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 hidden sm:flex ${
            active === 8 ? "text-[red]" : ""
          } `}
        >
          Log out
        </span>
      </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, name, number, setActive, active }) => {
  return (
    <div
      className={`flex items-center cursor-pointer w-full mb-8 ${
        active === number ? "text-red" : ""
      }`}
      onClick={() => setActive(number)}
    >
      <div className="flex items-center">
        <div className="">{icon}</div>
        <span className="pl-3 hidden sm:flex">{name}</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
