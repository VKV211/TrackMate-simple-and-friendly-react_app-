import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

export default function MarksTracker() {
  const [marks, setMarks] = useState([]);
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const storedMarks = JSON.parse(localStorage.getItem("marks")) || [];
    setMarks(storedMarks);
  }, []);

  // Add new mark (only in state, not saved yet)
  const addMark = () => {
    if (!subject || score === "") return;
    const date = new Date().toLocaleString();
    setMarks([...marks, { subject, score: Number(score), date }]);
    setSubject("");
    setScore("");
  };

  // Save marks to localStorage
  const saveMarks = () => {
    localStorage.setItem("marks", JSON.stringify(marks));
    alert("Marks saved successfully!");
  };

  // Delete mark
  const deleteMark = (index) => {
    const newMarks = marks.filter((_, i) => i !== index);
    setMarks(newMarks);
  };

  // Calculate stats
  const scores = marks.map((m) => m.score);
  const mean = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 0;
  const median = () => {
    if (!scores.length) return 0;
    const sorted = [...scores].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2)
      : sorted[mid];
  };
  const mode = () => {
    if (!scores.length) return 0;
    const freq = {};
    scores.forEach((n) => (freq[n] = (freq[n] || 0) + 1));
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.keys(freq).filter((n) => freq[n] === maxFreq).map(Number);
    return Math.max(...modes);
  };

  // Chart data
  const subjects = marks.map((m) => m.subject);
  const barData = {
    labels: subjects,
    datasets: [{ label: "Scores", data: scores, backgroundColor: "rgba(233, 57, 62, 0.6)" }],
  };
  const pieData = {
    labels: subjects,
    datasets: [{ data: scores, backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"] }],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Marks Tracker</h2>

      {/* Input Form */}
      <div style={{ marginBottom: "20px" }}>
        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <input type="number" placeholder="Score" value={score} onChange={(e) => setScore(e.target.value)} />
        <button onClick={addMark}>Add</button>
      </div>

      {/* Marks Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Score</th>
            <th>Date Added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((m, i) => (
            <tr key={i}>
              <td>{m.subject}</td>
              <td>{m.score}</td>
              <td>{m.date}</td>
              <td><button onClick={() => deleteMark(i)}>❌ Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save Button */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={saveMarks}>💾 Save</button>
      </div>

      {/* Statistics */}
      <div style={{ marginTop: "20px" }}>
        <h3>Statistics</h3>
        <p>Mean: {mean}</p>
        <p>Median: {median()}</p>
        <p>Mode (Highest): {mode()}</p>
      </div>

      {/* Charts */}
      {marks.length > 0 && (
        <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
          <div style={{ width: "400px" }}><h3>Bar Chart</h3><Bar data={barData} /></div>
          <div style={{ width: "400px" }}><h3>Pie Chart</h3><Pie data={pieData} /></div>
        </div>
      )}
    </div>
  );
}
