let now = new Date(); 
// creates a date object with the current date and time 
//By default JavaScript will use the browser's timezone
let weekday_number = now.getDay();
let month_number = now.getMonth();
let hours = now.getHours();
let minutes = now.getMinutes();

week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
months = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"];

if (hours < 10) {
    hours = `0${hours}`;
}
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let hourElement = document.querySelector("#hour");
hourElement.innerHTML = `${hours}:${minutes}`; 

let dayElement = document.querySelector("#day");
dayElement.innerHTML = `${week[weekday_number-1]}, ${now.getDate()} ${months[month_number]} ${now.getFullYear()}`;

function displayData(response) {
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description; 

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity; 

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute('src',`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute('alt',`${response.data.weather[0].description}`);
   
    let now = new Date(); 
    //note that UTC is the reference time zone, from which all time zones are calculated,
    //and corresponds to the WINTER time in the greenwich meridian
    let inputcity_timezone_offset = response.data.timezone; //offset in seconds between the input city's timezone and the UTC timezone
    let hours_of_inputcity = now.setHours(now.getUTCHours() + inputcity_timezone_offset/3600); //returns the miliseconds since January 1, 1970 00:00:00 UTC of the input_city
    let inputcity_time = new Date(hours_of_inputcity);
    let hours = inputcity_time.getHours();
    let minutes = inputcity_time.getMinutes();
    let dayElement = document.querySelector("#day");
    dayElement.innerHTML = `${week[inputcity_time.getDay()]}, ${inputcity_time.getDate()} ${months[inputcity_time.getMonth()]} ${inputcity_time.getFullYear()}`;
    
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let hourElement = document.querySelector("#hour");
    hourElement.innerHTML = `${hours}:${minutes}`;
}

function search(city) {
    let apikey= `fab5f60356d4f31a390522bd136e2a65`;
    let apiURL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    axios.get(apiURL).then(displayData);
}

function handleSubmit(event) {
    event.preventDefault();
    let inputElement = document.querySelector("#city-input");
    search(inputElement.value);
}

let formElement = document.querySelector("form");
formElement.addEventListener("submit", handleSubmit);