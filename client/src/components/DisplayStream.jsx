import React from "react";

function DisplayStream({ stream, message, userName}) {
  return stream ? (
    <video src={stream} className="w-full h-full"></video>
  ) : message ? (
    <>
      <div className="w-full h-full">
        <h1>{message}</h1>
        <p>No stream available</p>
      </div>
    </>
  ) : (
    <>
      <div className="w-full h-full bg-blue-500 flex justify-center items-center">
        <h1 className="text-[15vh]">
          {userName.charAt(0).toUpperCase()}
        </h1>
      </div>
    </>
  );
}

export default DisplayStream;
