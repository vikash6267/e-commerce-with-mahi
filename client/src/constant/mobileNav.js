import { IoHomeOutline } from "react-icons/io5";
import { IoShirt } from "react-icons/io5";
import { FaRegHeart,FaUser  } from "react-icons/fa";


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
        path : "/allProduct"
    },
    {   
        id :3,
        title : "Whislist",
        icon : <FaRegHeart className=" text-lg"  />,
        path : "/wishlist"
    },    {   
        id :4,
        title : "Profile",
        icon : <FaUser  className=" text-lg"  />,
        path : "/profile"
    },
 
];
