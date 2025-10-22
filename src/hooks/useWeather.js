import { useState } from "react";

export function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      console.log(result.current);
      setData(result);
    } catch (error) {
      console.log("fetch weather error:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchWeather, data, loading, error };
}
