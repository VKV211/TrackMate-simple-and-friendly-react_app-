import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    if (isLogin) {
      // --- LOGIN FLOW ---
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error || !user) {
        alert("Invalid username or password.");
        return;
      }

      localStorage.setItem("username", user.username);
      localStorage.setItem("user_id", user.id);
      window.location.reload();
    } else {
      // --- SIGNUP FLOW ---
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (existingUser) {
        alert("Username already exists! Please login instead.");
        setIsLogin(true);
        return;
      }

      // Create new user
      const { data, error } = await supabase
        .from("users")
        .insert([{ username, password }])
        .select()
        .single();

      if (error) {
        console.error(error);
        alert("Error creating user. Try again.");
        return;
      }

      localStorage.setItem("username", data.username);
      localStorage.setItem("user_id", data.id);
      window.location.reload();
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>📊 My Stats Tracker</h1>
      <h3>{isLogin ? "Login to your account" : "Create a new account"}</h3>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "8px", margin: "5px", width: "200px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "8px", margin: "5px", width: "200px" }}
        />
        <br />
        <button
          type="submit"
          style={{
            padding: "8px 15px",
            marginTop: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        {isLogin ? "New user?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}
