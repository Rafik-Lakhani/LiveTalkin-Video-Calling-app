import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DisplayStream from "../components/DisplayStream";
import AddUserPopup from "../components/AddUserPopup";
import LayoutButtonContainer from "../components/LayoutButtonContainer";
import ActionButtonContainer from "../components/ActionButtonContainer";

function Room() {
  const [layout, setLayout] = useState(1);
  const [videoOn, setVideoOn] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [screenOn, setScreenOn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [roomId, setRoomId] = useState(123);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [remoteClinetPresent, serRemoteClinetPresent] = useState(false);


  if (!isAuthenticated) {
    toast.error("Authentication Required");
    return <Navigate to="/signin" replace={true} />;
  }
  
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
        <LayoutButtonContainer setLayout={setLayout} layout={layout} />
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

          <ActionButtonContainer
            audioOn={audioOn}
            videoOn={videoOn}
            screenOn={screenOn}
            setAudioOn={setAudioOn}
            setVideoOn={setVideoOn}
            setScreenOn={setScreenOn}
          />
        </div>
      </div>

      {/* here is popup show to add user */}
      {showPopup && (
        <AddUserPopup roomId={roomId} setShowPopup={setShowPopup} />
      )}
    </div>
  );
}

export default Room;
