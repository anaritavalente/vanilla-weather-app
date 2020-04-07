let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"];
let apiKey = "fab5f60356d4f31a390522bd136e2a65";
let celsiusTemperature = null;

function formatHours(timestamp) {
    let now = new Date(timestamp); //By default JavaScript will use the browser's timezone  
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let hourElement = document.querySelector("#hour");
    hourElement.innerHTML = `${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let now = new Date(timestamp);
    let dayElement = document.querySelector("#day");
    dayElement.innerHTML = `${week[now.getDay()-1]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

function displayData(response) {
    celsiusTemperature = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temp");
    let iconElement = document.querySelector("#icon");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    
    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = `${celsiusTemperature} ºC`;
    iconElement.setAttribute('src',`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute('alt',`${response.data.weather[0].description}`);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity; 
    windElement.innerHTML = Math.round(response.data.wind.speed);
    
    let now = new Date(); 
    //note that UTC is the reference time zone, from which all time zones are calculated,
    //and corresponds to the WINTER time in the greenwich meridian
    let inputcity_timezone_offset = response.data.timezone; //offset in seconds between the input city's timezone and the UTC timezone
    let time_of_inputcity = now.setHours(now.getUTCHours() + inputcity_timezone_offset/3600); //returns the miliseconds since January 1, 1970 00:00:00 UTC of the input_city
    formatHours(time_of_inputcity);
    formatDay(time_of_inputcity);
    lat = response.data.coord.lat;
    lon = response.data.coord.lon;
    let forecast_api_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    axios.get(forecast_api_URL).then(getForecast);
}

//when user clicks "Search"
function search() {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let inputElement = document.querySelector("#city-input");
    let city = inputElement.value;
    let apiURL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayData);
}

let formElement = document.querySelector("form");
formElement.addEventListener("submit", search);

//when user clicks "Current location"
function getMyLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiURL).then(displayData);
}
  
function getPosition() {
    navigator.geolocation.getCurrentPosition(getMyLocation);
}

let currentLocationElement = document.querySelector("#current-position");
currentLocationElement.addEventListener("click", getPosition);

//when user clicks in the F or ºC links
function convertToFahrenheit() {
    let temperatureElement = document.querySelector("#temp");
    fahrenheitTemp = (celsiusTemperature *9 )/5 + 32;
    temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)} F`;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}

function convertToCelsius() {
    let  temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = `${celsiusTemperature} ºC`;
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click",convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click",convertToFahrenheit);

getPosition();
