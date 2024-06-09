import React from 'react'
import { MobileLinks } from "../../constant/mobileNav";
import { Link, useLocation, matchPath } from 'react-router-dom';
function MobileMenu() {

    const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div style={{ zIndex: 100 }} className='bg-white w-full'>


{/*  */}

            <div className="w-[100vw] border-2 p-2  z-50  lg:hidden sm:hidden md:hidden ">
            <ul className="w-11/12 mx-auto flex justify-between z-50 ">
          {MobileLinks.map((link) => (
            <li key={link.id}>
              <Link to={link.path}>
              <div className={`flex flex-col items-center  z-50 ${
    matchRoute(link?.path) ? 'text-yellow-500 font-semibold text-xl ' : 'text-richblack-100'
}`}>
    {link.icon}
    <p>{link.title}</p>
</div>

              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MobileMenu