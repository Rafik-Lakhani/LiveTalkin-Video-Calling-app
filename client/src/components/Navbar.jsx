import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const {isAuthenticated,user}= useSelector((state)=>state.user);

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent hover:from-blue-400 hover:to-blue-300 transition duration-300">
            Live Talking
          </span>
        </Link>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg backdrop-blur-sm md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 items-center">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 md:p-0 text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 md:p-0 text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full hover:text-white"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 md:p-0 text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 gap-3 rtl:space-x-reverse">
          {isAuthenticated ? (
            <>
              <Link to="/create-meeting">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500/50 font-medium rounded-lg text-sm px-6 py-2.5 text-center shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Create Meeting
                </button>
              </Link>
              <Link to="/join-meeting">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:ring-4 focus:outline-none focus:ring-green-500/50 font-medium rounded-lg text-sm px-6 py-2.5 text-center shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Join Meeting
                </button>
              </Link>
              <Link to="/profile">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white text-xl font-bold cursor-pointer hover:from-blue-600 hover:to-blue-500 transition-all duration-300 transform hover:scale-110 shadow-lg">
                  {user.payload?.name[0].toUpperCase()}
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500/50 font-medium rounded-lg text-sm px-6 py-2.5 text-center shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:ring-4 focus:outline-none focus:ring-green-500/50 font-medium rounded-lg text-sm px-6 py-2.5 text-center shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="border-b border-gray-600/30"></div>
    </nav>
  );
}

export default Navbar;
