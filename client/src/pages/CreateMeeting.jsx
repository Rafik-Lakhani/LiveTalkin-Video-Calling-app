import React, { useState } from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function CreateMeeting() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [meetingName, setMeetingName] = useState("");
  const [roomId, setRoomId] = useState(null);

  const handleCreateMeeting = async (e) => {
    e.preventDefault();
    if (!meetingName) {
      toast.error("Please enter a meeting name");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_MEETING_API_KEY}/create-meeting`, {
        params: {
          name: meetingName,
          email: user.payload?.email,
        },
      });

      if (response.status === 201) {
        toast.success("Meeting Created Successfully");
        setMeetingName("");
        setRoomId(response.data.roomId);
        return ;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    toast.error("You need to sign in first");
    return <Navigate to="/signin" replace={true} />;
  }

  if(roomId){
    return <Navigate to={`/room/:${roomId}`} replace={true} />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-300 mb-8">
              Create Meeting
            </h2>
            <form className="space-y-6" onSubmit={handleCreateMeeting}>
              <div>
                <label
                  htmlFor="meetingName"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Meeting Name
                </label>
                <input
                  type="text"
                  id="meetingName"
                  onChange={(e) => setMeetingName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-white placeholder-gray-300"
                  placeholder="Enter meeting name"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-600/50 font-medium rounded-lg text-sm px-6 py-3 text-center shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Create Meeting
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CreateMeeting