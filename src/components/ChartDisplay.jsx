import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartDisplay({ numbers }) {
  const data = {
    labels: numbers.map((_, i) => `Value ${i + 1}`),
    datasets: [
      {
        label: "Numbers",
        data: numbers,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Number Distribution" },
    },
  };

  return <Bar data={data} options={options} />;
}
