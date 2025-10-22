import "./App.css";
import { useState } from "react";
import { useWeather } from "./hooks/useWeather";

function App() {
  const [city, setCity] = useState("");
  const { fetchWeather, data } = useWeather();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <br />
      <button>Submit</button>

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </form>
  );
}

export default App;
