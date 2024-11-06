import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import bodyParser from "body-parser";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, "../dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(DIST_DIR));

app.get("/search/:city/:country/", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding",
    params: req.params,
    headers: {
      "x-rapidapi-key": process.env.API_KEY,
      "x-rapidapi-host": "geocoding-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data.length) {
    const lat = response.data[0].latitude;
    const long = response.data[0].longitude;
    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=1`
    );
    const results = {
      lat: weather.data.latitude,
      long: weather.data.longitude,
      temp: weather.data.current.temperature_2m,
      high: weather.data.daily.temperature_2m_max,
      low: weather.data.daily.temperature_2m_min,
      humidity: weather.data.current.relative_humidity_2m,
      pressure: weather.data.current.surface_pressure,
      windSpeed: weather.data.current.wind_speed_10m,
    };
    res.json(results);
  } else {
    res.json({});
  }
  } catch (error) {
    console.error(error);
  }
});

app.get("/search/:city/:country/:state", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding",
    params: req.params,
    headers: {
      "x-rapidapi-key": process.env.API_KEY,
      "x-rapidapi-host": "geocoding-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data.length) {
    const lat = response.data[0].latitude;
    const long = response.data[0].longitude;
    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=1`
    );
    const results = {
      lat: weather.data.latitude,
      long: weather.data.longitude,
      temp: weather.data.current.temperature_2m,
      high: weather.data.daily.temperature_2m_max,
      low: weather.data.daily.temperature_2m_min,
      humidity: weather.data.current.relative_humidity_2m,
      pressure: weather.data.current.surface_pressure,
      windSpeed: weather.data.current.wind_speed_10m,
    };
    res.json(results);
  } else {
    res.json({});
  }
  } catch (error) {
    console.error(error);
  }
});

app.get("/", (req, res) => {
  res.sendFile(HTML_FILE);
});

export default app;
