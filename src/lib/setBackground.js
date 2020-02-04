export default (cityTime) => {
  const body = document.getElementById("body")
  cityTime = cityTime.getHours()
  let className = ''
   if(cityTime >= 19 || cityTime < 6 ){
    className = 'night'
  } else
  if (cityTime >= 17) {
    className = 'sunset'
  } else
  if (cityTime >= 6) {
    className = 'day'
  }

  body.classList = ''
  body.classList += className
}