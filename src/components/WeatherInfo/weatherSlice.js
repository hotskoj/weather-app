import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const geoURL = "https://api.api-ninjas.com";

export const fetchWeather = createAsyncThunk("/search", async (info) => {
  const { city, country, state } = info;
  const options = {
    method: "GET",
    url: `http://localhost:3000/search/${city}/${country}/${state}`,
  };
  const response = await axios.request(options);
  return response.data;
});

const initialState = {
  weather: {},
  history: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    cityChange: {
      reducer(state, action) {
        state.weather = { ...state.weather, ...action.payload };
        const date = new Date();
        const dateString = date.toLocaleString();
        if (state.history.length >= 5) {
            state.history.pop();
        }
        state.history = [{city: action.payload.city, country: action.payload.country, dateTime: dateString}, ...state.history];
      },
      prepare(city, country, state) {
        return {
          payload: {
            city: city,
            country: country,
            state: state,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.lat) {
            state.weather = { ...state.weather, ...action.payload };
        } else {
            state.history = state.history.slice(1);
            state.weather = {};
        }
        
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectWeatherInfo = (state) => state.weather.weather;

export const selectHistory = (state) => state.weather.history;

export const { cityChange } = weatherSlice.actions;

export default weatherSlice.reducer;
