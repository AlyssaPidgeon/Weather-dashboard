apiKey = "45eb4c20171c3bd2b2a402297a8c7fea";

//user input text select:
//.value to addign input value to searchinput
var searchInput = document.getElementById("locationInput");
var submitButton = document.getElementById("submitButton");
//create function to fetch API data from user Input

//event handler onto search field to retrieve search ersults adn JSON request (?API automatically JSON format)

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  const userInput = searchInput.value;
  console.log(userInput);
  fetchAPI(userInput);
  fiveDayForecast(userInput);
});

function fetchAPI() {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial&appid=${apiKey}&units=metric`;
  console.log(searchInput.value);
  //https://api.openweathermap.org/data/2.5/weather?q=Darwin&units=imperial&appid=45eb4c20171c3bd2b2a402297a8c7fea
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //call data funtion below?
      displayCurrent(data);
    });
}
//present current conditions for the city
const cityName = document.getElementById("location");
const currentDate = document.getElementById("date");
const imageCurrentWeather = document.getElementById("image-current");
const temperature = document.getElementById("temperature");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
// present city name, date, icon representation of weather conditions, temperature, humidty and wind speed
// render data to elements on HTML
function displayCurrent(data) {
  cityName.innerText = "Location: " + data.name;
  //how to access icon??
  imageCurrentWeather.innerText = data.weather[0].icon;
  //
  temperature.innerText = "Temperature: " + data.main.temp;
  wind.innerText = "Wind Speed: " + data.wind.speed;
  humidity.innerText = "Humidity: " + data.main.humidity;
  var currentDateDJ = data.timezone;
  var currentDateDJ = dayjs().format("MMM D, YYYY, hh:mm:ss");
  $("#date").text(currentDateDJ);
}

// present future conditions for the city
//present 5 day forecast displaying date, icon rep of weather conditions, the temperature, the wind speed, and the humidity
function fiveDayForecast() {
  console.log(searchInput.value);
  const queryForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  // test API works:https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=45eb4c20171c3bd2b2a402297a8c7fea
  fetch(queryForecastURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayFuture(data);
    });
}
// const futureDate = document.getElementById("f-date");
// const imgFutureWeather = document.getElementById("#f-image");
// const futureTemperature = document.getElementById("#f-temp");
// const futureWind = document.getElementById("#f-wind");
// const futureHumidity = document.getElementById("#f-humidity");
var futureForecast = document.getElementById("future-forecast");

function displayFuture(data) {
  console.log(data);
  // futureDate.innerHTML = "";
  // imgFutureWeather.innerHTML = "";
  // futureTemperature.innerHTML = "";
  // futureWind.innerHTML = "";
  // futureHumidity.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    //step on e- create first element of this day (e.g. temp)
    const dateElement = document.createElement("h4");
    dateElement.innerText = "Date: " + data.list[0].dt_txt;
    dateElement.innerText = "Date: " + data.list[1].dt_txt;
    dateElement.innerText = "Date: " + data.list[2].dt_txt;
    dateElement.innerText = "Date: " + data.list[3].dt_txt;
    dateElement.innerText = "Date: " + data.list[4].dt_txt;
    document.getElementById("future-forecast").appendChild(dateElement);

    // const futureImgElement = document.createElement("img");
    // futureImgElement.src = futureWeatherIcon;
    // futureImgElement.alt = "Weather image icon";
    // imgFutureWeather.appendChild(futureImgElement);

    const tempElementFuture = document.createElement("h4");
    tempElementFuture.innerText = "Temperature: " + data.list[0].main.temp;
    document.getElementById("future-forecast").appendChild(tempElementFuture);

    const futureWindElement = document.createElement("h4");
    futureWindElement.innerText = "Wind Speed: " + data.list[0].wind.speed;
    document.getElementById("future-forecast").appendChild(futureWindElement);

    const futureHumidElement = document.createElement("h4");
    // futureHumidElement.textContent = futureHumidity;
    futureHumidElement.innerText =
      "Humidity level: " + data.list[0].main.humidity;
    // futureHumidity.appendChild(futureHumidElement);
    document.getElementById("future-forecast").appendChild(futureHumidElement);
    //step two - give elements values based off of index (e.g. first element = 0)

    //create step 3 append to HTML (section id - future-forecast)
    data.list[i].main;
    console.log(data.list[i].main);

    //append to HTML: -futureforecast
    //   futureDate = "Date: " + data.list.dt_txt;
    //   futureTemperature.innerText = "Temperature: " + data.list.main.temp;
    //   futureWind.innerText = "Wind speed: " + data.list.wind.speed;
    //   futureHumidity.innerText = "Humidity level: " + data.list.main.humidity;
  }
}

// //search history - able to click on city in search history to present current and future conditions.
// const displaySearch = getElementById("#recentSearches");

// //searchInput -is document selection for userInput

// //event listener to save search from userInput:
// searchInput.addEventListener("input", function (event) {
//   event.preventDefault();
//   var userInput = document.getElementById("#location").value;

//   if (userInput === "") {
//     displayMessage("Error", "Search cannot be blank");
//   } else {
//     localStorage.setItem("userInput", userInput);
//     renderLastSearch();
//   }
// });

// //function to render last search:
// function renderLastSearch() {
//   var search = localStorage.getItem("userInput");
//   displaySearch.textContent = search;
// }
