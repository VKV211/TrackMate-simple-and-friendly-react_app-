import React, { useState } from "react";

export default function InputForm({ setNumbers }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const numArray = input
      .split(",")
      .map((n) => parseFloat(n.trim()))
      .filter((n) => !isNaN(n));

    setNumbers(numArray);
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <label>Enter numbers (comma-separated):</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Example: 4, 8, 15, 16, 23, 42"
      />
      <button type="submit">Calculate</button>
    </form>
  );
}
