import React, { useState } from "react";
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

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace={true} />;
  }

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
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (roomId) {
    return <Navigate to={`/room/:${roomId}`} replace={true} />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex justify-center px-4">
        <div className="w-full max-w-lg bg-gray-800/30 m-auto mt-36 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-300 mb-14">
            Create a New Meeting
          </h2>

          <form className="space-y-6" onSubmit={handleCreateMeeting}>
            <div>
              <label
                htmlFor="meetingName"
                className="block text-lg font-medium text-gray-300 mb-2"
              >
                Meeting Name
              </label>
              <input
                type="text"
                id="meetingName"
                value={meetingName}
                onChange={(e) => setMeetingName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3 text-white placeholder-gray-400 transition-all"
                placeholder="Enter meeting name"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-500/50 text-white font-semibold rounded-lg px-6 py-3 text-center shadow-md transition-transform duration-300 transform hover:scale-105"
            >
              Create Meeting
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateMeeting;
