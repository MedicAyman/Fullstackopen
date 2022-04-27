import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

export default function Weather({ country }) {
  const [weather, setWeather] = useState({});
  let countryCapital= country.capital;
  let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${countryCapital}&appid=${api_key}&units=metric`;
  console.log(api_url)
  let weather_icon_url = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  useEffect(() => {
    axios.get(api_url).then((response) => {
      setWeather(response.data);
      console.log('response', response.data)
    });
  }, []);

  return <div>
      <p>Temperature: {weather.main.temp} Celsius</p>
       <img src={weather_icon_url} />
      <p>Wind speed: {weather.wind.speed} m/s</p>
  </div>;
}
