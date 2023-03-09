function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day}, ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#bigtemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}
function search(city) {
  let apiKey = "2779d3e44b6e8f861dd5b133a117ab25";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function city(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
function searchLocation(position) {
  let apiKey = "2779d3e44b6e8f861dd5b133a117ab25";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let citySearch = document.querySelector("#enter-city");
citySearch.addEventListener("submit", city);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#bigtemp");
  temperatureElement.innerHTML = 52;
}

let farhenheitLink = document.querySelector("#fahrenheit-link");
farhenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#bigtemp");
  temperatureElement.innerHTML = 11;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

search("New York");
