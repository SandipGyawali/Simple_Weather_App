const apiKey = "2aa8747dc962ec166dac3f5831abf7f2";
const aprUrl = "https://api.openweathermap.org/data/2.5/weather?";

// targeting the search button to get the weather of the given country or city
let targetSearchButton = document.querySelector(".search-icon");

targetSearchButton.addEventListener("click", () => {
  // targeting the search button to get the country or city name from the user
  let targetInput = document.querySelector("input");

  // targeting the location where the warning message is to be shown
  let targetMessage = document.querySelector(".location-name");

  if (targetInput.value == null || targetInput.value == "") {
    targetMessage.innerText = "Search Bar Cannot Be Empty";
    targetMessage.style.color = "lightCoral";

  } else if (targetInput.value != null || targetInput.value != "") {

    async function checkWeather() {

      try {

        const response = await fetch(
          aprUrl + `q=${targetInput.value}` + `&appid=` + apiKey
        );

        const data = await response.json();

        console.log(data);
        // targeting the point where the temp is to be modified and shown in the website
        let tempData = document.querySelector(".temp");

        let temp = data.main.temp;

        const tempCelsius = temp - 273.15;
        tempData.innerText = `${tempCelsius.toFixed(2)}°C`;

        // targeting the point where the city name is to be modified or shown in the website

        let locationData = document.querySelector(".city");
        locationData.innerText = data.name;

        // targeting the point where humidity data is to be shown
        let humidityData = document.querySelector(".humidity");
        humidityData.innerText = `${data.main.humidity}%`;

        // targeting the point where the wind speed data is to be shown
        let windData = document.querySelector(".wind");
        windData.innerText = `${data.wind.speed}m/s`;

        // targeting the point where the pressure data is to be shown
        let pressureData = document.querySelector(".pressure");
        pressureData.innerText = `${data.main.pressure}hPa`;

        // hPa refers to the Hecto Pascal
        targetMessage.innerText = `Weather for ${targetInput.value}`;

        // calling the method to display the icon based on the weather condition.
        iconWeather(data);
      }catch (e) {
        onFail();
        console.log(e);
      }
    }

    checkWeather();
  
  }
  event.preventDefault();
});

// if the city/country that we search is not there then message should be shown.
function onFail() {
  let targetMessage = document.querySelector(".location-name");
  targetMessage.innerText = `I guess the name that you provide is not in the api or the spelling might be incorrect`;
  targetMessage.style.color = "lightCoral";
}



// method that shows the icon based on the weather condition
function iconWeather(data){
  // target the icon 
  let icon = document.querySelector(".head-weather-img");
  console.log(data.weather[0].main);
  if(data.weather[0].main == "Clear"){
    icon.src = "Images/sun.png";
  }else if(data.weather[0].main == "Haze"){
    icon.src = "Images/haze.png";
  }else if(data.weather[0].main == "Rain"){
    icon.src = "Images/rain.png";
  }else if(data.weather[0].main == "Clouds"){
    icon.src = "Images/cloudy.png";
  }else if(data.weather[0].main = "Fog"){
    icon.src = "Images/fog.png";
  }
}