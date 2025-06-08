import { useState } from "react";

export default function PredictionPage() {
  // UI and state management hooks
  const [radiationType, setRadiationType] = useState("");
  const [forecastType, setForecastType] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch forecast data from backend API
  async function fetchForecast() {
    setLoading(true);
    setError(null);
    setPreviewData(null); // Clear previous preview

    let url = "";
    let body = {};

    // Determine API endpoint and payload based on forecast type
    if (forecastType === "Full Year") {
      url = "http://127.0.0.1:8000/predict_year";
      body = {
        year: parseInt(year, 10),
        model_type: radiationType.toLowerCase(),
      };
    } else if (forecastType === "Specific Date") {
      // Ensure valid radiation type for date-specific forecasts
      if (
        radiationType.toLowerCase() !== "diffusion" &&
        radiationType.toLowerCase() !== "global"
      ) {
        setError(
          "Date forecast is only supported for Global and Diffusion radiation types."
        );
        setLoading(false);
        return null;
      }
      url = "http://127.0.0.1:8000/predict_date";
      body = {
        date,
        model_type: radiationType.toLowerCase(),
      };
    } else {
      setError("Please select a forecast type.");
      setLoading(false);
      return null;
    }

    // Perform API request
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Error fetching forecast");
      }

      const json = await res.json();

      // Normalize response format to array
      const forecastsArray =
        forecastType === "Full Year"
          ? json.daily_forecasts
          : [json.forecast];

      setForecastData(forecastsArray);
      setLoading(false);
      return forecastsArray;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }

  // Converts forecast data array to CSV string
  function convertToCSV(data) {
    if (!Array.isArray(data) || data.length === 0) {
      console.error("convertToCSV: expected non-empty array, got:", data);
      return "";
    }

    const header = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) =>
          typeof val === "string" && val.includes(",") ? `"${val}"` : val
        )
        .join(",")
    );

    return [header, ...rows].join("\r\n");
  }

  // Triggers CSV download for forecast data
  function downloadCSV(data, filename) {
    const csv = convertToCSV(data);
    if (!csv) {
      console.error("downloadCSV: no CSV content generated.");
      return;
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Preview button handler: fetch and show top 10 records
  async function handlePreview() {
    setPreviewData(null);
    setError(null);
    const data = await fetchForecast();
    if (Array.isArray(data)) {
      setPreviewData(data.slice(0, 10)); // Preview only top 10 records
    } else {
      setPreviewData(null);
    }
  }

  // Download button handler: fetch if needed, then download full dataset
  async function handleDownload() {
    if (!forecastData) {
      const data = await fetchForecast();
      if (!Array.isArray(data)) return;
      const filename =
        forecastType === "Full Year"
          ? `${radiationType.toLowerCase()}_${year}.csv`
          : `${radiationType.toLowerCase()}_${date}.csv`;
      downloadCSV(data, filename);
    } else {
      const filename =
        forecastType === "Full Year"
          ? `${radiationType.toLowerCase()}_${year}.csv`
          : `${radiationType.toLowerCase()}_${date}.csv`;
      downloadCSV(forecastData, filename);
    }
  }

  // Validation check before enabling preview/download
  const inputsValid =
    radiationType &&
    forecastType &&
    ((forecastType === "Full Year" && year) ||
      (forecastType === "Specific Date" && date));

  return (
    <main className="p-5 w-full">
      {/* Forecast Input Section */}
      <section className="backdrop-blur-xl bg-gray-900/20 border border-gray-800/40 rounded-md shadow-lg p-6 w-full mb-6">
        <h2 className="text-xl font-bold text-center text-cyan-300 mb-6">
          Generate Radiation Forecast
        </h2>

        {/* Forecast Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePreview();
          }}
          className="space-y-5"
        >
          {/* Forecast Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Radiation Type Selection */}
            <div className="flex flex-col">
              <label htmlFor="radiationType" className="text-sm font-semibold text-gray-300 mb-2">
                Radiation Type:
              </label>
              <select
                id="radiationType"
                value={radiationType}
                onChange={(e) => {
                  setRadiationType(e.target.value);
                  setPreviewData(null);
                  setError(null);
                }}
                className="glass-select bg-gray-800 text-gray-200 py-2 px-3"
              >
                <option value="">-- Select --</option>
                <option>Global</option>
                <option>Diffusion</option>
              </select>
            </div>

            {/* Forecast Type Selection */}
            <div className="flex flex-col">
              <label htmlFor="forecastType" className="text-sm font-semibold text-gray-300 mb-2">
                Forecast Type:
              </label>
              <select
                id="forecastType"
                value={forecastType}
                onChange={(e) => {
                  setForecastType(e.target.value);
                  setPreviewData(null);
                  setError(null);
                }}
                className="glass-select bg-gray-800 text-gray-200 py-2 px-3"
              >
                <option value="">-- Select --</option>
                <option>Full Year</option>
                <option>Specific Date</option>
              </select>
            </div>

            {/* Conditional Year or Date Input */}
            {forecastType === "Full Year" && (
              <div className="flex flex-col">
                <label htmlFor="yearInput" className="text-sm font-semibold text-gray-300 mb-2">
                  Year:
                </label>
                <input
                  type="number"
                  id="yearInput"
                  value={year}
                  min="2015"
                  max="2030"
                  onChange={(e) => setYear(e.target.value)}
                  className="glass-input bg-gray-800 text-gray-200 py-2 px-3"
                />
              </div>
            )}

            {forecastType === "Specific Date" && (
              <div className="flex flex-col">
                <label htmlFor="dateInput" className="text-sm font-semibold text-gray-300 mb-2">
                  Date:
                </label>
                <input
                  type="date"
                  id="dateInput"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="glass-input bg-gray-800 text-gray-200 py-2 px-3"
                />
              </div>
            )}
          </div>

          {/* Preview & Download Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-3 mt-6">
            <button
              type="submit"
              disabled={!inputsValid || loading}
              className={`border border-cyan-700/40 text-cyan-300 px-5 py-2 rounded-md font-medium hover:bg-cyan-900/30 transition-all duration-200 ${
                !inputsValid || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Loading..." : "Predict Radiation"}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={(!forecastData && !inputsValid) || loading}
              className={`border border-cyan-700/40 text-cyan-300 px-5 py-2 rounded-md font-medium hover:bg-cyan-900/30 transition-all duration-200 ${
                (!forecastData && !inputsValid) || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Download CSV
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/30 border border-red-700/40 text-red-200 p-3 rounded-md text-sm mt-5 backdrop-blur-xl">
              {error}
            </div>
          )}
        </form>
      </section>

      {/* Forecast Preview Table */}
      {previewData && (
        <section className="backdrop-blur-xl bg-gray-900/20 border border-gray-800/40 rounded-md p-6 w-full">
          <h3 className="text-lg font-semibold text-cyan-300 mb-5">
            Forecast Preview
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700/40">
              <thead>
                <tr>
                  {Object.keys(previewData[0]).map((key) => (
                    <th
                      key={key}
                      className="px-5 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/40">
                {previewData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-black/10">
                    {Object.values(row).map((val, i) => (
                      <td
                        key={i}
                        className="px-5 py-3 text-sm text-gray-300 whitespace-nowrap"
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm mt-5">
            Showing {previewData.length} records out of{" "}
            {forecastData?.length || "?"}.
          </p>
        </section>
      )}
    </main>
  );
}
