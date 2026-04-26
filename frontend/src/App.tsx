import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "@/pages/SignIn";
import DashboardLayout from "@/pages/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import ActiveUsersPage from "@/pages/ActiveUsers";
import DevicePage from "@/pages/Device";
import EmergencyPage from "@/pages/Emergency";
import ProfilePage from "@/pages/Profile";
import SettingsPage from "@/pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="device" element={<DevicePage />} />
          <Route path="emergency" element={<EmergencyPage />} />
          <Route path="active-users" element={<ActiveUsersPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}