import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-400">404</h1>
        <h2 className="text-4xl font-semibold text-white mt-4">Page Not Found</h2>
        <p className="text-blue-200 mt-4 text-lg">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound;