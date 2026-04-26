import React, { useState, useEffect, useRef } from "react";

interface Contact {
  id: number;
  name: string;
  number: string;
}

export default function EmergencyPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const [countdown, setCountdown] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const dialKeys = ["1","2","3","4","5","6","7","8","9","*","0","#"];

  /* ---------------- PERSISTENCE ---------------- */

  useEffect(() => {
    const saved = localStorage.getItem("emergencyContacts");
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
  }, [contacts]);

  /* ---------------- COUNTDOWN ---------------- */

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      triggerEmergency();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const triggerEmergency = () => {
    setCountdown(null);
    setToast("🚨 Emergency triggered!");
    startFlashing();
    playAlarm();
  };

  const startFlashing = () => {
    let flashes = 0;
    const interval = setInterval(() => {
      setFlash((prev) => !prev);
      flashes++;
      if (flashes >= 6) {
        clearInterval(interval);
        setFlash(false);
      }
    }, 250);
  };

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  /* ---------------- ACTIONS ---------------- */

  const handleDial = (value: string) => {
    setPhoneNumber((prev) => prev + value);
  };

  const deleteDigit = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const addContact = () => {
    if (!name || !number) return;
    setContacts((prev) => [...prev, { id: Date.now(), name, number }]);
    setName("");
    setNumber("");
  };

  const deleteContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const startEmergencyCountdown = () => {
    setCountdown(5);
  };

  const quickCall = (num: string) => {
    setToast(`Calling ${num}...`);
  };

  return (
    <div
      className={`relative flex flex-col gap-6 w-full max-w-4xl mx-auto px-4 mt-8 text-white transition ${
        flash ? "bg-red-900" : ""
      }`}
    >
      <audio
        ref={audioRef}
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      />

      {/* RED TOAST */}
      {toast && (
        <div className="fixed top-6 right-6 bg-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <span className="text-sm">{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* COUNTDOWN MODAL */}
      {countdown !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#111624] p-6 rounded-xl text-center border border-red-600">
            <p className="mb-4 text-sm">
              Emergency triggers in{" "}
              <span className="text-red-500 font-bold text-lg">
                {countdown}
              </span>
            </p>
            <button
              onClick={() => setCountdown(null)}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Emergency Hub</h1>
        <p className="text-white/50 text-sm">Rapid response interface</p>
      </div>

      {/* PRESETS */}
      <div className="flex gap-3">
        <button
          onClick={() => quickCall("911")}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
        >
          Call 911
        </button>

        <button
          onClick={() => quickCall("999")}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
        >
          Call 999
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* DIAL PAD */}
        <div className="bg-[#111624] rounded-xl p-5 border border-white/5">
          <div className="bg-black/40 rounded-md p-3 text-center mb-4 text-sm tracking-widest">
            {phoneNumber || "Enter number"}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            {dialKeys.map((key) => (
              <button
                key={key}
                onClick={() => handleDial(key)}
                className="bg-[#1a2235] hover:bg-[#222c44] py-3 rounded-lg text-sm"
              >
                {key}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={deleteDigit}
              className="flex-1 bg-yellow-500 py-2 rounded-lg text-sm"
            >
              Del
            </button>

            <button
              onClick={() => quickCall(phoneNumber)}
              className="flex-1 bg-green-600 py-2 rounded-lg text-sm"
            >
              Call
            </button>
          </div>
        </div>

        {/* CONTACTS */}
        <div className="bg-[#111624] rounded-xl p-5 border border-white/5">
          <div className="flex flex-col gap-2 mb-4">
            <input
              type="text"
              placeholder="Contact Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-black/40 rounded-md p-2 text-sm"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="bg-black/40 rounded-md p-2 text-sm"
            />
            <button
              onClick={addContact}
              className="bg-blue-600 py-2 rounded-lg text-sm"
            >
              Add
            </button>
          </div>

          <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-[#1a2235] p-3 rounded-lg flex justify-between items-center text-sm"
              >
                <div>
                  <p>{contact.name}</p>
                  <p className="text-white/50 text-xs">{contact.number}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => quickCall(contact.number)}
                    className="bg-green-600 px-3 py-1 rounded-md text-xs"
                  >
                    Call
                  </button>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="bg-red-600 px-3 py-1 rounded-md text-xs"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EMERGENCY BUTTON */}
      <button
        onClick={startEmergencyCountdown}
        className="bg-red-700 hover:bg-red-800 py-3 rounded-xl text-sm font-semibold animate-pulse"
      >
        Emergency Call
      </button>
    </div>
  );
}