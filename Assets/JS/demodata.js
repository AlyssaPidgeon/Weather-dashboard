// apiKey = "45eb4c20171c3bd2b2a402297a8c7fea";
// //retrieve geographical coordinates given city name -convert name of location to geographical coordinates (lat, lon)

// //API call for coordinates by location name:
// //user input text select:
// var searchInput = document.querySelector("#locationInput");
// //create function to fetch API data from user Input

// function locationAPI(searchInput) {
//   //set limit to 4 - this is the number of locations in the API response:
//   const limit = "4";
//   //geocoding API:
//   // const locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city name},${state code},${country code}&limit=${limit}&appid=${apiKey}`;
//   //for searchInput
//   console.log(searchInput);
//   const locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=${limit}&appid=${apiKey}`;
//   // test locationURL = http://api.openweathermap.org/geo/1.0/direct?q=Darwin&limit=4&appid=45eb4c20171c3bd2b2a402297a8c7fea

//   fetch(locationURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data[0]);
//       console.log(data[0].lat);
//       console.log(data[0].lon);
//     });
// }

// `https://api.openweathermap.org/data/2.5/weather?q=Darwin&units=imperial&appid=45eb4c20171c3bd2b2a402297a8c7fea`;

// //event handler onto search field to retrieve search ersults adn JSON request? (?API automatically JSON format)

// searchInput.addEventListener("input", function (event) {
//   const userInput = searchInput.value.trim();
//   console.log(userInput);
//   locationAPI(userInput);
// });

// //this retrieves the lat and lon to use in the queryURL below:

// var lat = "";
// var lon = "";
// const queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
// // test API works:https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=45eb4c20171c3bd2b2a402297a8c7fea
// fetch(queryURL)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     //call data funtion below?
//     displayCurrent(data);
//   });
//assign data array to element
//create the new elements:
// if (data.length > 0) {
//   //use forEach function for each new element to be displayed from array:
//   data.array.forEach((element) => {
//     // find data endpoint for date -?time???
//     const date = element.time;
//     //data array from API; weather icon is -->weather --> icon
//     const futureWeatherIcon = element.icon;

//     //data array from API: temperature is temp
//     const futureTemp = element.temp;

//     //data array from API: wind is speed (?speed in what units?)
//     const futureWind = element.wind;

//     //data array from API: humidty is humidity:
//     const futureHumid = element.humidity;

//     //create futureDate element:
//     const dateElement = document.createElement("h4");
//     dateElement.textContent = date;
//     futureDate.appendChild(dateElement);

//     //create imageFutureWeather element:
//     const futureImgElement = document.createElement("img");
//     futureImgElement.src = futureWeatherIcon;
//     futureImgElement.alt = "Weather image icon";
//     imgFutureWeather.appendChild(futureImgElement);

//     //create temperature title element for futureTemp:
//     const tempElementFuture = document.createElement("h4");
//     tempElementFuture.textContent = futureTemp;
//     futureTemperature.appendChild(tempElementFuture);

//     //create wind title element
//     const futureWindElement = document.createElement("h4");
//     futureWindElement.textContent = futureWind;
//     futureWind.appendChild(futureWindElement);

//     //create humidity title element for humidCurrent:
//     const futureHumidElement = document.createElement("h4");
//     futureHumidElement.textContent = futureHumid;
//     futureHumidity.appendChild(futureHumidElement);
// //   });
// }