import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const username = localStorage.getItem("username");

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Welcome, {username} 👋</h1>
      <p>Choose a tracker:</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/marks">
          <button style={{ padding: "10px 20px", margin: "5px" }}>
            Marks Tracker
          </button>
        </Link>
        <Link to="/savings">
          <button style={{ padding: "10px 20px", margin: "5px" }}>
            Savings Tracker
          </button>
        </Link>
        <Link to="/insights">
          <button style={{ padding: "10px 20px", margin: "5px" }}>
            Insights
          </button>
        </Link>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            localStorage.removeItem("username");
            window.location.reload();
          }}
          style={{ padding: "10px 20px", backgroundColor: "red", color: "white" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
