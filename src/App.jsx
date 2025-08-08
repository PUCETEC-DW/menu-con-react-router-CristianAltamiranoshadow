import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Overview from "./pages/Overview";
import Members from "./pages/Members";
import Integrations from "./pages/Integrations";
import Messages from "./pages/Messages";
import Updates from "./pages/Updates";
import Mail from "./pages/Mail";

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/members" element={<Members />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/mail" element={<Mail />} />
        </Routes>
      </main>
    </div>
  );
}
