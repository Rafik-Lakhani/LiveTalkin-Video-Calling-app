import React from "react";

function HeroSection() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Welcome to the Video Call App
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Connect with your friends and family easily.
        </p>
        <button className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-6 py-3">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
