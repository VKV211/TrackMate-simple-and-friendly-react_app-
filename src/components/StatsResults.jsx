import React from "react";

function calculateMean(arr) {
  return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
}

function calculateMedian(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2);
}

function calculateMode(arr) {
  const freq = {};
  arr.forEach((n) => (freq[n] = (freq[n] || 0) + 1));

  const maxFreq = Math.max(...Object.values(freq));
  const modes = Object.keys(freq)
    .filter((n) => freq[n] === maxFreq)
    .map(Number); // convert back to numbers

  // Return only the highest numeric mode
  return Math.max(...modes);
}

function calculateRange(arr) {
  return Math.max(...arr) - Math.min(...arr);
}

export default function StatsResults({ numbers }) {
  return (
    <div className="results">
      <h2>Results:</h2>
      <p><strong>Mean:</strong> {calculateMean(numbers)}</p>
      <p><strong>Median:</strong> {calculateMedian(numbers)}</p>
      <p><strong>Mode:</strong> {calculateMode(numbers)}</p>
      <p><strong>Range:</strong> {calculateRange(numbers)}</p>
    </div>
  );
}
