import React, { useState } from "react";
import Conditions from "../Conditions/Conditions";
import "./Forecast.css";
require("dotenv").config();

const Forecast = function () {
  let [weatherObj, setWeatherObj] = useState({});
  let [city, setCity] = useState("");
  let [country, setCountry] = useState("");
  let [unit, setUnit] = useState("imperial");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);

  function getForecast(event) {
    event.preventDefault();

    //submitted without entering a city, set error to true, then the Conditions component
    //will render a reminder message.
    if (city === "") {
      setError(true);
      setCountry("");
      return;
    }

    //set error to false, the Conditions component will render the data fetched from the API.
    setError(false);
    //set the loading status to true at the beginning of the fetch process.
    setLoading(true);
    //init the weather obj to a empty object each time the fetch beginning.
    setWeatherObj({});

    //compose the uri encoded string of "city"+","+"country", then pass it into the format string
    //as the argument for the fetch().
    let encodedCityText = encodeURIComponent(city + "," + country);
    console.log(encodedCityText);

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?q=${encodedCityText}&lat=0&lon=0&id=2172797&lang=en&units=${unit}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_WEATHER_API_KEY,
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        },
      }
    )
      .then((response) => {
        //any response other than 200 indicates failed.
        if (!response.ok) {
          throw new Error("failed to fetch weather.");
        } else {
          //check for the response type
          console.log(response.type);
          //extract the body data from the response and return a promise.
          return response.json();
        }
      })
      .then((data) => {
        //put the response json data to a state.
        setWeatherObj(data);
        console.log(weatherObj);
        //loading completed.
        setLoading(false);
      })
      .catch((err) => {
        //if any error caught, setError to true, and set loading to false.
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }

  return (
    <div>
      <h2>Find Current Weather Conditions</h2>
      <form onSubmit={getForecast}>
        <input
          className="InputText"
          type="text"
          name="city"
          placeholder="enter a city name"
          maxLength="50"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="InputText"
          type="text"
          name="country"
          placeholder="enter a country name"
          maxLength="20"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <label className="Radio">
          <input
            type="radio"
            name="unit"
            checked={unit === "imperial"}
            value="imperial"
            onChange={(e) => setUnit(e.target.value)}
          />
          Fahrenheit
        </label>

        <label className="Radio">
          <input
            type="radio"
            name="unit"
            checked={unit === "metric"}
            value="metric"
            onChange={(e) => setUnit(e.target.value)}
          />
          Celsius
        </label>
        <button className="Button" type="submit">
          Get Forecast
        </button>
      </form>
      <div>
        <Conditions responseObj={weatherObj} error={error} loading={loading} />
      </div>
    </div>
  );
};

export default Forecast;
