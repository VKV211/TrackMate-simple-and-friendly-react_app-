import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Insights() {
  const [marks, setMarks] = useState([]);
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [marksRes, savingsRes] = await Promise.all([
        supabase.from("marks").select("*").eq("user_id", userId),
        supabase.from("savings").select("*").eq("user_id", userId),
      ]);

      if (marksRes.error) console.error("Marks fetch error:", marksRes.error.message);
      if (savingsRes.error) console.error("Savings fetch error:", savingsRes.error.message);

      setMarks(marksRes.data || []);
      setSavings(savingsRes.data || []);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading insights...</p>;

  // ---------- Marks Insights ----------
  const scores = marks.map((m) => m.score);
  const totalMarks = scores.reduce((a, b) => a + b, 0);
  const averageMarks = scores.length ? (totalMarks / scores.length).toFixed(2) : 0;

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
    const modes = Object.keys(freq)
      .filter((n) => freq[n] === maxFreq)
      .map(Number);
    return Math.max(...modes);
  };

  // ---------- Savings Insights ----------
  const totalSavings = savings.reduce((a, b) => a + Number(b.amount), 0);
  const averageSavings = savings.length
    ? (totalSavings / savings.length).toFixed(2)
    : 0;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Insights Dashboard</h1>
      <p style={{ color: "gray" }}>
        Here’s your overall performance and financial progress summary.
      </p>

      {/* ---------- Marks Overview ---------- */}
      <section style={{ marginTop: "40px" }}>
        <h2>🎓 Marks Overview</h2>
        {marks.length > 0 ? (
          <>
            <table
              border="1"
              cellPadding="10"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "800px",
              }}
            >
              <thead style={{ background: "#f2f2f2" }}>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Date Added</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((m) => (
                  <tr key={m.id}>
                    <td>{m.subject}</td>
                    <td>{m.score}</td>
                    <td>{new Date(m.date_added).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "15px" }}>
              <p>
                <b>Total Marks:</b> {totalMarks}
              </p>
              <p>
                <b>Average Marks:</b> {averageMarks}
              </p>
              <p>
                <b>Median:</b> {median()}
              </p>
              <p>
                <b>Mode (Most Common Score):</b> {mode()}
              </p>
            </div>
          </>
        ) : (
          <p>No marks data found.</p>
        )}
      </section>

      {/* ---------- Savings Overview ---------- */}
      <section style={{ marginTop: "40px" }}>
        <h2>💰 Savings Overview</h2>
        {savings.length > 0 ? (
          <>
            <table
              border="1"
              cellPadding="10"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "800px",
              }}
            >
              <thead style={{ background: "#f2f2f2" }}>
                <tr>
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Date Added</th>
                </tr>
              </thead>
              <tbody>
                {savings.map((s) => (
                  <tr key={s.id}>
                    <td>{s.month}</td>
                    <td>₹{s.amount}</td>
                    <td>{new Date(s.date_added).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "15px" }}>
              <p>
                <b>Total Savings:</b> ₹{totalSavings}
              </p>
              <p>
                <b>Average Monthly Savings:</b> ₹{averageSavings}
              </p>
            </div>
          </>
        ) : (
          <p>No savings data found.</p>
        )}
      </section>

      {/* ---------- Summary Insight ---------- */}
      <section
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#eaf4fc",
          borderRadius: "8px",
        }}
      >
        <h3>🧠 Overall Summary</h3>
        <p>
          <b>Academic Performance:</b>{" "}
          {averageMarks >= 80
            ? "Excellent 🎉"
            : averageMarks >= 60
            ? "Good 😊"
            : "Needs Improvement 📘"}
        </p>
        <p>
          <b>Financial Discipline:</b>{" "}
          {averageSavings >= 5000
            ? "Great Saver 💰"
            : averageSavings >= 2000
            ? "Average Saver 👍"
            : "Try to Save More 💡"}
        </p>
      </section>
    </div>
  );
}
