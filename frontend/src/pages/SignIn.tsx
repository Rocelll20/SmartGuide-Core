import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, EyeOff, Eye, ArrowRight, Diamond, Moon, Sun } from "lucide-react";

interface SignInForm {
  email: string;
  password: string;
}

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignInForm>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // 1. Send credentials to DJANGO (Port 8000)
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Django expects 'username', so we map your 'email' input to 'username'
        body: JSON.stringify({
          username: form.email,
          password: form.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // 2. Success! Save the token and go to the dashboard
        localStorage.setItem("smartguide_token", data.token);
        navigate("/dashboard");
      } else {
        // 3. Handle bad passwords
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      {darkMode && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-700 rounded-full filter blur-[120px] opacity-40 mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-900 rounded-full filter blur-[120px] opacity-40 mix-blend-screen pointer-events-none"></div>
        </>
      )}

      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
          className="p-2 rounded-full border transition-colors duration-300 hover:bg-red-500 hover:text-white border-red-500 text-red-500"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={`relative flex flex-col md:flex-row w-full max-w-[800px] min-h-[460px] mx-4 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl border border-red-900/30 transition-colors duration-500 ${
          darkMode ? "bg-[#1a1a1a]/80" : "bg-gray-50"
        }`}
      >
        <div
          className={`w-full md:w-5/12 p-10 flex flex-col justify-between relative border-r border-red-900/30 ${
            darkMode ? "bg-gradient-to-br from-red-600/20 to-black/40 text-red-100" : "bg-gradient-to-br from-red-50 to-white text-red-700"
          }`}
        >
          <div className="relative z-10 flex flex-col h-full">
            <div>
              <p className={`text-sm mb-1 ${darkMode ? "text-red-300" : "text-red-500"}`}>Welcome to</p>
              <h1 className={`text-2xl font-bold mb-8 tracking-wide ${darkMode ? "text-red-500" : "text-red-600"}`}>
                SmartGuide IoT
              </h1>
              <p className={`text-sm leading-relaxed max-w-[220px] ${darkMode ? "text-red-200" : "text-red-600"}`}>
                  "Turning care into independence. Technology that sees, Guiding every step with trust."
              </p>
            </div>
            <div className="mt-16">
              <Diamond className={`w-8 h-8 ${darkMode ? "text-red-500" : "text-red-600"}`} />
            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-10 z-10 flex flex-col justify-center">
          <h2 className={`text-xl font-bold mb-8 ${darkMode ? "text-red-500" : "text-red-600"}`}>Sign In</h2>

          {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-5 w-5 ${darkMode ? "text-red-400/70" : "text-red-500/70"}`} />
              </div>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm transition-all ${
                  darkMode
                    ? "bg-black/70 border border-red-900/40 text-white placeholder:text-red-300/50"
                    : "bg-white border border-red-200 text-[#7a1f1f] placeholder:text-red-300"
                }`}
                placeholder="Username"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${darkMode ? "text-red-400/70" : "text-red-500/70"}`} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm transition-all ${
                  darkMode
                    ? "bg-black/70 border border-red-900/40 text-white placeholder:text-red-300/50"
                    : "bg-white border border-red-200 text-[#7a1f1f] placeholder:text-red-300"
                }`}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <Eye className={`h-4 w-4 ${darkMode ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-400"} transition-colors`} />
                ) : (
                  <EyeOff className={`h-4 w-4 ${darkMode ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-400"} transition-colors`} />
                )}
              </button>
            </div>

            <div className="flex items-center mt-1 mb-2">
              <input id="remember" type="checkbox" className="w-4 h-4 rounded border-red-500 text-red-500 focus:ring-red-500" />
              <label htmlFor="remember" className={`ml-2 text-xs cursor-pointer select-none ${darkMode ? "text-red-300" : "text-red-600"}`}>
                Remember Login Details
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity flex justify-between items-center px-5 shadow-lg shadow-red-800/30"
            >
              <span>{loading ? "Signing In..." : "Sign In"}</span>
              <ArrowRight className="w-5 h-5 text-white/90" />
            </button>

            <div className="text-center mt-2">
              <p className={`text-xs ${darkMode ? "text-red-300" : "text-red-600"}`}>
                Don’t have an account?{" "}
                <Link to="/auth/sign-up" className={`${darkMode ? "text-red-500" : "text-red-600"} hover:underline ml-1`}>
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="absolute bottom-8 text-xs text-red-400 text-center w-full">
        © SmartGuide IoT 2026
      </div>
    </div>
  );
}