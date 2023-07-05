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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily.slice(0,6);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 days">
            <div class="date">${formatDay(forecastDay.time)}</div>            
            <div class="symbol">
              <img
                src="${forecastDay.condition.icon_url}"
                alt=""
                width="42"
              />
            </div>
            <div class="weather-forecast-temperature">
             <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temperature.maximum
            )}°C</span>
             <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temperature.minimum
            )}°C</span>
            </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayWeather(response) {
  celsiusTemperature = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#bigtemp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coordinates)
}
function search(city) {
  let apiKey = "6cbed29c8af4at3cb0fo327f52c4f5fb";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(function(response) {
    displayWeather(response);
  });
}

function city(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
function searchLocation(position) {
  let apiKey = "6cbed29c8af4at3cb0fo327f52c4f5fb";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
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
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let farhenheitLink = document.querySelector("#fahrenheit-link");
farhenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#bigtemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

search("Barcelona");