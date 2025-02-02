import React,{useEffect} from "react";
import ReactPlayer from "react-player";

function DisplayStream({ stream, message, userName}) {

  useEffect(() => {
    console.log('screen use Effect')
    console.log(stream);
    const screen = document.getElementById("screen");
    if (stream && screen) {
      console.log(`Setting ${userName}'s stream:`, stream.getTracks());
      screen.srcObject = stream;
      screen.play().catch(error => {
        console.error(`Error playing ${userName}'s video:`, error);
      });

      // Cleanup function
      return () => {
        screen.srcObject = null;
      };
    }
  }, [stream, userName]);
  
  
  return stream ? (
    <div className="w-full h-full">
      <video 
        id="screen"
        autoPlay 
        playsInline
        muted={userName !== "Remote"}
        className="w-full h-full object-cover"
      />
    </div>
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
