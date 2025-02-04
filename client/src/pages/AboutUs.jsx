import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div className="about-us-page bg-gray-900 text-white min-h-screen">
      {/* Navbar Section */}
      <Navbar />

      <div className="hero-section bg-gray-900 text-center  mt-10">
        <h1 className="text-5xl font-bold text-white">
          Welcome to Live Talking
        </h1>
        <p className="text-xl text-gray-400 mt-6">
          Your platform for seamless video connections.
        </p>
      </div>
      <div className="about-section bg-gray-900 w-2/4 mb-10 mx-auto mt-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-semibold text-center mb-6">Our Story</h2>
        <p className="text-xl text-gray-400 text-center">
          Live Talking is a video calling platform designed to bring people
          together, no matter where they are in the world. Our mission is to
          provide a seamless and reliable connection for effortless
          communication.
        </p>
      </div>
      <div className="team-section bg-gray-900 w-2/4 mb-10 mx-auto mt-4 rounded-lg shadow-lg">
        <h2 className="text-4xl font-semibold mb-6 text-center">Our Team</h2>
        <p className="text-xl text-gray-400 text-center">
          Meet the team behind Live Talking, a group of passionate individuals
          dedicated to revolutionizing the way we communicate.
        </p>
      </div>

      <div className="creator-section bg-gray-900 w-3/4 mb-10 mx-auto mt-4 text-center rounded-lg shadow-lg ">
        <h2 className="text-4xl font-semibold mb-6 text-center">Creator</h2>
        <p className="text-xl text-gray-400 text-center mb-1">
          Lakhani Rafik, the visionary behind Live Talking.
        </p>
        <a
          href="https://www.linkedin.com/in/rafik-lakhani-555941305/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 mt-4 hover:text-blue-800 text-center text-3xl m-auto mr-2"
        >
          <i class="ri-linkedin-box-fill"></i>
        </a>
        <a
          href="https://github.com/Rafik-Lakhani"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 mt-4 hover:text-gray-200 text-center text-3xl m-auto"
        >
          <i class="ri-github-fill"></i>
        </a>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default AboutUs;
