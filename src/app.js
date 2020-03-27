function displayTemperature(response){
    console.log(response.data);
    let temperatureElement=document.querySelector("#temp");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);

    let cityElement=document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.weather[0].description; 

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity; 

    let windElement = document.querySelector("#wind");
    windElement.innerHTML= Math.round(response.data.wind.speed); 
}
let apikey= `fab5f60356d4f31a390522bd136e2a65`;
let apiURL= `https://api.openweathermap.org/data/2.5/weather?q=Porto&appid=${apikey}&units=metric`;
axios.get(apiURL).then(displayTemperature);