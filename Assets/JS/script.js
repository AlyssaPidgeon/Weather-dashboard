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
  // fiveDayForecast(userInput);
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
var imageCurrentWeather = document.getElementById("image-current").src;
const temperature = document.getElementById("temperature");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
// present city name, date, icon representation of weather conditions, temperature, humidty and wind speed
// render data to elements on HTML
function displayCurrent(data) {
  cityName.innerText = "Location: " + data.name;
  //weather icon - need to use weather icon API:
  var icon = data.weather[0].icon;
  console.log(icon);
  var url = `https://openweathermap.org/img/wn/${icon}@2x.png"`;
  imageCurrentWeather = url;

  // test url : https://openweathermap.org/img/wn/10d@2x.png

  console.log(url);
  //
  temperature.innerText = "Temperature: " + data.main.temp;
  wind.innerText = "Wind Speed (meter/second): " + data.wind.speed;
  humidity.innerText = "Humidity (%): " + data.main.humidity;
  var currentDateDJ = data.timezone;
  var currentDateDJ = dayjs().format("MMM D, YYYY, hh:mm:ss");
  $("#date").text(currentDateDJ);
}

// present future conditions for the city
//present 5 day forecast displaying date, icon rep of weather conditions, the temperature, the wind speed, and the humidity
// function fiveDayForecast() {
//   console.log(searchInput.value);
//   const queryForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=${apiKey}&units=metric`;
//   // test API works:https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=45eb4c20171c3bd2b2a402297a8c7fea
//   fetch(queryForecastURL)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       displayFuture(data);
//     });
// }

// var futureForecast = document.getElementById("future-forecast");

// function displayFuture(data) {
//   console.log(data);

//   for (let i = 0; i < 5; i++) {
//     const dateElement = document.createElement("h4");
//     dateElement.innerText = "Date: " + data.list[i].dt_txt;
//     console.log(data.list[i].dt_txt);
//     document.getElementById("future-forecast").appendChild(dateElement);

//     const futureIconElement = document.createElement("icon");
//     futureIconElement.src = futureWeatherIcon;
//     futureIconElement.alt = "Weather image icon";
//     futureIconElement.innerText = data.list[i].weather.icon;
//     document.getElementById("future-forecast").appendChild(futureIconElement);

//     const tempElementFuture = document.createElement("h4");
//     tempElementFuture.innerText =
//       "Temperature (Celsius): " + data.list[i].main.temp;
//     document.getElementById("future-forecast").appendChild(tempElementFuture);

//     const futureWindElement = document.createElement("h4");
//     futureWindElement.innerText =
//       "Wind Speed (meter/second): " + data.list[i].wind.speed;
//     document.getElementById("future-forecast").appendChild(futureWindElement);

//     const futureHumidElement = document.createElement("h4");
//     futureHumidElement.innerText =
//       "Humidity level (%): " + data.list[i].main.humidity;
//     document.getElementById("future-forecast").appendChild(futureHumidElement);
//     data.list[i].main;
//     console.log(data.list[i].main);
//   }
// }

// // //search history - able to click on city in search history to present current and future conditions.
// // const displaySearch = getElementById("#recentSearches");

// // //searchInput -is document selection for userInput

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
