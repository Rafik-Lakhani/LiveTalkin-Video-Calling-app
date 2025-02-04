import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Contact() {
  return (
    <div className="contact-page bg-gray-900 text-white h-screen">
      {/* Navbar Section */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section bg-gray-900 text-center py-5 mt-10">
        <h1 className="text-4xl font-bold">Get in Touch with Us</h1>
        <p className="text-lg text-gray-300 mt-4">We'd love to hear from you!</p>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form-section bg-gray-900 w-1/3 mb-10 mx-auto mt-4">
        <div className="container mx-auto">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form className="bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="form-group mb-4">
                  <label htmlFor="name" className="text-white">Name:</label>
                  <input type="text" id="name" name="name" required className="form-input bg-gray-700 text-white w-full py-2 px-4 rounded" />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="text-white">Email:</label>
                  <input type="email" id="email" name="email" required className="form-input bg-gray-700 text-white w-full py-2 px-4 rounded" />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="message" className="text-white">Message:</label>
                  <textarea id="message" name="message" required className="form-textarea bg-gray-700 text-white w-full py-2 px-4 rounded"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default Contact