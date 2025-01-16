import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";
import JoinMeeting from "./pages/JoinMeeting";
import CreateMeeting from "./pages/CreateMeeting";
import Room from "./pages/Room";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={<h1 className="text-3xl font-bold underline">About Us</h1>}
        />
        <Route
          path="/contact"
          element={<h1 className="text-3xl font-bold underline">Contact Us</h1>}
        />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/join-meeting" element={<JoinMeeting/>}></Route>
        <Route path="/create-meeting" element={<CreateMeeting/>}></Route>
        <Route path="/room/:roomid" element={<Room/>}></Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
