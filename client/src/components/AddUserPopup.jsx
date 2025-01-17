import { toast } from "react-toastify";
import React from "react";

function AddUserPopup({roomId, setShowPopup}) {
  return (
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
  );
}

export default AddUserPopup;
