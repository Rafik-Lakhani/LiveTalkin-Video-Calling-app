import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Peer from "peerjs";
import ActionButtonContainer from "../components/ActionButtonContainer";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import AddUserPopup from "../components/AddUserPopup";

function Room() {
  const videoGridRef = useRef();
  const { roomid } = useParams();
  const roomId = roomid.split(":")[1];
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [callCut, setCallCut] = useState(false);
  const [addUserPopup, setAddUserPopup] = useState(false);
  const [meetingName, setMeetingName] = useState("");
  const myStreamRef = useRef(null);
  const peerRef = useRef(null);
  const socketRef = useRef(null);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_SERVER_URL); // Initialize socket first
    socketRef.current.on("connect", () => {
      console.log("Connected to socket server");
    });

    // Initialize Peer
    peerRef.current = new Peer({
      host: import.meta.env.VITE_BACKEND_HOST_NAME,
      port: 3000,
      path: "/peerjs",
    });

    peerRef.current.on("open", (id) => {
      console.log("Peer connected with ID:", id);
      socketRef.current.emit("join-room", {
        roomId: roomId,
        userId: id,
        emailId: user?.payload.email,
      });
    });

    peerRef.current.on("call", (call) => {
      console.log("Incoming call...");
      call.answer(myStreamRef.current);
      const remoteVideo = document.createElement("video");
      call.on("stream", (remoteStream) => {
        addVideoToGrid(remoteVideo, remoteStream);
      });
    });

    const setupStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log(stream);
        myStreamRef.current = stream;
        const myVideo = document.createElement("video");
        myVideo.muted = true;
        addVideoToGrid(myVideo, stream);
      } catch (error) {
        console.error("Error accessing media devices:", error);
        // alert(
        //   "Failed to access camera/microphone. Please check your permissions."
        // );
      }
    };
    setupStream();

    socketRef.current.on("user-connected", ({ userId }) => {
      console.log("User connected:", userId);
      console.log(myStreamRef.current);
      connectToNewUser(userId, myStreamRef.current);
    });

    socketRef.current.on("connection-done", ({ meetingName }) => {
      console.log(meetingName);
      setMeetingName(meetingName);
    });

    socketRef.current.on("something-went-wrong", ({ message }) => {
      alert(message);
      setCallCut(true);
    });

    socketRef.current.on("user-disconnected", (userId) => {
      console.log("User disconnected:", userId);
    });
  }, []);

  useEffect(() => {
    if (callCut) {
      peerRef.current?.destroy();
      myStreamRef.current.getTracks().forEach((track) => track.stop());
      socketRef.current?.disconnect();
      navigate("/");
    } else {
      return;
    }
  }, [callCut]);

  const addVideoToGrid = (videoElement, stream) => {
    // if (!stream || stream.getVideoTracks().length === 0) {
    //   // If no video stream, display a placeholder
    //   const placeholder = document.createElement("div");
    //   placeholder.innerText = "No Video Available";
    //   placeholder.className =
    //     "flex items-center justify-center w-full h-40 bg-gray-700 text-white text-lg rounded-lg";
    //   videoGridRef.current.append(placeholder);
    //   return;
    // }

    videoElement.srcObject = stream;
    videoElement.className = "w-[500px] h-[350px] object-cover rounded-lg";
    videoElement.addEventListener("loadedmetadata", () => {
      videoElement.play();
      videoGridRef.current.append(videoElement);
    });
  };

  const connectToNewUser = async (userId, stream) => {
    console.log("Calling user:", userId);
    console.log(peerRef.current);
    console.log(stream);
    console.log(userId);
    try {
      const call = await peerRef.current.call(userId, stream);
      console.log(call);
      // console.log(await peerRef.current.call(userId, stream));

      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoToGrid(video, userVideoStream);
      });
    } catch (error) {
      console.error("Error calling user:", error);
    }
  };

  const toggleAudio = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myStreamRef.current.getAudioTracks()[0].enabled = false;
      setAudioOn(false);
    } else {
      myStreamRef.current.getAudioTracks()[0].enabled = true;
      setAudioOn(true);
    }
  };

  const toggleVideo = () => {
    const enabled = myStreamRef.current.getVideoTracks()[0].enabled;
    if (enabled) {
      myStreamRef.current.getVideoTracks()[0].enabled = false;
      setVideoOn(false);
    } else {
      myStreamRef.current.getVideoTracks()[0].enabled = true;
      setVideoOn(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Add User Popup */}
      {addUserPopup && (
        <AddUserPopup roomId={roomId} setShowPopup={setAddUserPopup} />
      )}

      {/* Header */}
      <header className="bg-gray-800 py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold text-blue-400 truncate">
          {meetingName}
        </h1>
        <button
          onClick={() => setAddUserPopup(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add User
        </button>
      </header>

      {/* Video Grid - Always Centered */}
      <div className="flex flex-grow justify-center items-center overflow-auto px-4 py-6">
        <div
          ref={videoGridRef}
          className="grid gap-4 w-full max-w-5xl mx-auto justify-center items-center m-auto"
        >
          {/* Video elements will be dynamically added here */}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <ActionButtonContainer
          audioOn={audioOn}
          setAudioOn={setAudioOn}
          videoOn={videoOn}
          setVideoOn={setVideoOn}
          setCallCut={setCallCut}
        />
      </div>
    </div>
  );
}

export default Room;
