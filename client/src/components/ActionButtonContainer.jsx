import React from 'react'

function ActionButtonContainer({audioOn,setAudioOn,videoOn,setVideoOn,screenOn,setScreenOn}) {
  return (
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
  )
}

export default ActionButtonContainer