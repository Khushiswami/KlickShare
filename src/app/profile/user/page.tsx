export default function ProfileSection() {
    return (
        <div className="bg-[#D5E6EE] min-h-screen flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
                {/* Selfie & Edit Photo */}
                <div className="flex items-center space-x-6 mb-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#1F6563]">
                        <img
                            src="/default-avatar.png"
                            alt="Selfie"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <span className="text-[#1F6563] font-semibold text-lg cursor-pointer">
                            Edit Photo
                        </span>
                    </div>
                </div>
                
                {/* Form Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm text-[#1F6563] font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-[#1F6563] font-medium mb-2">
                            Email ID
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-[#1F6563] font-medium mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="Enter phone number"
                            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Storage Utilization */}
                <div className="bg-[#F0F7FA] border border-[#1F6563] rounded p-5">
                    <h3 className="text-[#1F6563] font-semibold text-lg mb-2">Storage Utilization</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Deleted images will be reduced from upload count post 24 hours.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-[#1F6563] rounded"> </div>
                            <span className="text-sm text-gray-800">0 of 1000 Photos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-[#1F6563] rounded"></div>
                            <span className="text-sm text-gray-800">0 of 10 Videos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
