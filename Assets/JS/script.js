apiKey = "45eb4c20171c3bd2b2a402297a8c7fea";
//retrieve geographical coordinates given city name -convert name of location to geographical coordinates (lat, lon)

//API call for coordinates by location name:
//user input text select:
let searchInput = document.querySelector('input[name="location"]');

//create function to fetch API data from user Input

function locationAPI() {
  //set limit to 4 - this is the number of locations in the API response:
  const limit = "4";
  //geocoding API:
  // const locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city name},${state code},${country code}&limit=${limit}&appid=${apiKey}`;
  //for searchInput
  const locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=${limit}&appid=${apiKey}`;
  // test locationURL = http://api.openweathermap.org/geo/1.0/direct?q=Darwin&limit=4&appid=45eb4c20171c3bd2b2a402297a8c7fea

  fetch(locationURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

//event handler onto search field to retrieve search ersults adn JSON request? (?API automatically JSON format)

searchInput.addEventListener("input", function (event) {
  const userInput = searchInput.value;
  locationAPI(userInput);
});

//this retrieves the lat and lon to use in the queryURL below:

var lat = "";
var lon = "";
const queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
// test API works:https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=45eb4c20171c3bd2b2a402297a8c7fea
fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    //call data funtion below?
    displayCurrent(data);
  });

//present current conditions for the city
const cityName = document.getElementById("#location");
const currentDate = document.getElementById("#date");
const imageCurrentWeather = document.getElementById("#ImageCurrent");
const temperature = document.getElementById("#Temperature: ");
const wind = document.getElementById("#Wind: ");
const humidity = document.getElementById("#Humidity: ");
//present city name, date, icon representation of weather conditions, temperature, humidty and wind speed
//render data to elements on HTML
function displayCurrent(data) {
  cityName.innerHTML = "";
  currentDate.innerHTML = "";
  imageCurrentWeather.innerHTML = "";
  temperature.innerHTML = "";
  wind.innerHTML = "";
  humidity.innerHTML = "";

  //assign data array to element

  //create the new elements:
  if (data.length > 0) {
    //use forEach function for each new element to be displayed from array:
    data.array.forEach((element) => {
      // data array from API; city name = 'name'
      const nameLocation = element.name;

      //data array from API: current date = ?timezone

      //data array from API; weather icon is -->weather --> icon
      const weatherIcon = element.icon;

      //data array from API: temperature is temp
      const tempCurrent = element.temp;

      //data array from API: wind is speed (?speed in what units?)
      const windCurrent = element.wind;

      //data array from API: humidty is humidity:
      const humidCurrent = element.humidity;

      //create city title element for cityName:
      const nameElement = document.createElement("h2");
      nameElement.textContent = nameLocation;
      cityName.appendChild(nameElement);
      //create currentDate element:

      //create imageCurrentWeather element:
      const imgElement = document.createElement("img");
      imgElement.src = weatherIcon;
      imgElement.alt = "Weather image icon";
      weatherIcon.appendChild(imgElement);

      //create temperature title element for tempCurrent:
      const tempElement = document.createElement("h3");
      tempElement.textContent = tempCurrent;
      tempCurrent.appendChild(tempElement);

      //create wind title element for windCurrent:
      const windElement = document.createElement("h3");
      windElement.textContent = windCurrent;
      windCurrent.appendChild(windElement);

      //create humidity title element for humidCurrent:
      const humidElement = document.createElement("h3");
      humidElement.textContent = humidCurrent;
      humidCurrent.appendChild(humidElement);
    });
  }
}

// present future conditions for the city
//present 5 day forecast displaying date, icon rep of weather conditions, the temperature, the wind speed, and the humidity
const queryForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
// test API works:https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=45eb4c20171c3bd2b2a402297a8c7fea
fetch(queryForecastURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    displayFuture(data);
  });
const futureDate = document.getElementById("#f-date");
const imgFutureWeather = document.getElementById("#f-image");
const futureTemperature = document.getElementById("#f-temp");
const futureWind = document.getElementById("#f-wind");
const futureHumidity = document.getElementById("#f-humidity");

function displayFuture(data) {
  futureDate.innerHTML = "";
  imgFutureWeather.innerHTML = "";
  futureTemperature.innerHTML = "";
  futureWind.innerHTML = "";
  futureHumidity.innerHTML = "";

  //assign data array to element
  //create the new elements:
  if (data.length > 0) {
    //use forEach function for each new element to be displayed from array:
    data.array.forEach((element) => {
      // find data endpoint for date -?time???
      const date = element.time;
      //data array from API; weather icon is -->weather --> icon
      const futureWeatherIcon = element.icon;

      //data array from API: temperature is temp
      const futureTemp = element.temp;

      //data array from API: wind is speed (?speed in what units?)
      const futureWind = element.wind;

      //data array from API: humidty is humidity:
      const futureHumid = element.humidity;

      //create futureDate element:
      const dateElement = document.createElement("h4");
      dateElement.textContent = date;
      futureDate.appendChild(dateElement);

      //create imageFutureWeather element:
      const futureImgElement = document.createElement("img");
      futureImgElement.src = futureWeatherIcon;
      futureImgElement.alt = "Weather image icon";
      imgFutureWeather.appendChild(futureImgElement);

      //create temperature title element for futureTemp:
      const tempElementFuture = document.createElement("h4");
      tempElementFuture.textContent = futureTemp;
      futureTemperature.appendChild(tempElementFuture);

      //create wind title element
      const futureWindElement = document.createElement("h4");
      futureWindElement.textContent = futureWind;
      futureWind.appendChild(futureWindElement);

      //create humidity title element for humidCurrent:
      const futureHumidElement = document.createElement("h4");
      futureHumidElement.textContent = futureHumid;
      futureHumidity.appendChild(futureHumidElement);
    });
  }
}
//search history - able to click on city in search history to present current and future conditions.
