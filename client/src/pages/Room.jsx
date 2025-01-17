import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DisplayStream from "../components/DisplayStream";

function Room() {
  const [layout, setLayout] = useState(1);
  const [videoOn, setVideoOn] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [screenOn, setScreenOn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [roomId, setRoomId] = useState(123);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [remoteClinetPresent, serRemoteClinetPresent] = useState(false);

  useEffect(() => {
    const localBox = document.querySelector("#localBox");
    if (!remoteClinetPresent) {
      localBox.style.width = "50vw";
      localBox.style.height = "70vh";
      return;
    }
    const remotBox = document.querySelector("#remotBox");
    const parentBox = document.querySelector("#parent-div");
    if (layout == 1) {
      remotBox.style.width = "40vw";
      localBox.style.width = "40vw";
      remotBox.style.height = "60vh";
      localBox.style.height = "60vh";
      parentBox.style.flexDirection = "row";
    }
    if (layout == 2) {
      remotBox.style.width = "50vw";
      localBox.style.width = "15vw";
      remotBox.style.height = "60vh";
      localBox.style.height = "20vh";
      parentBox.style.flexDirection = "column";
    }
    if (layout == 3) {
      remotBox.style.width = "15vw";
      localBox.style.width = "50vw";
      remotBox.style.height = "20vh";
      localBox.style.height = "60vh";
      parentBox.style.flexDirection = "column-reverse";
    }
  }, [layout, setLayout]);

  if (!isAuthenticated) {
    toast.error("Authentication Required");
    return <Navigate to="/signin" />;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 relative">
      <div className="flex justify-start items-center mb-4 gap-7">
        <h2 className="text-3xl text-white">Meeting Name</h2>
        <button
          className="px-2  py-1 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
          onClick={() => setShowPopup(true)}
        >
          <i className="ri-user-add-fill"></i>
        </button>
      </div>
      {remoteClinetPresent && (
        <div className="absolute top-5 right-5 flex gap-2 text-2xl text-gray-700 p-1 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl">
          <button
            className={`${layout == 1 && "bg-gray-500"} rounded`}
            onClick={() => setLayout(1)}
          >
            <i className="ri-layout-column-fill"></i>
          </button>
          <button
            className={`${layout == 2 && "bg-gray-500"} rounded`}
            onClick={() => setLayout(2)}
          >
            <i className="ri-layout-row-fill"></i>
          </button>
          <button
            className={`${layout == 3 && "bg-gray-500"} rounded rotate-180`}
            onClick={() => setLayout(3)}
          >
            <i className="ri-layout-row-fill"></i>
          </button>
        </div>
      )}

      <div className="container mx-auto">
        <div
          className="flex items-center justify-center m-auto gap-4"
          id="parent-div"
        >
          {/* Remote Video Box - Takes up top portion */}

          {remoteClinetPresent && (
            <div
              className="w-[50vw] h-[70vh] bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-4"
              id="remotBox"
            >
              <div className="aspect-video w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
                <DisplayStream userName={"rafik"} />
              </div>
            </div>
          )}

          {/* Local Video Box - Takes up bottom portion */}

          <div
            className="w-[15vw] h-[22vh] bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-4"
            id="localBox"
          >
            <div className="h-full bg-gray-700 rounded-lg flex items-center justify-center">
              <DisplayStream userName={user.payload?.name} />
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6 text-2xl p-4 px-7 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/30 ">
            <button
              className="hover:bg-gray-700 hover:scale-110 transition-all duration-200 p-1 px-2 rounded-full bg-gray-800/80 text-gray-300 hover:text-white shadow-lg"
              onClick={() => setAudioOn((prev) => !prev)}
            >
              {!audioOn ? (
                <i className="ri-mic-off-fill"></i>
              ) : (
                <i className="ri-mic-fill"></i>
              )}
            </button>
            <button
              className="hover:bg-gray-700 hover:scale-110 transition-all duration-200 p-1 px-2 rounded-full bg-gray-800/80 text-gray-300 hover:text-white shadow-lg"
              onClick={() => setVideoOn((prev) => !prev)}
            >
              {!videoOn ? (
                <i class="ri-video-off-fill"></i>
              ) : (
                <i class="ri-video-on-fill"></i>
              )}
            </button>
            <button
              className="hover:bg-gray-700 hover:scale-110 transition-all duration-200 p-1 px-2 rounded-full bg-gray-800/80 text-gray-300 hover:text-white shadow-lg"
              onClick={() => setScreenOn((prev) => !prev)}
            >
              {!screenOn ? (
                <i class="ri-computer-fill"></i>
              ) : (
                <i class="ri-computer-fill"></i>
              )}
            </button>
            <button className="hover:bg-red-600 hover:scale-110 transition-all duration-200 p-1 px-2 rounded-full bg-red-500 text-white shadow-lg">
              <i className="ri-phone-fill"></i>
            </button>
          </div>
        </div>
      </div>

      {/* here is popup show to add user */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 backdrop-blur-sm z-50">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h1 className="text-xl text-center font-semibold mb-4 text-white">
              Join People
            </h1>
            <h3 className="mb-2 text-gray-300">
              Room URL:
              <span className="font-mono text-gray-200">
                {window.location.href}
              </span>
              <button
                className="ml-2 text-gray-400 hover:text-white"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Copy Meeting URL");
                }}
                title="Copy URL"
              >
                <i className="ri-file-copy-fill"></i>
              </button>
            </h3>
            <h3 className="mb-4 text-gray-300">
              Room ID:
              <span className="font-mono text-gray-200">{roomId}</span>
              <button
                className="ml-2 text-gray-400 hover:text-white"
                onClick={() => {
                  navigator.clipboard.writeText(roomId);
                  toast.success("Copy Meeting ID");
                }}
                title="Copy Room ID"
              >
                <i className="ri-file-copy-fill"></i>
              </button>
            </h3>

            <div className="flex justify-center">
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
