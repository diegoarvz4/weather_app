const url = "http://openweathermap.org"

export default (stats) => (
  `<div id="loader" class="lds-dual-ring set-hidden"></div>
    <div class="stats-header">
      <div class="stats-header-city">
        <h1>${stats.name} </h1><img src="${url}/images/flags/${stats.code.toLowerCase()}.png"/>
      </div>
      <h4>${stats.cityTime.toString().substring(0,21)}</h4>
      <h4 style="text-transform: capitalize;">${stats.weather_desc}</h4>
    </div>
    <div class="stats-body">
      <span id="temp-display">${stats.temperature} °C</span> 
      <button id="temp-toggle">°F</button>
      <img src ="${url}/img/wn/${stats.weatherIconURL}@2x.png" />
    </div>
    <div class="stats-other">
      <h5>Humidity ${stats.humidity}%</h5>
      <h5>Wind ${stats.wind} m/s </h5>
      <h5>Clouds ${stats.clouds}% </h5>
    </div>`
);