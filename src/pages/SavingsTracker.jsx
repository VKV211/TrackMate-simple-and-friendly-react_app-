import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SavingsTracker() {
  const [savings, setSavings] = useState([]);
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("user_id");

  // Fetch savings for logged-in user
  const fetchSavings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("savings")
      .select("*")
      .eq("user_id", userId)
      .order("date_added", { ascending: false });

    if (error) {
      console.error("Error fetching savings:", error.message);
    } else {
      setSavings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSavings();
  }, []);

  // Add new saving record
  const addSaving = async () => {
    if (!month || amount === "") {
      alert("Please enter both month and amount");
      return;
    }

    const { error } = await supabase
      .from("savings")
      .insert([{ user_id: userId, month, amount: Number(amount) }]);

    if (error) {
      alert("Error saving data: " + error.message);
    } else {
      setMonth("");
      setAmount("");
      fetchSavings();
    }
  };

  // Delete a saving
  const deleteSaving = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    const { error } = await supabase.from("savings").delete().eq("id", id);
    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      fetchSavings();
    }
  };

  // Total savings
  const totalSavings = savings.reduce((sum, s) => sum + Number(s.amount), 0);

  // Chart.js Data
  const chartData = {
    labels: savings.map((s) => s.month),
    datasets: [
      {
        label: "Monthly Savings (₹)",
        data: savings.map((s) => s.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Savings Overview",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💰 Savings Tracker</h2>

      {/* Input Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ padding: "8px", margin: "5px" }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: "8px", margin: "5px" }}
        />
        <button
          onClick={addSaving}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          ➕ Add
        </button>
      </div>

      {/* Table Section */}
      {loading ? (
        <p>Loading savings...</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            maxWidth: "700px",
            marginBottom: "30px",
          }}
        >
          <thead style={{ background: "#f2f2f2" }}>
            <tr>
              <th>Month</th>
              <th>Amount (₹)</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savings.length > 0 ? (
              savings.map((s) => (
                <tr key={s.id}>
                  <td>{s.month}</td>
                  <td>₹{s.amount}</td>
                  <td>
                    {s.date_added
                      ? new Date(s.date_added).toLocaleString()
                      : "—"}
                  </td>
                  <td>
                    <button
                      onClick={() => deleteSaving(s.id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No savings added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Total */}
      <div
        style={{
          marginTop: "10px",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Total Savings: ₹{totalSavings}
      </div>

      {/* Bar Chart Section */}
      {savings.length > 0 && (
        <div style={{ marginTop: "40px", maxWidth: "700px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}
