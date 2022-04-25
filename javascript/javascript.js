let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();

let minutes = now.getMinutes();

let time = document.querySelector("#day-time");
time.innerHTML = `${day}, ${hour}:${minutes}`;

//feature2

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".searchBar");

  let apiKey = "3425d03ec05f82a0b0ba2682cedcbe27";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", citySearch);

//feature3
function toFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#unit-temperature");
  temperatureElement.innerHTML = 66;
}
let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", toFarenheit);

function toCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#unit-temperature");
  temperatureElement.innerHTML = 19;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toCelsius);

//week 5
document.querySelector(".search-button").addEventListener("click", citySearch);
document
  .querySelector(".location-button")
  .addEventListener("click", getGeoPosition);

function showWeather(response) {
  let city = response.data.name;
  document.querySelector(".current-city").innerHTML = city;
  let country = response.data.sys.country;
  document.querySelector(".current-country").innerHTML = country;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#unit-temperature").innerHTML = temperature;
  let tempMin = Math.round(response.data.main.temp_min);
  document.querySelector(".current-min").innerHTML = ` ${tempMin}`;
  let tempMax = Math.round(response.data.main.temp_max);
  document.querySelector(".current-max").innerHTML = ` ${tempMax}`;
  let weatherType = response.data.weather[0].main;
  document.querySelector(".current-weather-type").innerHTML = weatherType;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector(".current-wind").innerHTML = wind;
  let humidity = Math.round(response.data.main.humidity);
  document.querySelector(".current-humidity").innerHTML = humidity;
  console.log(response.data.weather);
}

function retrievePosition(position) {
  let apiKey = "3425d03ec05f82a0b0ba2682cedcbe27";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getGeoPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
