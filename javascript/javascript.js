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
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

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
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#unit-temperature");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}
let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", toFarenheit);

function toCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#unit-temperature");
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toCelsius);

let celsiusTemperature = null;

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
  document
    .querySelector("#icon")
    .setAttribute("src", `images/${response.data.weather[0].icon}.svg`);
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
  displayForecast();
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    ,
  ];
  let forecastHTML = `<div class = "row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-lg-2 col-md-4 col-sm-6">
            <div class="card">
              <img
                src="images/01d.svg"
                class="card-img-top"
                alt="sunny snow icon"
              />
              <div class="card-body">
                <p class="card-text">${day}</p>
                </div>
                <div class="card-text">H: 18º &nbsp; L: 3º</div>
              </div>
            </div>`;
  });
  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}
