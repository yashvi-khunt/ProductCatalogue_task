import React from "react";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { IoClose, IoPersonCircleOutline } from "react-icons/io5";
import NavListComponent from "./NavListComponent";
const navItems = [
  {
    name: "Product",
    slug: "/admin/product",
  },
  {
    name: "Tag",
    slug: "/admin/tag",
  },
];

function NavToggle({ onClose }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-500 bg-opacity-75">
      <div className="fixed inset-y-0 left-0 flex max-w-full pr-10">
        <div className="flex h-full flex-col bg-white shadow-xl overflow-y-scroll min-w-80">
          <div className="flex items-start justify-between px-4 py-6 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Product Catalogue
            </h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Close panel</span>
              <IoClose />
            </button>
          </div>

          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              {navItems.map((item) => (
                <NavListComponent
                  key={item.name}
                  name={item.name}
                  to={item.slug}
                />
              ))}
              <li>
                <button
                  className="relative w-full flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  onClick={handleLogout}
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <IoPersonCircleOutline />
                  </span>

                  <span className="ml-2 text-sm tracking-wide truncate">
                    Logout
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavToggle;
