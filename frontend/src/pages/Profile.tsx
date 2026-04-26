import React, { useRef, useState } from "react";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto animation-fade-in relative z-10 px-4 mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Profile
          </h1>
          <p className="text-white/60 text-sm">
            Manage your personal information and account preferences.
          </p>
        </div>
      </div>

      <div className="bg-[#111624] rounded-2xl p-8 border border-white/5">
        <h2 className="text-xl font-semibold text-white mb-6">
          User Information
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-3xl font-bold">RM</span>
              )}
            </div>

            <button
              onClick={handlePhotoClick}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm rounded-lg transition"
            >
              Change Photo
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {/* Personal Details Form */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-white/60 text-sm mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                className="bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white/60 text-sm mb-2">Date of Birth</label>
              <input
                type="date"
                className="bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white/60 text-sm mb-2">Gender</label>
              <select className="bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to say</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-white/60 text-sm mb-2">Contact Number</label>
              <input
                type="tel"
                placeholder="Enter contact number"
                className="bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-white/60 text-sm mb-2">Address</label>
              <input
                type="text"
                placeholder="Enter address"
                className="bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white/60 text-sm mb-2">Blood Type</label>
              <select className="bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-white/60 text-sm mb-2">
                Medical Notes (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Enter any medical notes"
                className="bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}