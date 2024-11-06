import React from "react";
import { useSelector} from "react-redux";
import { selectWeatherInfo } from "./weatherSlice.js";

export default function WeatherInfo() {
  const weather = useSelector(selectWeatherInfo);

  return (
    <div className="card">
      <div className="card-header bg-primary-subtle">Weather</div>
      <div className="card-body">
        <div className="row text-center">
          <h2>{weather.city && `${weather.city}, ${weather.country}`}</h2>
          <p>{weather.lat && `Lat/Long: ${weather.lat}, ${weather.long}`}</p>
        </div>
        <div className="row text-center">
          <div className="col">
            <h3>Temperature(F)</h3>
            <p>{weather.temp && `${weather.temp}°`}</p>
            <h3>Pressure</h3>
            <p>{weather.pressure}</p>
          </div>
          <div className="col">
            <h3>Low</h3>
            <p>{weather.low && `${weather.low}°`}</p>
            <h3>Humidity</h3>
            <p>{weather.humidity && `${weather.humidity}%`}</p>
          </div>
          <div className="col">
            <h3>High</h3>
            <p>{weather.high && `${weather.high}°`}</p>
            <h3>Wind Speed</h3>
            <p>{weather.windSpeed && `${weather.windSpeed}mph`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
