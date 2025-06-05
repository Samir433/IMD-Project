import { useState } from "react";

export default function PredictionPage() {
  const [radiationType, setRadiationType] = useState("");
  const [forecastType, setForecastType] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchForecast() {
    setLoading(true);
    setError(null);
    setPreviewData(null); // Clear preview on new fetch

    let url = "";
    let body = {};

    if (forecastType === "Full Year") {
      url = "http://127.0.0.1:8000/predict_year";
      body = {
        year: parseInt(year, 10),
        model_type: radiationType.toLowerCase(),
      };
    } else if (forecastType === "Specific Date") {
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

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json();
        // Assuming the backend sends error details in errData.detail
        throw new Error(errData.detail || "Error fetching forecast");
      }

      const json = await res.json();

      let forecastsArray = null;
      if (forecastType === "Full Year") {
        forecastsArray = json.daily_forecasts;
      } else {
        forecastsArray = [json.forecast];
      }

      setForecastData(forecastsArray);
      setLoading(false);
      return forecastsArray;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }

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

  async function handlePreview() {
    setPreviewData(null);
    setError(null);
    const data = await fetchForecast();
    if (Array.isArray(data)) {
      setPreviewData(data.slice(0, 10)); // Preview only the first 10 entries
    } else {
      setPreviewData(null);
    }
  }

  async function handleDownload() {
    if (!forecastData) {
      // If forecastData is not yet set (e.g., user clicks download before preview)
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

  const inputsValid =
    radiationType &&
    forecastType &&
    ((forecastType === "Full Year" && year) ||
      (forecastType === "Specific Date" && date));

  return (
    <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col items-center">
      <section className="bg-white rounded-xl shadow-lg p-8 md:p-10 w-full max-w-3xl mb-12 border-t-4 border-blue-500 transition-shadow duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">
          Generate Radiation Forecast
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePreview();
          }}
          className="space-y-6"
        >
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Radiation Type */}
            <div className="flex flex-col">
              <label
                htmlFor="radiationType"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white
                   appearance-none bg-no-repeat bg-right-2 bg-center-y"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option value="">-- Select --</option>
                <option>Global</option>
                <option>Diffusion</option>
              </select>
            </div>

            {/* Forecast Type */}
            <div className="flex flex-col">
              <label
                htmlFor="forecastType"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Forecast Type:
              </label>
              <select
                id="forecastType"
                value={forecastType}
                onChange={(e) => {
                  setForecastType(e.target.value);
                  setPreviewData(null);
                  setError(null);
                  setYear(new Date().getFullYear()); // Reset year to current on type change
                  setDate(""); // Clear date on type change
                }}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white
                   appearance-none bg-no-repeat bg-right-2 bg-center-y"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option value="">-- Select --</option>
                <option>Full Year</option>
                <option>Specific Date</option>
              </select>
            </div>

            {/* Year / Date input */}
            <div className="flex flex-col">
              <label
                htmlFor="dateInput"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                {forecastType === "Full Year"
                  ? "Enter Year:"
                  : forecastType === "Specific Date"
                  ? "Enter Date:"
                  : "Year / Date:"}
              </label>
              {forecastType === "Full Year" ? (
                <input
                  id="dateInput"
                  type="number"
                  min="2021"
                  max="2050" // Adjusted max year to a reasonable future
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    setPreviewData(null);
                    setError(null);
                  }}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
              ) : forecastType === "Specific Date" ? (
                <input
                  id="dateInput"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setPreviewData(null);
                    setError(null);
                  }}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
              ) : (
                <input
                  id="dateInput"
                  type="text"
                  disabled
                  placeholder="Select forecast type"
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed text-gray-500"
                />
              )}
            </div>
          </div>

          {/* Buttons Row */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <button
              type="submit"
              disabled={!inputsValid || loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed
                             text-white px-8 py-3 rounded-full font-bold text-lg shadow-md
                             transition-colors duration-200 ease-in-out
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                {loading && !previewData ? "Fetching..." : "Preview Forecast"}
              </span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={!inputsValid || loading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed
                             text-white px-8 py-3 rounded-full font-bold text-lg shadow-md
                             transition-colors duration-200 ease-in-out
                             focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l3-3m-3 3l-3-3m2-8H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v0z"
                  ></path>
                </svg>
                Download CSV
              </span>
            </button>
          </div>

          {/* Loader / Error */}
          {loading && (
            <p className="mt-6 text-center text-blue-600 font-medium text-lg animate-pulse">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-r-transparent border-blue-500 mr-2"></span>
              Fetching data, please wait...
            </p>
          )}
          {error && (
            <div
              className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center"
              role="alert"
            >
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}
        </form>
      </section>

      {/* Preview Table */}
      {previewData && previewData.length > 0 && (
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full overflow-x-auto border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
            Forecast Preview
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                <tr>
                  {Object.keys(previewData[0] || {}).map((header) => (
                    <th
                      scope="col"
                      key={header}
                      className="px-6 py-3 text-left font-bold text-blue-800 tracking-wider"
                    >
                      {header.replaceAll("_", " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="bg-white border-b hover:bg-blue-50 transition-colors duration-150 ease-in-out"
                  >
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {typeof val === "number" ? val.toFixed(2) : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-gray-600 italic text-sm">
            Preview shows top {previewData.length} entries. Download the CSV for the full dataset.
          </p>
        </section>
      )}
      {previewData && previewData.length === 0 && !loading && !error && (
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg text-center">
          <p className="font-semibold">No data available for preview with the selected criteria.</p>
        </div>
      )}
    </main>
  );
}
