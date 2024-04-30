import React from 'react'
import { MobileLinks } from "../../constant/mobileNav";
import { Link } from 'react-router-dom';
function MobileMenu() {
  return (
    <div style={{ zIndex: -1 }}>

            <div className="w-full border-2 p-2 lg:hidden sm:hidden md:hidden">
        <ul className="w-11/12 mx-auto flex justify-between">
          {MobileLinks.map((link) => (
            <li key={link.id}>
              <Link to={link.path}>
                <div className="flex flex-col items-center font-semibold">
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