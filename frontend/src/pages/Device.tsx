import React, { useState } from "react";

interface Device {
  id: number;
  name: string;
  deviceId: string;
}

export default function DevicePage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceName, setDeviceName] = useState("");
  const [deviceId, setDeviceId] = useState("");

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();

    if (!deviceName || !deviceId) {
      alert("Please fill in all fields.");
      return;
    }

    const newDevice: Device = {
      id: Date.now(),
      name: deviceName,
      deviceId: deviceId,
    };

    setDevices([...devices, newDevice]);
    setDeviceName("");
    setDeviceId("");
  };

  const handleDeleteDevice = (id: number) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto px-4 mt-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Device Management
        </h1>
        <p className="text-white/60 text-sm">
          Add or remove connected tracking devices.
        </p>
      </div>

      <div className="bg-[#111624] rounded-2xl p-8 border border-white/5 space-y-8">

        {/* Add Device Form */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Add Device
          </h2>

          <form onSubmit={handleAddDevice} className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Device Name"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              className="bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <input
              type="text"
              placeholder="Device ID"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              className="bg-[#1a2035] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <div className="md:col-span-2">
              <button
                type="submit"
                className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition"
              >
                Add Device
              </button>
            </div>
          </form>
        </div>

        {/* Device List */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Connected Devices
          </h2>

          {devices.length === 0 ? (
            <p className="text-white/40">No devices added yet.</p>
          ) : (
            <div className="space-y-4">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="flex justify-between items-center bg-[#1a2035] p-4 rounded-lg"
                >
                  <div>
                    <p className="text-white font-semibold">
                      {device.name}
                    </p>
                    <p className="text-white/50 text-sm">
                      ID: {device.deviceId}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteDevice(device.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}