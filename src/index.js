
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
}

const weather = ['Mist', 'Clear', 'Clouds', 'Drizzle'];