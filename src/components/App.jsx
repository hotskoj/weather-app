import React from "react";
import Header from "./Header/Header.jsx";
import SearchBar from "./SearchBar/SearchBar.jsx";
import WeatherInfo from "./WeatherInfo/WeatherInfo.jsx";
import SearchHistory from "./SearchHistory/SearchHistory.jsx";

export default function App() {
  return (
    <>
      <div className="container mt-5">
        <Header />
        <div className="row my-5">
          <SearchBar />
        </div>
        <div className="row">
          <div className="col-lg-6 my-3">
            <WeatherInfo />
          </div>
          <div className="col-lg-6 my-3">
            <SearchHistory />
          </div>
        </div>
      </div>
    </>
  );
}
