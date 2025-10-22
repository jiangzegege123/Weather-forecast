import "./App.css";
import { useState } from "react";
import { useWeather } from "./hooks/useWeather";

function App() {
  const [city, setCity] = useState("");
  const { fetchWeather, fetchFutureWeather, data, futureData, loading, error } =
    useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      fetchFutureWeather(city);
    }
    console.log(data.location);
    console.log(futureData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 to-blue-200 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        🌦 Weather Forecast
      </h1>
      {/* search bar */}
      <form onSubmit={handleSubmit} className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

      {/* loading */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* current weather */}
      {data && data.current && (
        <div className="bg-white shadow-md rounded-xl p-6 w-80 text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            {data.location.name}, {data.location.country}
          </h2>
          <img
            src={`https:${data.current.condition.icon}`}
            alt={data.current.condition.text}
            className="mx-auto"
          />
          <p className="text-3xl font-bold text-blue-600">
            {data.current.temp_c}°C
          </p>
          <p className="text-gray-700">{data.current.condition.text}</p>
          <p className="text-sm text-gray-500 mt-2">
            Humidity: {data.current.humidity}% | Wind: {data.current.wind_kph}{" "}
            km/h
          </p>
        </div>
      )}

      {/* future 3 days weather */}
      {futureData && futureData.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {futureData.slice(1).map((day, i) => (
            <div
              key={i}
              className="bg-white shadow-sm rounded-lg p-4 w-60 text-center"
            >
              <p className="font-semibold text-gray-800 mb-1">{day.date}</p>
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="mx-auto"
              />
              <p className="text-gray-700">{day.day.condition.text}</p>
              <p className="text-blue-600 font-bold">
                {day.day.maxtemp_c}° / {day.day.mintemp_c}°
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
