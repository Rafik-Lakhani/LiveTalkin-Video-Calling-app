import React from 'react'

function LayoutButtonContainer({setLayout, layout}) {
  return (
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
  )
}

export default LayoutButtonContainer