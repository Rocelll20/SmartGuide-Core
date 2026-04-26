import React, { useState } from "react";

export default function SettingsPage() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    // 🔹 Replace this with your API call later
    console.log("Current:", currentPassword);
    console.log("New:", newPassword);

    alert("Password changed successfully!");
    setShowPasswordForm(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto animation-fade-in relative z-10 px-4 mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Settings
          </h1>
          <p className="text-white/60 text-sm">
            Configure system preferences and application behavior.
          </p>
        </div>
      </div>

      <div className="bg-[#111624] rounded-2xl p-8 border border-white/5 space-y-10">

        {/* Accessibility Settings */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Accessibility Settings
          </h2>

          <div className="flex flex-col">
            <label className="text-white/70 mb-2">Text Size</label>
            <select className="bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
        </div>

        {/* Location & Privacy */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Location & Privacy
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Share Live Location</span>
              <input type="checkbox" className="w-5 h-5 accent-teal-500" />
            </div>

            <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-lg transition">
              Delete Location History
            </button>
          </div>
        </div>

        {/* Account Security */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Account Security
          </h2>

          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="px-4 py-2 bg-[#1a2035] border border-white/10 text-white rounded-lg hover:border-teal-500 transition"
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition"
                >
                  Save Password
                </button>

                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}