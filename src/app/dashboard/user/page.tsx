"use client";

import { FaUser, FaEnvelope, FaPhone, FaPen, FaRegImage, FaVideo } from "react-icons/fa";

export default function UserDashboard() {
  return (
    <div className="bg-[#D5E6EE] min-h-screen flex justify-center p-7">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl">
        
        {/* Selfie & Edit Photo */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#1F6563]">
            <img
              src="/default-avatar.jpg"
              alt="Selfie"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex items-center text-[#1F6563] font-semibold text-lg cursor-pointer">
            <FaPen className="mr-2" />
            <span>Edit Profile</span>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-[#1F6563] font-medium mb-2">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full border border-gray-300 rounded pl-10 pr-4 py-3 focus:outline-none"
              />
            </div>
          </div>
          
          {/* Email */}
          <div>
            <label className="block text-sm text-[#1F6563] font-medium mb-2">
              Email ID
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border border-gray-300 rounded pl-10 pr-4 py-3 focus:outline-none"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="md:col-span-2">
            <label className="block text-sm text-[#1F6563] font-medium mb-2">
              Phone Number
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded pl-10 pr-4 py-3 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Storage Utilization */}
        <div className="bg-[#F0F7FA] border border-[#1F6563] rounded p-5">
          <h3 className="text-[#1F6563] font-semibold text-lg mb-2">Storage Utilization</h3>
          <p className="text-sm text-gray-600 mb-4">
            Deleted images will be reduced from upload count post 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-3 sm:space-y-0">
            {/* Photos */}
            <div className="flex items-center space-x-2">
              <FaRegImage className="text-[#1F6563] text-2xl"  />
              <span className="text-sm text-gray-800">0 of 1000 Photos</span>
            </div>

            {/* Videos */}
            <div className="flex items-center space-x-2">
              <FaVideo className="text-[#1F6563] text-2xl" />
              <span className="text-sm text-gray-800">0 of 10 Videos</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
