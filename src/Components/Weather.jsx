import './WeatherStyle.css'
import search_image from '../assets/images/search.png'
import clear_image from '../assets/images/clear.png'
import clouds_image from '../assets/images/clouds.png'
import drizzle_image from '../assets/images/drizzle.png'
import rain_image from '../assets/images/rain.png'
import snow_image from '../assets/images/snow.png'
import humidity_image from '../assets/images/humidity.png'
import wind_image from '../assets/images/wind.png'
import { useState } from 'react'



const Weather = () => {

  const [wicon, setWicon] = useState(clouds_image);

  const search  = async () => {
    const element = document.getElementsByClassName('cityInput');

    if (element[0].value === "")
    {
      return 0;
    }
    
    let response = await fetch(`/.netlify/functions/weather?city=${city}`);

    if (response.status == 404) {
      document.querySelector('.error').style.display = "block";
      document.querySelector('.weather').style.display = "none";
    }
    else {
      document.querySelector('.weather').style.display = "block";
      document.querySelector('.error').style.display = "none";
      let data = await response.json();
      // console.log(data);

      const city = document.getElementsByClassName('city');
      const temp = document.getElementsByClassName('temp');
      const humidity = document.getElementsByClassName('humidity');
      const wind = document.getElementsByClassName('wind');

      city[0].innerHTML = data.name;
      temp[0].innerHTML = Math.floor(data.main.temp)+"ºC";
      humidity[0].innerHTML = data.main.humidity+" %";
      wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
      {
        setWicon(clear_image);
      }
      else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
      {
        setWicon(clouds_image);
      }
      else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n")
      {
        setWicon(drizzle_image);
      }
      else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
      {
        setWicon(drizzle_image);
      }
      else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
      {
        setWicon(rain_image);
      }
      else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n")
      {
        setWicon(rain_image);
      }
      else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
      {
        setWicon(snow_image);
      }
      else
      {
        setWicon(clear_image);
      }

    }
    
  }
  
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="search">
            <input type="text" className="cityInput" placeholder="Enter city name" spellCheck="false" />
            <button onClick={() => { search() }}><img src={search_image} alt="search-icon" /></button>
          </div>
          <div className="error">
            <p>Invalid city name</p>
          </div>
          <div className="weather">
            <img src={wicon} alt="weather-icon" className="weather-icon" />
            <h1 className="temp">22ºC</h1>
            <h2 className="city">New York</h2>
            <div className="details">
              <div className="col">
                <img src={humidity_image} alt="humidity-img" />
                <div className='infodata'>
                  <p className="humidity">50%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src={wind_image} alt="wind-img" />
                <div className='infodata'>
                  <p className="wind">15 km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Weather