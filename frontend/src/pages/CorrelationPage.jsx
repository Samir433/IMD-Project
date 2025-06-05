import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { SimpleLinearRegression } from "ml-regression-simple-linear";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

const Correlation = () => {
  const [data, setData] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [radiationType, setRadiationType] = useState("Global");
  const [yParam, setYParam] = useState("MAX");
  const [r2Score, setR2Score] = useState(null);
  const [chartData, setChartData] = useState(null);

  const r2ScoreCalc = (yTrue, yPred) => {
    const mean = yTrue.reduce((a, b) => a + b, 0) / yTrue.length;
    const ssTot = yTrue.reduce((sum, val) => sum + (val - mean) ** 2, 0);
    const ssRes = yTrue.reduce((sum, val, i) => sum + (val - yPred[i]) ** 2, 0);
    return 1 - ssRes / ssTot;
  };

  useEffect(() => {
    Papa.parse("/result.csv", {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results) => {
        const parsed = results.data
          .filter(row => row.Date)
          .map((row) => ({
            ...row,
            Date: new Date(row.Date),
            Year: new Date(row.Date).getFullYear(),
          }));

        setData(parsed);
        const years = [...new Set(parsed.map((row) => row.Year))].sort();
        setYearOptions(years);
        setSelectedYear(years[years.length - 1]);
      },
    });
  }, []);

  useEffect(() => {
    if (!data.length || !selectedYear || !yParam) return;

    const radKey = radiationType === "Global" ? "Glob_Rad" : "Diff_Rad";

    const filtered = data.filter(
      (d) =>
        d.Year === selectedYear &&
        d[radKey] != null &&
        d[yParam] != null &&
        !isNaN(d[radKey]) &&
        !isNaN(d[yParam])
    );

    if (filtered.length < 2) {
      setChartData(null);
      return;
    }

    const x = filtered.map((d) => d[radKey]);
    const y = filtered.map((d) => d[yParam]);

    const regression = new SimpleLinearRegression(x, y);
    const yPred = x.map((xi) => regression.predict(xi));
    const r2 = r2ScoreCalc(y, yPred);
    setR2Score(r2.toFixed(4));

    const scatterPoints = x.map((xi, i) => ({ x: xi, y: y[i] }));
    const linePoints = x.map((xi) => ({ x: xi, y: regression.predict(xi) }));

    setChartData({
      datasets: [
        {
          label: "Data Points",
          data: scatterPoints,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          pointRadius: 5,
        },
        {
          label: "Regression Line",
          data: linePoints,
          type: "line",
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
          pointRadius: 0,
          tension: 0,
        },
      ],
    });
  }, [data, selectedYear, radiationType, yParam]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Radiation Correlation Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block font-medium">Select Year:</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Radiation Type:</label>
          <select
            className="w-full border p-2 rounded"
            value={radiationType}
            onChange={(e) => setRadiationType(e.target.value)}
          >
            <option value="Global">Global Radiation</option>
            <option value="Diffusion">Diffusion Radiation</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Y-axis Parameter:</label>
          <select
            className="w-full border p-2 rounded"
            value={yParam}
            onChange={(e) => setYParam(e.target.value)}
          >
            <option value="MAX">MAX</option>
            <option value="MIN">MIN</option>
            <option value="EVP">EVP</option>
            <option value="SSH">SSH</option>
          </select>
        </div>
      </div>

      {chartData ? (
        <>
          <Scatter data={chartData} options={{ responsive: true }} />
          <p className="mt-4 text-lg">
            <strong>R² Score:</strong> {r2Score}
          </p>
        </>
      ) : (
        <p className="text-red-600">Not enough data to compute regression.</p>
      )}
    </div>
  );
};

export default Correlation;
