import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user= useSelector((state)=>state.user);
  console.log(user);
  // const username= user.payload.name;

  
  return (
    <nav className="bg-gray-900 border-gray-800">
      <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="text-2xl font-bold text-blue-500 hover:text-blue-300 transition duration-300">
            Livetalking
          </span>
        </Link>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-800 rounded-lg bg-gray-900 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 md:p-0 text-white bg-blue-800 rounded md:bg-transparent md:text-blue-400 md:dark:text-blue-400"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 md:p-0 text-gray-300 rounded hover:bg-gray-800 md:hover:bg-transparent md:hover:text-blue-400"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 md:p-0 text-gray-300 rounded hover:bg-gray-800 md:hover:bg-transparent md:hover:text-blue-400"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 gap-7 rtl:space-x-reverse">
          {isAuthenticated ? (
            <>
              <Link to="/create-meeting">
                <button
                  type="button"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Create Meeting
                </button>
              </Link>
              <Link to="/join-meeting">
                <button
                  type="button"
                  className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Join Meeting
                </button>
              </Link>
              <Link to="/profile">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold cursor-pointer hover:bg-blue-600">
                  {username?.name[0].toUpperCase()}
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button
                  type="button"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="border-b border-gray-600"></div>
    </nav>
  );
}

export default Navbar;
