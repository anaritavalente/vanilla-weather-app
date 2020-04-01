let now = new Date();
let weekday_number = now.getDay();
let month_number = now.getMonth();
let hours = now.getHours();
let minutes = now.getMinutes();

let week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Monday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"];
let weekday_txt = week[weekday_number-1];
let month = months[month_number];

if (hours < 10) {
    hours = `0${hours}`;
}
if (minutes < 10) {
    minutes = `0${minutes}`;
}

let dayElement = document.querySelector("#day");
console.log(dayElement);
dayElement.innerHTML = `${weekday_txt}, ${now.getDate()} ${month} ${now.getFullYear()}`;

let hourElement = document.querySelector("#hour");
hourElement.innerHTML = `${hours}:${minutes}`;

function displayTemperature(response) {
    console.log(response.data);
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
}

let apikey= `fab5f60356d4f31a390522bd136e2a65`;
let apiURL= `https://api.openweathermap.org/data/2.5/weather?q=Porto&appid=${apikey}&units=metric`;
axios.get(apiURL).then(displayTemperature);


