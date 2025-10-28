import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Page imports
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MarksTracker from "./pages/MarksTracker";
import SavingsTracker from "./pages/SavingsTracker";
import Insights from "./pages/Insights";

export default function App() {
  const isLoggedIn = Boolean(localStorage.getItem("username"));

  return (
    <Routes>
      {/* If user is not logged in, show only the login page */}
      {!isLoggedIn ? (
        <Route path="*" element={<Login />} />
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/marks" element={<MarksTracker />} />
          <Route path="/savings" element={<SavingsTracker />} />
          <Route path="/insights" element={<Insights />} />

          {/* Redirect any unknown route back to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}
