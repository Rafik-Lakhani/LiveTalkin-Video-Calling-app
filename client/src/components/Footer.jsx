import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 border-gray-800">
      <div className="border-b border-gray-600"></div>

      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="text-2xl font-bold text-blue-500 hover:text-blue-300 transition duration-300">
              Livetalking
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0">
            <li>
              <Link to="#" className="hover:text-blue-400 me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-400 me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-400 me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <span className="block text-sm text-gray-300 sm:text-center mt-5">
          © 2025{" "}
          <Link to="#" className="hover:text-blue-400">
            Livetalking™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
