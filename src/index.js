
import fromUnixTime from 'date-fns/fromUnixTime'
import CityInput from './components/CityInput/CityInput';
import Stats from './components/Stats/Stats';
import ToggleTemperature from './components/ToggleTemperature/ToggleTemperature';
import setBackground from './lib/setBackground';



const  fetchData = async (city) => {
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
  ToggleTemperature(temperature);
  setBackground(cityTime)
}

CityInput(fetchData);



const setStats = (stats) => {
  const statsContainer = document.getElementById('stats');
  statsContainer.innerHTML = Stats(stats);
}
