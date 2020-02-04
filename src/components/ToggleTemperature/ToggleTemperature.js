export default (temperature) => {
  document.getElementById('temp-toggle').addEventListener('click', () => {
    const buttonToggle = document.getElementById('temp-toggle');
    const tempDisplay = document.getElementById('temp-display');
    const text = buttonToggle.textContent;
    if (text === '°F') {
      const fahrenheit = (temperature * 9/5) + 32;
      tempDisplay.textContent = fahrenheit.toFixed(2) + ' °F';
      buttonToggle.textContent = '°C';
    } else {
      tempDisplay.textContent = temperature + ' °C';
      buttonToggle.textContent = '°F';
    }
    tempDisplay.classList.add('appear');
    tempDisplay.addEventListener("animationend", () => {
      tempDisplay.classList.remove('appear');
    });
  });
};

