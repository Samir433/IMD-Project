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
          backgroundColor: "rgba(100, 210, 255, 0.6)",
          pointRadius: 5,
        },
        {
          label: "Regression Line",
          data: linePoints,
          type: "line",
          borderColor: "rgba(0, 255, 200, 0.8)",
          fill: false,
          pointRadius: 0,
          tension: 0,
        },
      ],
    });
  }, [data, selectedYear, radiationType, yParam]);

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: radiationType === "Global" ? "Global Radiation" : "Diffusion Radiation",
          color: '#9ca3af',
          padding: 10,
        },
        ticks: {
          color: '#9ca3af',
          padding: 8,
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        }
      },
      y: {
        title: {
          display: true,
          text: yParam,
          color: '#9ca3af',
          padding: 10,
        },
        ticks: {
          color: '#9ca3af',
          padding: 8,
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        }
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#d1d5db',
        bodyColor: '#d1d5db',
        borderColor: 'rgba(75, 85, 99, 0.2)',
        borderWidth: 1,
        padding: 10,
      },
      legend: {
        labels: {
          color: '#d1d5db',
          padding: 15,
          font: {
            size: 12
          }
        },
        padding: 20,
      },
    },
    layout: {
      padding: {
        top: 15,
        right: 20,
        bottom: 15,
        left: 20
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-5 w-full">
      <h2 className="text-xl font-bold mb-6 text-cyan-300">Radiation Correlation Analysis</h2>

      <div className="backdrop-blur-xl bg-gray-900/20 border border-gray-800/40 rounded-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block font-medium text-gray-300 mb-2">Select Year:</label>
            <select
              className="glass-select bg-gray-800 text-gray-200 py-2 px-3"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year} className="bg-gray-800 text-gray-200">
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-300 mb-2">Radiation Type:</label>
            <select
              className="glass-select bg-gray-800 text-gray-200 py-2 px-3"
              value={radiationType}
              onChange={(e) => setRadiationType(e.target.value)}
            >
              <option value="Global" className="bg-gray-800 text-gray-200">Global Radiation</option>
              <option value="Diffusion" className="bg-gray-800 text-gray-200">Diffusion Radiation</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-300 mb-2">Y-axis Parameter:</label>
            <select
              className="glass-select bg-gray-800 text-gray-200 py-2 px-3"
              value={yParam}
              onChange={(e) => setYParam(e.target.value)}
            >
              <option value="MAX" className="bg-gray-800 text-gray-200">MAX</option>
              <option value="MIN" className="bg-gray-800 text-gray-200">MIN</option>
              <option value="EVP" className="bg-gray-800 text-gray-200">EVP</option>
              <option value="SSH" className="bg-gray-800 text-gray-200">SSH</option>
            </select>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-gray-900/20 border border-gray-800/40 rounded-md p-6">
        {chartData ? (
          <>
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-md p-5 mb-5 border border-gray-800/30" style={{ height: "420px" }}>
              <Scatter data={chartData} options={chartOptions} />
            </div>
            <div className="text-center">
              <p className="mt-5 inline-block px-5 py-2 rounded-md bg-cyan-900/30 text-cyan-300 border border-cyan-800/40 backdrop-blur-xl">
                <strong>R² Score:</strong> {r2Score}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-14">
            <p className="text-red-400">Not enough data to compute regression.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Correlation;
