import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectHistory,
  cityChange,
  fetchWeather,
} from "../WeatherInfo/weatherSlice";

export default function SearchHistory() {
  const dispatch = useDispatch();
  const history = useSelector(selectHistory);
  const [requestStatus, setRequestStatus] = useState("idle");

  function onSearch(city, country, state) {
    try {
      dispatch(cityChange(city, country, state));
      setRequestStatus("pending");
      dispatch(fetchWeather({ city, country, state })).unwrap();
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setRequestStatus("idle");
    }
  }

  const tableBody = history.map((item, index) => {
    const handleMouseEnter = (e) => {
      e.target.style.color = "blue";
      e.target.style.cursor = "pointer";
    };

    const handleMouseLeave = (e) => {
      e.target.style.color = "black";
    };

    return (
      <tr key={index}>
        <td
          onClick={() => onSearch(item.city, item.country, item.state)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.city}, {item.country}
        </td>
        <td className="text-end">
          <p>{item.dateTime}</p>
        </td>
      </tr>
    );
  });
  return (
    <div className="card">
      <div className="card-header bg-primary-subtle">Search History</div>
      <div className="card-body p-0">
        <table className="table table-striped m-0">
          <tbody>{tableBody}</tbody>
        </table>
      </div>
    </div>
  );
}
