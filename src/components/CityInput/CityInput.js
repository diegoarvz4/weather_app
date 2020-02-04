export default (fetchData) => {
  document.getElementById('city-input').addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById('stats').innerHTML = '<div id="loader" class="lds-dual-ring set-hidden"></div>';
      document.getElementById('loader').classList.toggle('set-hidden');
      const city = document.getElementById('city-input').value.toLowerCase();
      fetchData(city);
    }
  });
}

