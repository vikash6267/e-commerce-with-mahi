import { IoHomeOutline } from "react-icons/io5";
import { IoShirt } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
export const MobileLinks = [
    {   
        id :1,
        title : "Home",
        icon : <IoHomeOutline  className=" text-lg" />,
        path : "/"
    },
    {   
        id :2,
        title : "Shop",
        icon : <IoShirt className=" text-lg"  />,
        path : "/all-product"
    },
    {   
        id :3,
        title : "Whislist",
        icon : <FaRegHeart className=" text-lg"  />,
        path : "/wishlist"
    },    {   
        id :4,
        title : "Bag",
        icon : <FaBagShopping className=" text-lg"  />,
        path : "/all-product"
    },
 
];
