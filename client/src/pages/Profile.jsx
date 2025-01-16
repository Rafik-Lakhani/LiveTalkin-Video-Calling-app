import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { logout } from "../redux/userSlice";
import axios from "axios";
import { toast } from 'react-toastify';

function Profile() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigated = useNavigate();

    if (!isAuthenticated) {
      toast.error("Authentication Required");
      return <Navigate to="/signin" />;
    }

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_USER_API_KEY}/logout`);
      if (response.status === 200) {
        toast.success('Logged out successfully');
      }
    } catch (error) {
      console.error("Error in logout: ", error);
      toast.error('Error logging out');
    } finally {
      dispatch(logout());
      localStorage.removeItem("token");
      navigated("/");
      return ;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <main className="flex-grow bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mx-auto flex items-center justify-center">
                <span className="text-3xl text-white font-bold">
                  {user.payload?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white">
                {user.payload?.name}
              </h2>
              <p className="mt-1 text-gray-300">{user.payload?.email}</p>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-8">
              <h3 className="text-lg font-medium text-white">Profile Details</h3>
              <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-400">Full Name</dt>
                  <dd className="mt-1 text-sm text-gray-300">{user.payload?.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Email</dt>
                  <dd className="mt-1 text-sm text-gray-300">{user.payload?.email}</dd>
                </div>
              </dl>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-150 ease-in-out"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
