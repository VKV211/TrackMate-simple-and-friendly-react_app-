import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartDisplay({ numbers }) {
  if (!numbers.length)
    return <p style={{ color: "gray" }}>No data to display.</p>;

  const data = {
    labels: numbers.map((_, i) => `Value ${i + 1}`),
    datasets: [
      {
        label: "Entered Numbers",
        data: numbers,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Number Distribution",
        font: { size: 18 },
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
