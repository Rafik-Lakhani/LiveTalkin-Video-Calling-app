import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Peer from "peerjs";
import ActionButtonContainer from "../components/ActionButtonContainer";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

function Room() {
  const videoGridRef = useRef();
  const { roomid } = useParams();
  const roomId = roomid.split(":")[1];
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [callCut, setCallCut] = useState(false);
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
    socketRef.current = io("http://localhost:3000"); // Initialize socket first
    socketRef.current.on("connect", () => {
      console.log("Connected to socket server");
    });

    // Initialize Peer
    peerRef.current = new Peer({
      host: "localhost",
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

    const myVideo = document.createElement("video");
    myVideo.muted = true;

    // Setup Media Stream
    const setupStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        myStreamRef.current = stream;
        addVideoToGrid(myVideo, stream);
      } catch (error) {
        console.error("Error accessing media devices:", error);
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
    videoElement.srcObject = stream;
    videoElement.addEventListener("loadedmetadata", () => {
      videoElement.play();
      videoGridRef.current.append(videoElement);
    });
  };

  const connectToNewUser = async (userId, stream) => {
    console.log("Calling user:", userId);
    console.log(peerRef.current.call);
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
    <div
      ref={videoGridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl shadow-xl text-white"
    >
      {/* Meeting Name Header */}
      <h1 className="text-3xl font-extrabold col-span-full text-center bg-gradient-to-r from-blue-400 to-purple-600 p-4 rounded-lg shadow-lg">
        {meetingName}
      </h1>

      {/* Add User Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => alert("The room ID is " + roomId)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Add User
        </button>
      </div>

      {/* Action Button Container */}
      <div className="col-span-full mt-6 flex justify-center">
        <ActionButtonContainer
          audioOn={audioOn}
          setAudioOn={setAudioOn}
          videoOn={videoOn}
          setVideoOn={setVideoOn}
          setCallCut={setCallCut}
          toggleAudio={toggleAudio}
          toggleVideo={toggleVideo}
        />
      </div>
    </div>
  );
}

export default Room;
