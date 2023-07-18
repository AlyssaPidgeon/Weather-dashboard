apiKey = "45eb4c20171c3bd2b2a402297a8c7fea";

//user input text select:
var searchInput = document.getElementById("locationInput");
var submitButton = document.getElementById("submitButton");
//create function to fetch API data from user Input

//event handler onto search field to retrieve search ersults adn JSON request (?API automatically JSON format)

function fetchAPI(coordinate) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${coordinate}&units=metric&appid=${apiKey}`;
  console.log(coordinate);
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
var imageCurrentWeather = document.getElementById("image-current");
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
  var url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  imageCurrentWeather.setAttribute("src", url);
  console.log(url);
  temperature.innerText = "Temperature: " + data.main.temp + "℃";
  wind.innerText = "Wind Speed (meter/second): " + data.wind.speed;
  humidity.innerText = "Humidity (%): " + data.main.humidity;
  var currentDateDJ = data.timezone;
  var currentDateDJ = dayjs().format("DD MMMM YYYY, hh:mm:ss");
  $("#date").text(currentDateDJ);
}

// present future conditions for the city
// present 5 day forecast displaying date, icon rep of weather conditions, the temperature, the wind speed, and the humidity
function fiveDayForecast(coordinates) {
  console.log(coordinates);
  const queryForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${coordinates}&appid=${apiKey}&units=metric`;

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

var futureForecast = document.getElementById("future-forecast");

function displayFuture(data) {
  console.log(data);
  document.getElementById("future-forecast").innerHTML = "";
  //need data to be pulled from list number 8, 16, 24, 32, 40 for days 1,2,3,4,5 respectively:

  for (let i = 0; i < data.list.length; i = i + 8) {
    var dateElement = document.createElement("h4");
    var dateData = data.list[i].dt_txt;
    console.log(data.list[i].dt_txt);
    var dateElementConverted = dayjs(dateData).format("DD MMMM YYYY, hh:mm");
    dateElement.innerText = "Date: " + dateElementConverted;
    document.getElementById("future-forecast").appendChild(dateElement);

    //create an element for the icon:
    var futureIconElement = document.createElement("img");
    futureIconElement.alt = "Weather image icon";
    //create variable to access data point with index
    var futureIcon = data.list[i].weather[0].icon;
    var futureUrl = `https://openweathermap.org/img/wn/${futureIcon}@2x.png`;
    futureIconElement.setAttribute("src", futureUrl);
    console.log(futureIconElement);
    document.getElementById("future-forecast").appendChild(futureIconElement);

    var tempElementFuture = document.createElement("h4");
    tempElementFuture.innerText =
      "Temperature: " + data.list[i].main.temp + "℃";
    document.getElementById("future-forecast").appendChild(tempElementFuture);

    var futureWindElement = document.createElement("h4");
    futureWindElement.innerText =
      "Wind Speed (meter/second): " + data.list[i].wind.speed;
    document.getElementById("future-forecast").appendChild(futureWindElement);

    var futureHumidElement = document.createElement("h4");
    futureHumidElement.innerText =
      "Humidity level (%): " + data.list[i].main.humidity;
    document.getElementById("future-forecast").appendChild(futureHumidElement);
    linebreak = document.createElement("br");
    document.getElementById("future-forecast").appendChild(linebreak);
    linebreak = document.createElement("br");
    document.getElementById("future-forecast").appendChild(linebreak);
  }
}

const displaySearch = document.getElementById("recent-searches");
//function to render last search:
function renderSearchHistory() {
  // event.preventDefault();
  var lastSearch = JSON.parse(localStorage.getItem("saved-search"));
  console.log(lastSearch);

  // displaySearch.innerHTML = lastSearch;

  if (lastSearch) {
    var searchHistory = document.createElement("button");
    //add class name for CSS styling:
    searchHistory.classList.add(
      "Search-btn",
      "button",
      "is-danger",
      "is-medium",
      "is-fullwidth",
      "is-outlied",
      "is-rounded",
      "is-hovered"
    );
    searchHistory.setAttribute("search-location", lastSearch);
    searchHistory.innerHTML = lastSearch;
    //append to HTML ID recent-searches
    displaySearch.appendChild(searchHistory);
    linebreak = document.createElement("br");
    document.getElementById("recent-searches").appendChild(linebreak);
  } else {
    alert("Please enter in a city location");
  }
}

function handleSearchHistory(e) {
  var searchBtn = e.target;
  console.log(searchBtn);
  var search = searchBtn.getAttribute("search-location");
  console.log(search);
  fetchAPI(search);
  fiveDayForecast(search);
}
//load past location searches:
loadHistory = function () {
  searchArray = JSON.parse(localStorage.getItem("search-location"));
  if (searchArray) {
    searchHistoryArray = JSON.parse(localStorage.getItem("search-location"));
    for (let i = 0; i < searchArray.length; i++) {
      //create element for the search history
      var searchHistory = document.createElement("button");

      searchHistory.setAttribute("search-location", searchArray[i]);
      searchHistory.innerHTML = searchArray[i];
      displaySearch.appendChild(searchHistory);
    }
  }
};

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var userInput = searchInput.value;
  console.log(userInput);

  //save to localstorage:
  localStorage.setItem("saved-search", JSON.stringify(userInput));
  console.log(userInput);
  fetchAPI(searchInput.value);
  fiveDayForecast(searchInput.value);
  renderSearchHistory();
});

displaySearch.addEventListener("click", handleSearchHistory);
