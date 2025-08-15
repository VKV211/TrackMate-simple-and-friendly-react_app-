import React, { useEffect, useState } from "react";

export default function Insights() {
  const [marks, setMarks] = useState([]);
  const [savings, setSavings] = useState([]);

  useEffect(() => {
    const storedMarks = JSON.parse(localStorage.getItem("marks")) || [];
    const storedSavings = JSON.parse(localStorage.getItem("savings")) || [];
    setMarks(storedMarks);
    setSavings(storedSavings);
  }, []);

  const totalMarks = marks.reduce((acc, curr) => acc + curr.score, 0);
  const averageMarks = marks.length > 0 ? (totalMarks / marks.length).toFixed(2) : 0;

  const totalSavings = savings.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Insights</h1>

      {/* Marks Section */}
      <section style={{ marginBottom: "40px" }}>
        <h2>Marks Overview</h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Score</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m, i) => (
              <tr key={i}>
                <td>{m.subject}</td>
                <td>{m.score}</td>
                <td>{m.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p><b>Total Marks:</b> {totalMarks}</p>
        <p><b>Average Marks:</b> {averageMarks}</p>
      </section>

      {/* Savings Section */}
      <section>
        <h2>Savings Overview</h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Month</th>
              <th>Amount</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {savings.map((s, i) => (
              <tr key={i}>
                <td>{s.month}</td>
                <td>{s.amount}</td>
                <td>{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p><b>Total Savings:</b> {totalSavings}</p>
      </section>
    </div>
  );
}
