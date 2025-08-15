import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem("username", username);
      window.location.reload();
    } else {
      alert("Please enter both fields");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📊 My Stats Tracker - Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "8px", margin: "5px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "8px", margin: "5px" }}
        />
        <br />
        <button type="submit" style={{ padding: "8px 15px" }}>
          Login
        </button>
      </form>
    </div>
  );
}
