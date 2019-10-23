
import fromUnixTime from 'date-fns/fromUnixTime'

document.getElementById('city-input').addEventListener('keydown', (e) => {
  
  if (e.keyCode === 13) {
    e.preventDefault();
    document.getElementById('stats').innerHTML = '<div id="loader" class="lds-dual-ring set-hidden"></div>';
    document.getElementById('loader').classList.toggle('set-hidden');
    const city = document.getElementById('city-input').value.toLowerCase();
    fetchData(city);
  }
});



const  fetchData = async (city) =>{
  const APIKEY = 'dd0f409a2c224dba43acfef73f2eec39';
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKEY}&units=metric`;
  const response = await fetch(endpoint, {mode: 'cors'});
  const myJson = await response.json();
  const weather = myJson.weather[0].main;
  const weather_desc =  myJson.weather[0].description;
  const temperature = myJson.main.temp;
  const humidity = myJson.main.humidity;
  const wind = myJson.wind.speed;
  const clouds = myJson.clouds.all;
  const time = new Date(myJson.dt);
  const name = myJson.name +", "+ myJson.sys.country;
  const code = myJson.sys.country;
  const weatherIconURL = myJson.weather[0].icon;
  const localTime = new Date();
  const utcTime = localTime.toUTCString();
  const utcTimeDate = new Date(utcTime.substring(0,utcTime.length-4));
  const cityTime = new Date(fromUnixTime(utcTimeDate.getTime() / 1000 + myJson.timezone));
  setStats({cityTime, weather, weather_desc, temperature, humidity, time, name, weatherIconURL, wind, clouds, code });
  document.getElementById('temp-toggle').addEventListener('click', () => {
    const buttonToggle = document.getElementById('temp-toggle');
    const text = buttonToggle.textContent;
    if (text === '°F') {
      const fahrenheit = (temperature * 9/5) + 32;
      document.getElementById('temp-display').textContent = fahrenheit.toFixed(2) + ' °F';
      buttonToggle.textContent = '°C';
    } else {
      document.getElementById('temp-display').textContent = temperature + ' °C';
      buttonToggle.textContent = '°F';
    }
    document.getElementById('temp-display').classList.add('appear');
    document.getElementById('temp-display').addEventListener("animationend", () => {
      document.getElementById('temp-display').classList.remove('appear');
    });
  });
}


const setStats = (stats) => {
  const statsContainer = document.getElementById('stats');
  statsContainer.innerHTML = `<div id="loader" class="lds-dual-ring set-hidden"></div>
                              <div class="stats-header">
                                <div class="stats-header-city">
                                  <h1>${stats.name} </h1><img src="http://openweathermap.org/images/flags/${stats.code.toLowerCase()}.png"/>
                                </div>
                                <h4>${stats.cityTime.toString().substring(0,21)}</h4>
                                <h4 style="text-transform: capitalize;">${stats.weather_desc}</h4>
                              </div>
                              <div class="stats-body">
                                <span id="temp-display">${stats.temperature} °C</span> 
                                <button id="temp-toggle">°F</button>
                                <img src ="http://openweathermap.org/img/wn/${stats.weatherIconURL}@2x.png" />
                              </div>
                              <div class="stats-other">
                                <h5>Humidity ${stats.humidity}%</h5>
                                <h5>Wind ${stats.wind} m/s </h5>
                                <h5>Clouds ${stats.clouds}% </h5>
                              </div>
  `;
}