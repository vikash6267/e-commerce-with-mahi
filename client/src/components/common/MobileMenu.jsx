import React from 'react'
import { MobileLinks } from "../../constant/mobileNav";
import { Link } from 'react-router-dom';
function MobileMenu() {
  return (
    <div style={{ zIndex: 100 }} className='bg-white w-full'>


{/*  */}

            <div className="w-[100vw] border-2 p-2  z-50  lg:hidden sm:hidden md:hidden">
            <ul className="w-11/12 mx-auto flex justify-between z-50 ">
          {MobileLinks.map((link) => (
            <li key={link.id}>
              <Link to={link.path}>
                <div className="flex flex-col items-center font-semibold z-50">
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