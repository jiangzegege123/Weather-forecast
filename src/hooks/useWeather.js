import { useState } from "react";

export function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [futureData, setFutureData] = useState(null);
  const [futureLoading, setFutureLoading] = useState(false);
  const [futureError, setFutureError] = useState(null);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/current.json?key=${
          import.meta.env.VITE_WEATHER_KEY
        }&q=${city}`
      );
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.log("fetch weather error:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFutureWeather = async (city) => {
    try {
      setFutureLoading(true);
      setFutureError(null);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/forecast.json?key=${
          import.meta.env.VITE_WEATHER_KEY
        }&Q=${city}&days=4`
      );
      const result = await res.json();
      setFutureData(result.forecast.forecastday);
    } catch (error) {
      console.log(error);
      setFutureError(error);
    } finally {
      setFutureLoading(false);
    }
  };

  return {
    fetchWeather,
    data,
    loading,
    error,
    fetchFutureWeather,
    futureData,
    futureLoading,
    futureError,
    setData,
    setFutureData,
  };
}
