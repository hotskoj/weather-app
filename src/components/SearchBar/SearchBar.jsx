import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectWeatherInfo, cityChange, fetchWeather } from "../WeatherInfo/weatherSlice.js";

export default function SearchBar() {
  const dispatch = useDispatch();
  //const weather = useSelector(selectWeatherInfo);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");

  function cityNameChange(e) {
    setCity(e.target.value);
  }

  function countryChange(e) {
    setCountry(e.target.value);
  }

  function stateChange(e) {
    setState(e.target.value);
  }

  function onSearch() {
    if (city && country) {
      try {
        dispatch(cityChange(city, country, state));
        setRequestStatus('pending');
        dispatch(fetchWeather({city, country, state})).unwrap();
        setCity("");
        setCountry("");
        setState("");
      } catch (error) {
        console.error('Failed to load data', error)
      } finally {
        setRequestStatus('idle');
      }
    }
  }

  return (
    <form>
      <div className="my-3 input-group">
        <input
          name="city"
          className="form-control"
          type="text"
          placeholder="City"
          value={city}
          onChange={cityNameChange}
        />
        <input
          name="country"
          className="form-control"
          type="text"
          placeholder="Country"
          value={country}
          onChange={countryChange}
        />
        <input
          name="state"
          className="form-control"
          type="text"
          placeholder="US State (Optional)"
          value={state}
          onChange={stateChange}
        />
        <button type="button" onClick={onSearch} className="btn btn-primary">
          Go!
        </button>
      </div>
    </form>
  );
}
