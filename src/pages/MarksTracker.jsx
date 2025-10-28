import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
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
  const userId = localStorage.getItem("user_id");

  // Fetch marks
  const fetchMarks = async () => {
    const { data, error } = await supabase.from("marks").select("*").eq("user_id", userId);
    if (!error) setMarks(data);
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  // Add mark
  const addMark = async () => {
    if (!subject || score === "") return;
    const { error } = await supabase.from("marks").insert([
      { user_id: userId, subject, score: Number(score) },
    ]);
    if (!error) {
      setSubject("");
      setScore("");
      fetchMarks();
    }
  };

  // Delete mark
  const deleteMark = async (id) => {
    await supabase.from("marks").delete().eq("id", id);
    fetchMarks();
  };

  // Statistics
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

  const barData = {
    labels: marks.map((m) => m.subject),
    datasets: [{ label: "Scores", data: scores, backgroundColor: "rgba(75,192,192,0.6)" }],
  };

  const pieData = {
    labels: marks.map((m) => m.subject),
    datasets: [{ data: scores, backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#9966FF"] }],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Marks Tracker</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button onClick={addMark}>Add</button>
      </div>

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
          {marks.map((m) => (
            <tr key={m.id}>
              <td>{m.subject}</td>
              <td>{m.score}</td>
              <td>{new Date(m.date_added).toLocaleString()}</td>
              <td>
                <button onClick={() => deleteMark(m.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <h3>Statistics</h3>
        <p>Mean: {mean}</p>
        <p>Median: {median()}</p>
        <p>Mode (Most Common): {mode()}</p>
      </div>

      {marks.length > 0 && (
        <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
          <div style={{ width: "400px" }}>
            <h3>Bar Chart</h3>
            <Bar data={barData} />
          </div>
          <div style={{ width: "400px" }}>
            <h3>Pie Chart</h3>
            <Pie data={pieData} />
          </div>
        </div>
      )}
    </div>
  );
}
