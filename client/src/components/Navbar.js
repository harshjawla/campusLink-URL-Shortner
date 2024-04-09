import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logos/companylogo.svg";
import plus from "../logos/plus.svg";
import { Backend_URL, Frontend_URL } from "./config";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  function handlePlus() {
    navigate("/create");
  }

  async function handleLogout() {
    const response = await fetch(Backend_URL + "/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      setLogout(true);
      console.log(logout);
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (logout) {
      console.log(logout);
      window.location.href = Frontend_URL + "/login";
    }
  }, [logout]);

  return (
    <>
      <nav className="bg-white p-4 flex justify-between items-center shadow-md relative z-10 rounded-lg">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-4" />
          <Link to={"/"} className="text-gray-800 font-bold text-lg">
            CampusLink
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-white font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
            onClick={handlePlus}
          >
            <img src={plus} alt="plus" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
          >
            Logout
          </button>
        </div>
        <div className="md:hidden">
          <button
            type="button"
            className="bg-gray-200 mx-3 hover:bg-gray-300 text-white font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
            onClick={handlePlus}
          >
            <img src={plus} alt="plus" className="h-5 w-5" />
          </button>
          <button
            onClick={toggleMenu}
            className="text-gray-800 hover:bg-gray-200 rounded-full p-2"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full bg-white shadow-md z-20">
            <div className="p-4 flex flex-col items-center">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 mt-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <button
              onClick={closeMenu}
              className="text-gray-800 absolute top-0 right-0 m-4"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
