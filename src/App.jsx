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
    setData,
    setFutureData,
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
    <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-linear-to-b from-sky-100 via-sky-200 to-sky-300">
      {/* Weather Card */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 w-full max-w-3xl min-h-[520px] flex flex-col items-center justify-center transition-transform hover:scale-[1.01]">
        {/* The searching section */}
        {!isLoading && !data && !error && !futureError && (
          <>
            <div className="flex flex-col items-center space-y-6">
              {/* Search Box */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center bg-white shadow-md rounded-full px-4 py-2 w-[340px] sm:w-[400px] focus-within:ring-2 focus-within:ring-sky-400 transition"
              >
                <input
                  type="text"
                  placeholder="Enter city name..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="grow text-gray-700 px-3 py-2 rounded-full focus:outline-none placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="bg-sky-500 text-white font-medium px-5 py-2 rounded-full hover:bg-sky-600 transition disabled:opacity-50"
                  disabled={!city.trim()}
                >
                  Search
                </button>
              </form>

              {/* Tip / Initial State */}
              <div className="bg-white/80 backdrop-blur-sm border border-sky-100 rounded-xl px-6 py-4 shadow-sm text-center">
                <p className="text-gray-600 text-lg">
                  Type a city name to explore its current and future weather.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Error */}
        {!isLoading && (error || futureError) && (
          <>
            <div className="flex flex-col items-center space-y-6">
              {/* Search Box */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center bg-white shadow-md rounded-full px-4 py-2 w-[340px] sm:w-[400px] focus-within:ring-2 focus-within:ring-sky-400 transition-all duration-200"
              >
                <input
                  type="text"
                  placeholder="🔍  Enter city name..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="grow text-gray-700 px-3 py-2 rounded-full focus:outline-none placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="bg-sky-500 text-white font-medium px-5 py-2 rounded-full hover:bg-sky-600 transition disabled:opacity-50"
                  disabled={!city.trim()}
                >
                  Search
                </button>
              </form>

              {/* Error Message */}
              <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-xl shadow-sm text-center animate-fadeIn">
                Invalid city name. Please try again.
              </div>
            </div>
          </>
        )}

        {/*  Content area  */}
        {(isLoading || hasWeather) && (
          <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[300px]">
            {/* 🌀 Loading */}
            {isLoading && (
              <p className="text-sky-600 text-lg font-medium animate-pulse">
                Loading weather data...
              </p>
            )}

            {/* Display weather data */}
            {!isLoading && hasWeather && (
              <>
                {/* Today's weather */}
                <div className="flex flex-col items-center pt-4 pb-6 w-full">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                    {data.location.name}, {data.location.country}
                  </h2>
                  <img
                    src={`https:${data.current.condition.icon}`}
                    alt={data.current.condition.text}
                    className="w-20 h-20"
                  />
                  <p className="text-5xl font-bold text-sky-600">
                    {data.current.temp_c}°C
                  </p>
                  <p className="text-lg text-gray-700 mt-1">
                    {data.current.condition.text}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Humidity: {data.current.humidity}% | Wind:
                    {data.current.wind_kph} km/h
                  </p>
                </div>

                {/* Future 4-day forecast */}
                {/* Keep all 4 cards on one line */}
                <div className="grid grid-cols-4 gap-4 w-full overflow-x-auto">
                  {futureData.slice(0, 4).map((day, i) => (
                    <div
                      key={i}
                      className="bg-linear-to-b from-sky-50 to-sky-100 rounded-xl shadow-inner text-center p-4 hover:shadow-md transition flex flex-col justify-between min-h-[160px]"
                    >
                      <p className="font-semibold text-gray-700 mb-1 truncate">
                        {i == 0 ? "Today" : day.date}
                      </p>
                      <img
                        src={`https:${day.day.condition.icon}`}
                        alt={day.day.condition.text}
                        className="w-12 h-12 mx-auto"
                      />
                      <p className="text-gray-600 text-sm truncate">
                        {day.day.condition.text}
                      </p>
                      <p className="text-sky-700 font-bold mt-1">
                        {day.day.maxtemp_c}° / {day.day.mintemp_c}°
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <button
        onClick={() => {
          setData(null);
          setFutureData(null);
          setCity("");
        }}
        disabled={isLoading || !hasWeather}
        className={`${
          isLoading || !hasWeather ? "opacity-0 cursor-not-allowed" : ""
        } mt-3 text-sky-700`}
      >
        See weather of other cities
      </button>
    </div>
  );
}

export default App;
