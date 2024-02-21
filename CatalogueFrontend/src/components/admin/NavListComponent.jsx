import React from "react";
import { IoMdPricetags } from "react-icons/io";
import { GiClothes } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const icons = {
  Products: GiClothes,
  Tags: IoMdPricetags,
};

function NavListComponent({ name, to }) {
  //   const IconComponent = icons[name];
  return (
    <>
      <li>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
              isActive ? "border-indigo-500" : ""
            }`
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            {/* <IconComponent /> */}
          </span>

          <span className="ml-2 text-sm tracking-wide truncate">{name}</span>
        </NavLink>
      </li>
    </>
  );
}

export default NavListComponent;
