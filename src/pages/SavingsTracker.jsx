import React, { useState, useEffect } from "react";

export default function SavingsTracker() {
  const [savings, setSavings] = useState([]);
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");

  // Load from localStorage
  useEffect(() => {
    const storedSavings = JSON.parse(localStorage.getItem("savings")) || [];
    setSavings(storedSavings);
  }, []);

  // Add saving (only in state)
  const addSaving = () => {
    if (!month || amount === "") return;
    const date = new Date().toLocaleString();
    setSavings([...savings, { month, amount: Number(amount), date }]);
    setMonth("");
    setAmount("");
  };

  // Save to localStorage
  const saveSavings = () => {
    localStorage.setItem("savings", JSON.stringify(savings));
    alert("Savings saved successfully!");
  };

  // Delete saving
  const deleteSaving = (index) => {
    const updated = savings.filter((_, i) => i !== index);
    setSavings(updated);
  };

  // Total savings
  const totalSavings = savings.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>💰 Savings Tracker</h2>

      {/* Input Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addSaving}>Add</button>
      </div>

      {/* Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
            <th>Date Added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {savings.map((s, i) => (
            <tr key={i}>
              <td>{s.month}</td>
              <td>{s.amount}</td>
              <td>{s.date}</td>
              <td>
                <button onClick={() => deleteSaving(i)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save Button */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={saveSavings}>💾 Save</button>
      </div>

      {/* Summary */}
      <div style={{ marginTop: "20px" }}>
        <h3>Total Savings: {totalSavings}</h3>
      </div>
    </div>
  );
}
