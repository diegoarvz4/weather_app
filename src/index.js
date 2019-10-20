
document.getElementById('fetch-weather').addEventListener('click', (e) => {
  e.preventDefault();
  const city = document.getElementById('city-input').value.toLowerCase();
  console.log(city)
  fetchData(city);
});

const fetchData = (city, code) =>{
  const APIKEY = 'dd0f409a2c224dba43acfef73f2eec39';
  const endpoint = `api.openweathermap.org/data/2.5/weather?q=${city},${code}&APPID=${APIKEY}`;
  fetch(endpoint, {mode: 'cors'})
  .then(function(response) {
    console.log(response)
  })
  .then(function(response) {
    console.log(response)
  });
}

