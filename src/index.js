
import fromUnixTime from 'date-fns/fromUnixTime'
import getUnixTime from 'date-fns/getUnixTime'

document.getElementById('fetch-weather').addEventListener('click', (e) => {
  e.preventDefault();
  const city = document.getElementById('city-input').value.toLowerCase();
  fetchData(city);
});

const  fetchData = async (city) =>{
  const APIKEY = 'dd0f409a2c224dba43acfef73f2eec39';
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKEY}&units=metric`;
  const response = await fetch(endpoint, {mode: 'cors'});
  const myJson = await response.json();
  console.log(myJson);
  console.log("Difference with utc: ", (myJson.timezone / 3600));
  console.log(myJson.weather[0].main);
 // console.log(Math.floor((new Date()).getTime() / 1000));
  const sunrise = fromUnixTime(myJson.sys.sunrise ); // city sunrise
  const sunset = fromUnixTime(myJson.sys.sunset); //city sunset
   //get Time
   const localTime = new Date();
   const utcTime = localTime.toUTCString();
   const utcTimeDate = new Date(utcTime.substring(0,utcTime.length-4));
   const cityTime = fromUnixTime(utcTimeDate.getTime() / 1000 + myJson.timezone)
  console.log(fromUnixTime(myJson.sys.sunset) > cityTime )
  if ( cityTime < sunset){
    setBackground('day');
  } else {
    setBackground('night');
  }
  setStats({cityTime});
}

const setBackground = (status) => {
  console.log('here')
  const bg = document.getElementById('container');
  console.log(bg.classList);
  bg.classList.remove('day');
  bg.classList.remove('night');
  bg.classList.add(`${status}`);
}

const setStats = (stats) => {
  const statsContainer = document.getElementById('stats');
  statsContainer.innerHTML = `<h1>${stats.cityTime}</h1>`;
}

const weather = ['Mist', 'Clear', 'Clouds', 'Drizzle'];