import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function JoinMeeting() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [roomId, setRoomId] = useState();
  const [roomUrl, setRoomUrl] = useState("");
  const [JoinMeeting,setJoinMeeting] = useState(false);
  const handleJoinMeeting = async (e) => {
    e.preventDefault();
    const urlbaseid = roomUrl?.split("/:")[1];
    if (!roomId && !roomUrl) {
      toast.error("Please enter a room ID Or a URL");
      return;
    }
    if (roomId && roomUrl) {
      if (roomId != urlbaseid) {
        toast.error("Room id different in URL");
        return;
      }
    }
    if (!roomId &&roomUrl) {
      setRoomId(urlbaseid);
    }
    const response = axios
      .get(`${import.meta.env.VITE_MEETING_API_KEY}/join-meeting`, {
        params: {
          roomId: roomId,
          email: user.payload?.email,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success("Joining Meeting");
          setJoinMeeting(true);
          return;
        } else {
          toast.error(`${response.data.message}`);
          return;
        }
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
      });
  };

  if (!isAuthenticated) {
    toast.error("You need to sign in first");
    return <Navigate to="/signin" replace={true} />;
  }
  if(JoinMeeting){
    return <Navigate to={`/room/:${roomId}`} replace={true} />
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-300 mb-8">
              Join Meeting
            </h2>
            <form className="space-y-6" onSubmit={handleJoinMeeting}>
              <div>
                <label
                  htmlFor="roomId"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Room ID
                </label>
                <input
                  type="number"
                  id="roomId"
                  maxLength={6}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-white placeholder-gray-300"
                  placeholder="Enter room ID"
                />
              </div>
              <div className="flex items-center justify-center my-4">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="px-4 text-gray-300 text-sm font-medium">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>
              <div>
                <label
                  htmlFor="meetingUrl"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Meeting URL
                </label>
                <input
                  type="url"
                  id="meetingUrl"
                  onChange={(e) => setRoomUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-white placeholder-gray-300"
                  placeholder="Enter meeting URL"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-600/50 font-medium rounded-lg text-sm px-6 py-3 text-center shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Join Meeting
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JoinMeeting;
