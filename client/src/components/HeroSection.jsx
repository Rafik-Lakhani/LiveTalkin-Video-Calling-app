import React from "react";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import HeroSectionImage from "../assets/herosectionImage.png";

function HeroSection() {
  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col md:flex-row justify-center items-center px-6 sm:px-8 md:px-12">
      {/* Left Side - Typing Animation */}
      <div className="md:w-3/6 text-center md:text-left px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
          Connect.
          <br />
          Collaborate.
          <br /> Communicate.
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4 text-gray-300">
          <ReactTyped
            strings={[
              "Seamless Virtual Meetings",
              "Secure & Reliable Connection",
              "Effortless Team Collaboration",
            ]}
            typeSpeed={50}
            backSpeed={50}
            loop
          />
        </h2>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row md:flex-row items-center space-y-4 sm:space-y-0 md:space-y-0 md:space-x-4">
          <Link to="/create-meeting">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 w-full sm:w-auto">
              Start a Meeting
            </button>
          </Link>
          <Link to="/join-meeting">
            <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-300 w-full sm:w-auto">
              Join a Meeting
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side - Meeting SVG */}
      <div className="md:w-2/6 flex justify-center mt-8 md:mt-0">
        <img
          src={HeroSectionImage}
          alt="Meeting Illustration"
          className="w-3/4 sm:w-2/3 md:w-full max-w-lg"
        />
      </div>
    </div>
  );
}

export default HeroSection;
