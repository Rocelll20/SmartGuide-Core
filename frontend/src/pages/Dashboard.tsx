import React, { useMemo, Suspense, useState, useEffect } from "react";
import {
  Menu,
  Search,
  Settings,
  Bell,
  Users,
  CheckCircle2,
  Clock,
  UserPlus,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const [mapSearchQuery, setMapSearchQuery] = useState("");
  
  // 1. We create an empty state to hold the real markers from the database
  const [markers, setMarkers] = useState<any[]>([]);

  // 2. We tell React to fetch the data from FastAPI (Port 8001) as soon as the page loads
  useEffect(() => {
    const fetchLiveMarkers = async () => {
      try {
        const response = await fetch("https://smartguide-core.onrender.com/api/live-markers/");
        const data = await response.json();
        setMarkers(data); // Save the database info into our React state
      } catch (error) {
        console.error("Failed to fetch live map data from FastAPI", error);
      }
    };

    fetchLiveMarkers();
  }, []);

  // 3. Filter markers based on the search bar input
  const filteredMarkers = markers.filter(
    (marker) =>
      marker.name.toLowerCase().includes(mapSearchQuery.toLowerCase()) ||
      marker.device.toLowerCase().includes(mapSearchQuery.toLowerCase())
  );

  const Map = useMemo(
    () => React.lazy(() => import("@/components/ui/map")),
    []
  );

  return (
    <div
      className="w-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Navbar */}
      <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 pt-2">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-white/70 hover:text-white p-2 bg-card rounded-lg" aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Dashboard</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Global Search..."
              className="bg-card border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-red-500 transition-colors text-white placeholder:text-white/40 w-48 lg:w-64 focus:ring-1 focus:ring-red-500 shadow-lg"
              aria-label="Search"
            />
          </div>

          <div className="flex items-center gap-4 text-white/70 font-bold ml-2">
            <button className="hover:text-white transition-colors ml-2" aria-label="Settings">
              <Settings size={16} />
            </button>
            <button className="hover:text-white transition-colors" aria-label="Notifications">
              <Bell size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-6 pb-6 px-4">
        {/* Row 1: Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-[#111624] to-[#0A0D18] rounded-[20px] p-6 shadow-2xl border border-white/5 relative overflow-hidden h-[140px] flex flex-col justify-between group cursor-pointer transition-transform hover:-translate-y-1">
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#818cf8]/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <p className="text-white/50 text-xs font-bold tracking-wide uppercase mb-1">Total Users</p>
                <h3 className="text-3xl font-bold tracking-tighter text-white">1,248</h3>
              </div>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#818cf8] to-[#4f46e5] flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                <Users size={20} className="text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#01b574] text-xs font-bold flex items-center">
                <TrendingUp size={12} className="mr-1" /> +12%
              </span>
              <span className="text-white/40 text-[11px]">Since last month</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111624] rounded-[20px] p-6 shadow-2xl border border-white/5 relative overflow-hidden h-[140px] flex flex-col justify-between group cursor-pointer transition-transform hover:-translate-y-1">
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#fbbf24]/5 blur-3xl rounded-full pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10 w-full h-full">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#fbbf24]/30 flex items-center justify-center flex-shrink-0 relative">
                <div className="absolute inset-0 border-2 border-[#fbbf24] rounded-full animate-[spin_4s_linear_infinite] border-t-transparent border-l-transparent"></div>
                <Clock size={22} className="text-[#fbbf24] drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
              </div>
              <div className="flex flex-col flex-1 pl-1">
                <p className="text-white/50 text-xs font-medium tracking-wide mb-1 uppercase">Pending</p>
                <div className="flex flex-col items-start gap-1">
                  <h3 className="text-3xl font-bold tracking-widest text-white shadow-black drop-shadow-md">24</h3>
                  <span className="text-[#fbbf24] text-[10px] font-bold bg-[#fbbf24]/10 px-2 py-0.5 rounded-full border border-[#fbbf24]/20 animate-pulse uppercase tracking-wider">Verifications</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-card/40 backdrop-blur-md rounded-[20px] p-6 shadow-2xl border-t border-l border-white/10 border-b-transparent border-r-transparent relative overflow-hidden h-[140px] flex flex-col justify-center items-center text-center group cursor-pointer transition-transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0ea5e9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-2 group-hover:-translate-y-1 transition-transform duration-300 border border-white/10 shadow-lg relative">
              <div className="absolute inset-0 bg-[#0ea5e9] opacity-20 blur-md rounded-2xl"></div>
              <ShieldCheck size={22} className="text-[#0ea5e9] relative z-10" />
            </div>
            <h3 className="text-2xl font-bold tracking-wide mb-0.5 text-white">86</h3>
            <p className="text-[#0ea5e9] text-[11px] font-bold tracking-wider uppercase">Verified Staff/Admin</p>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-r from-[#111624] to-[#151c3a] rounded-[20px] px-5 py-4 shadow-2xl border border-white/5 relative overflow-hidden h-[140px] flex flex-col justify-between cursor-pointer transition-transform hover:-translate-y-1">
            <p className="text-white/50 text-[11px] font-bold tracking-widest uppercase text-center relative z-10">Registered Users</p>
            <div className="flex items-center justify-center flex-1 w-full gap-4 mt-1 relative z-10">
              <h3 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-[#10b981] to-[#6ee7b7] drop-shadow-sm">1,138</h3>
              <div className="flex flex-col justify-center mt-1">
                <span className="flex items-center text-[11px] text-[#10b981] font-bold bg-[#10b981]/10 px-1.5 py-0.5 rounded-md mb-0.5"><UserPlus size={10} className="mr-1" /> +45</span>
                <span className="text-[10px] text-white/40 font-medium">This Week</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-10 flex items-end justify-center gap-[3px] px-4 opacity-15 pointer-events-none">
              <div className="w-full max-w-[8px] h-[30%] bg-[#10b981] rounded-t-sm"></div>
              <div className="w-full max-w-[8px] h-[50%] bg-[#10b981] rounded-t-sm"></div>
              <div className="w-full max-w-[8px] h-[25%] bg-[#10b981] rounded-t-sm"></div>
              <div className="w-full max-w-[8px] h-[60%] bg-[#10b981] rounded-t-sm"></div>
              <div className="w-full max-w-[8px] h-[80%] bg-[#10b981] rounded-t-sm"></div>
              <div className="w-full max-w-[8px] h-[100%] bg-[#10b981] rounded-t-sm"></div>
              <div className="w-full max-w-[8px] h-[70%] bg-[#10b981] rounded-t-sm"></div>
              <div className="w-full max-w-[8px] h-[40%] bg-[#10b981] rounded-t-sm"></div>
              <div className="w-full max-w-[8px] h-[90%] bg-[#10b981] rounded-t-sm"></div>
            </div>
          </div>
        </div>

        {/* Row 4: Live Map & History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
          
          {/* Live Map */}
          <div className="lg:col-span-8 bg-card rounded-2xl p-6 shadow-2xl border border-white/5 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h3 className="font-bold text-lg tracking-wide">Live Monitoring Map</h3>
                <p className="text-white/50 text-xs font-bold tracking-wide flex items-center gap-1.5 mt-2">
                  <CheckCircle2 size={14} className="text-[#01b574]" /> <span className="text-[#01b574]">{filteredMarkers.length} Active</span>
                </p>
              </div>

              {/* NEW MAP SEARCH BAR */}
              <div className="relative w-full sm:w-auto flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-red-500" />
                <input
                  type="text"
                  placeholder="Search devices or stations..."
                  value={mapSearchQuery}
                  onChange={(e) => setMapSearchQuery(e.target.value)}
                  className="bg-[#1a2235] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-red-500 transition-colors text-white placeholder:text-white/40 w-full sm:w-64 focus:ring-1 focus:ring-red-500 shadow-lg"
                  aria-label="Search map"
                />
              </div>
            </div>

            <div className="flex-1 w-full rounded-xl overflow-hidden relative border border-white/5 shadow-inner bg-[#111936]">
              <Suspense fallback={
                <div className="h-full w-full flex items-center justify-center text-white/40">
                  Loading Live Map...
                </div>
              }>
                <Map posix={[8.4772, 124.6459]} markers={filteredMarkers} />
              </Suspense>

              <div className="absolute top-4 right-4 flex flex-col gap-2 z-[400]">
                <div className="bg-card/90 backdrop-blur-md p-1.5 rounded-xl border border-white/10 flex flex-col gap-1 shadow-2xl">
                  <button className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium" aria-label="Zoom in">+</button>
                  <div className="h-[1px] w-full bg-white/10" />
                  <button className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium" aria-label="Zoom out">-</button>
                </div>
              </div>
            </div>
          </div>

          {/* History Overview */}
          <div className="lg:col-span-4 bg-card rounded-2xl p-6 shadow-2xl border border-white/5 relative flex flex-col pt-8">
            <h3 className="font-bold text-lg tracking-wide">History Overview</h3>
            <p className="text-white/50 text-sm font-bold mt-2 mb-10 tracking-wide"><span className="text-[#01b574]"></span> this month</p>

            <div className="relative flex-1 mt-2 px-2">
              <div className="flex gap-5 mb-8">
                <div className="flex flex-col items-center relative">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-teal-500 bg-transparent z-10 mt-1"></div>
                  <div className="w-[2px] h-full bg-white/5 absolute top-2 -bottom-8"></div>
                </div>
                <div className="pb-1 mt-[-2px]">
                  <p className="text-sm font-bold text-white/90">Location updated – Cagayan de Oro City</p>
                  <p className="text-[10px] text-white/50 font-bold mt-2 uppercase">Today 2:15 PM</p>
                </div>
              </div>

              <div className="flex gap-5 mb-8">
                <div className="flex flex-col items-center relative">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-red-500 bg-transparent z-10 mt-1"></div>
                  <div className="w-[2px] h-full bg-white/5 absolute top-2 -bottom-8"></div>
                </div>
                <div className="pb-1 mt-[-2px]">
                  <p className="text-sm font-bold text-red-400">Emergency button activated</p>
                  <p className="text-[10px] text-white/50 font-bold mt-2 uppercase">Yesterday 6:42 PM</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent pointer-events-none"></div>
          </div>
        </div>

        <footer className="w-full flex justify-between items-center text-xs text-white/40 pb-2 pt-6 px-2 font-bold tracking-wide">
          <p>© SmartGuide IoT 2026</p>
        </footer>
      </div>
    </div>
  );
}