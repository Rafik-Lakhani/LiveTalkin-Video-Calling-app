import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from '../redux/userSlice.js';

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API_KEY}/register`,
        { name: name, email: email, password: password }
      );
      if (response.status == 201) {
        setError("");
        localStorage.setItem("token", response.data.token);
        dispatch(login(response.data.user));
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex py-10 items-center justify-center bg-gray-900">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 transform hover:scale-[1.02] transition-transform duration-300">
          <h2 className="text-4xl font-bold text-center text-blue-500 mb-8 bg-clip-text ">
            Sign Up
          </h2>
          {error && (
            <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 bg-opacity-10 border border-red-500 rounded-md">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 tracking-wide hover:text-blue-400 transition-colors duration-200"
              >
                Enter your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 tracking-wide hover:text-blue-400 transition-colors duration-200"
              >
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 tracking-wide hover:text-blue-400 transition-colors duration-200"
              >
                Enter your password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  id="eye-button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  onClick={() => {
                    const passwordInput = document.getElementById("password");
                    const eyeButton = document.getElementById("eye-button");
                    if (passwordInput.type === "password") {
                      passwordInput.type = "text";
                      eyeButton.innerHTML = "<i class='ri-eye-line'></i>";
                    } else {
                      passwordInput.type = "password";
                      eyeButton.innerHTML = "<i class='ri-eye-off-line'></i>";
                    }
                  }}
                >
                  <i className="ri-eye-off-line"></i>
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 tracking-wide hover:text-blue-400 transition-colors duration-200"
              >
                Confirm your password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  id="eye-button-confirm"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  onClick={() => {
                    const confirmPasswordInput =
                      document.getElementById("confirmPassword");
                    const eyeButtonConfirm =
                      document.getElementById("eye-button-confirm");
                    if (confirmPasswordInput.type === "password") {
                      confirmPasswordInput.type = "text";
                      eyeButtonConfirm.innerHTML =
                        "<i class='ri-eye-line'></i>";
                    } else {
                      confirmPasswordInput.type = "password";
                      eyeButtonConfirm.innerHTML =
                        "<i class='ri-eye-off-line'></i>";
                    }
                  }}
                >
                  <i className="ri-eye-off-line"></i>
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-3 px-4 font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              Sign Up
            </button>
            <p className="text-center text-gray-400 mt-4">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-500 hover:text-blue-400 transition duration-200"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
