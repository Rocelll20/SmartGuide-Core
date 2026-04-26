import React from "react";
import {
  LayoutDashboard,
  AlertCircle,
  Users,
  Settings,
  LogOut,
  UserStar,
  Monitor,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/dashboard" },
    { icon: <Monitor size={18} />, label: "Device", href: "/dashboard/device" },
    { icon: <AlertCircle size={18} />, label: "Emergency", href: "/dashboard/emergency" },
    { icon: <UserStar size={18} />, label: "Active Users", href: "/dashboard/active-users" },
  ];

  const accountItems = [
    { icon: <Users size={18} />, label: "Profile", href: "/dashboard/profile" },
    { icon: <Settings size={18} />, label: "Settings", href: "/dashboard/settings" },
  ];

  const isActiveRoute = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="fixed left-4 top-4 bottom-4 w-64 bg-sidebar rounded-2xl flex flex-col z-50 hidden md:flex shadow-xl border border-sidebar-border">

      {/* Brand Header */}
      <Link
        to="/dashboard"
        className="flex items-center gap-2 border-b border-sidebar-border mx-4 py-6"
      >
        <img src="/assets/smart-guide-no-bg.png" alt="Logo" width={60} height={60} />
        <h1 className="text-[15px] font-bold tracking-widest uppercase text-sidebar-foreground">
          SmartGuide
        </h1>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">

        {/* Main Menu */}
        {menuItems.map((item) => {
          const isActive = isActiveRoute(item.href);

          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg" : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isActive ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground" : "bg-muted text-sidebar-primary"}`}>
                {item.icon}
              </div>
              <span className={`text-[13.5px] tracking-wide ${isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Account Section */}
        <div className="pt-6 mt-6">
          <p className="text-[11px] font-bold text-muted-foreground mb-4 tracking-wider uppercase">
            Account
          </p>

          {accountItems.map((item) => {
            const isActive = isActiveRoute(item.href);

            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg" : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isActive ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground" : "bg-muted text-sidebar-primary"}`}>
                  {item.icon}
                </div>
                <span className={`text-[13.5px] tracking-wide ${isActive ? "font-bold" : "font-medium"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Logout */}
          <Link
            to="/"
            className="flex items-center gap-4 px-4 py-3 rounded-2xl text-destructive hover:bg-sidebar-accent transition-all mt-2"
          >
            <div className="w-8 h-8 rounded-full bg-muted text-destructive flex items-center justify-center shrink-0">
              <LogOut size={18} />
            </div>
            <span className="font-medium text-[13.5px] tracking-wide">
              Logout
            </span>
          </Link>
        </div>
      </nav>

      {/* Bottom User Avatar */}
      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full border border-sidebar-border flex items-center justify-center text-sidebar-foreground font-bold text-sm bg-muted shadow-inner cursor-pointer hover:border-ring transition-colors">
          N
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;