import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MarksTracker from "./pages/MarksTracker";
import SavingsTracker from "./pages/SavingsTracker";
import Insights from "./pages/Insights";

export default function App() {
  const isLoggedIn = localStorage.getItem("username");

  return (
    <Routes>
      {!isLoggedIn ? (
        <Route path="*" element={<Login />} />
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/marks" element={<MarksTracker />} />
          <Route path="/savings" element={<SavingsTracker />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}
