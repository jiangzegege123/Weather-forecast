import "./App.css";
import { useState } from "react";
import { useWeather } from "./hooks/useWeather";

function App() {
  const [city, setCity] = useState("");
  const {
    fetchWeather,
    fetchFutureWeather,
    data,
    futureData,
    loading,
    error,
    futureError,
    futureLoading,
  } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      fetchFutureWeather(city);
    }
  };

  const isLoading = loading || futureLoading;
  const hasWeather =
    data && data.current && futureData && futureData.length > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-sky-100 via-sky-200 to-sky-300 font-sans">
      {/* 🌤 Weather Card (always visible) */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 w-full max-w-3xl min-h-[520px] flex flex-col items-center justify-center transition-transform hover:scale-[1.01]">
        {/* 📍 Card Header */}
        <h1 className="text-2xl font-bold text-sky-700 mb-6">
          🌦 Weather Forecast
        </h1>

        {/* 🧭 Search form — shown by default, always visible on top */}
        <form
          onSubmit={handleSubmit}
          className="flex space-x-2 mb-8 justify-center"
        >
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-56 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            type="submit"
            className="bg-sky-500 text-white px-5 py-2 rounded-lg hover:bg-sky-600 transition"
          >
            Search
          </button>
        </form>

        {/* 🌀 Loading */}
        {isLoading && (
          <p className="text-sky-600 text-lg font-medium animate-pulse">
            Loading weather data...
          </p>
        )}

        {/* ⚠️ Error */}
        {!isLoading && (error || futureError) && (
          <p className="text-red-500 text-lg">
            {error || futureError || "Failed to load weather data."}
          </p>
        )}

        {/* 🔍 Default (no data yet) */}
        {!isLoading && !hasWeather && !error && !futureError && (
          <p className="text-gray-600 text-center text-lg">
            🔍 Search for a city to view weather information.
          </p>
        )}

        {/* 🌤 Weather Display */}
        {!isLoading && hasWeather && (
          <>
            {/* Today’s Weather */}
            <div className="flex flex-col items-center border-t border-gray-300 pt-6 pb-6 mb-6 w-full">
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                {data.location.name}, {data.location.country}
              </h2>
              <img
                src={`https:${data.current.condition.icon}`}
                alt={data.current.condition.text}
                className="w-24 h-24"
              />
              <p className="text-5xl font-bold text-sky-600">
                {data.current.temp_c}°C
              </p>
              <p className="text-lg text-gray-700 mt-1">
                {data.current.condition.text}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                💧 {data.current.humidity}% | 🌬 {data.current.wind_kph} km/h
              </p>
            </div>

            {/* Next 3 Days */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {futureData.slice(1, 4).map((day, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-b from-sky-50 to-sky-100 rounded-xl shadow-inner text-center p-4 hover:shadow-md transition"
                >
                  <p className="font-semibold text-gray-700 mb-1">{day.date}</p>
                  <img
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                    className="w-12 h-12 mx-auto"
                  />
                  <p className="text-gray-600">{day.day.condition.text}</p>
                  <p className="text-sky-700 font-bold mt-1">
                    {day.day.maxtemp_c}° / {day.day.mintemp_c}°
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
