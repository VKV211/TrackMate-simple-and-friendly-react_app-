import React from "react";

/* ---------- Helper Functions ---------- */
function calculateMean(arr) {
  if (!arr.length) return 0;
  const total = arr.reduce((sum, num) => sum + num, 0);
  return (total / arr.length).toFixed(2);
}

function calculateMedian(arr) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[mid]
    : ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2);
}

function calculateMode(arr) {
  if (!arr.length) return 0;
  const frequency = {};
  arr.forEach((num) => (frequency[num] = (frequency[num] || 0) + 1));

  const maxFreq = Math.max(...Object.values(frequency));
  const modes = Object.keys(frequency)
    .filter((n) => frequency[n] === maxFreq)
    .map(Number);

  // Return the smallest mode if multiple exist
  return modes.length === 1 ? modes[0] : Math.min(...modes);
}

function calculateRange(arr) {
  if (!arr.length) return 0;
  return (Math.max(...arr) - Math.min(...arr)).toFixed(2);
}

/* ---------- Component ---------- */
export default function StatsResults({ numbers }) {
  if (!numbers.length)
    return <p style={{ color: "gray" }}>Enter some numbers to see results.</p>;

  return (
    <div className="results">
      <h2>📊 Results</h2>
      <p>
        <strong>Mean:</strong> {calculateMean(numbers)}
      </p>
      <p>
        <strong>Median:</strong> {calculateMedian(numbers)}
      </p>
      <p>
        <strong>Mode:</strong> {calculateMode(numbers)}
      </p>
      <p>
        <strong>Range:</strong> {calculateRange(numbers)}
      </p>
    </div>
  );
}
