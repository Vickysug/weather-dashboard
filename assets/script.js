//My openWeather link and API key.
var geoURL = "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}"
var APIkey = "e8e64517935ca0b0e88c99dd00d7fc00";
//5 day forecast link (add https)
var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"

//var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

// DOM element references (get all id's)
var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('search-input');
var searchBtn = document.getElementById('search-button');
var todayContainer = document.getElementById('today');
var forecastContainer = document.getElementById('forecast');
var historyContainer = document.getElementById('history');
var serachForm

//create event listener and call out function name (for search button)
searchBtn.addEventListener("click", searchCity)

//validate the input of the city, then call out next function
function searchCity(e) {
console.log(searchInput.value)
    e.preventDefault()
    var city = searchInput
    geoCoords(city)

    searchInput.value.innerHTML = ""
}
//fetch to lat and lon from the geoURL and the call out to functions
function geoCoords(city) {
    console.log(city);

    var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`

//fetching the city and its coorinates
fetch(geoURL)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data[0]);
        appendToHistory(city);
        weatherCoord(data[0], city)
    }
    )
}
//purpose of this function is to use geo fetch data and get weather ready to call out functions to display current day and forecast
function weatherCoord(location, city) {//changed "data[0]" to location as code didnt like the [0]
    console.log(location, city);
    var { lon, lat } = location
    var city = location.name

    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`


    //fething the weather for current and forecast (copy & paste fetch)
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data[0]);
            //data for current day weather 1 day
            currentDay(data.list[0], city, data.list.timezone)
            //data for 5 day forecast
            forcast5Day(data.list)
        }
        )
}
//to display weather for one day
function currentDay(weather, city, timezone) {
    //current = data[0]
    console.log(weather);
    //pull data info from api
    var temp = weather.main.temp
    console.log(temp);

    //create card to list information
    var humidity = weather.main.humidity;
    var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png;`
    var iconDescription = weather.weather[0].description || weather[0].main;
    var card = document.createElement('div')
    var cardBody = document.createElement('div')
    var heading = document.createElement('h2');
    var weatherIcon = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');

    card.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    heading.setAttribute('class', 'h3 card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', iconDescription);
    weatherIcon.setAttribute('class', 'weather-img');

    //cardBody elements - title - text
    var cardTitle
    var cardTextTemp =

        //join the card and date
        cardTitle.textContent = city
    heading.textContent = `${city} (${date})`;
    tempEl.textContent = `Temp: ${tempF}°F`;
    windEl.textContent = `Wind: ${windMph} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;

    //append
    heading.append(weatherIcon);
    card.append(cardBody);
    cardBody.append(heading, tempEl, windEl, humidityEl);

    todayContainer.innerHTML = '';
    todayContainer.append(card);
}
// Function to display a forecast card given an object from open weather api
// daily forecast.
function renderForecastCard(forecast) {
    // variables for data from api
    var iconUrl = `https://openweathermap.org/img/w/${forecast}.weather[0].icon}.png`;
    var iconDescription = forecast.weather[0].description;
    var tempF = forecast.main.temp;
    var humidity = forecast.main.humidity;
    var windMph = forecast.wind.speed;
    // Create elements for a card
    var col = document.createElement('div');
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var cardTitle = document.createElement('h5');
    var weatherIcon = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    col.append(card);
    card.append(cardBody);
    cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);
    col.setAttribute('class', 'col-md');
    col.classList.add('five-day-card');
    card.setAttribute('class', 'card bg-primary h-100 text-white');
    cardBody.setAttribute('class', 'card-body p-2');
    cardTitle.setAttribute('class', 'card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');
    // Add content to elements
    cardTitle.textContent = dayjs(forecast.dt_txt).format('M/D/YYYY');
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', iconDescription);
    tempEl.textContent = `Temp: ${tempF} °F`;
    windEl.textContent = `Wind: ${windMph} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    forecastContainer.append(col);
}

// Function to display 5 day forecast.
function forcast5Day(dailyForecast) {
    // Create unix timestamps for start and end of 5 day forecast
    var startDt = dayjs().add(1, 'day').startOf('day').unix();
    var endDt = dayjs().add(6, 'day').startOf('day').unix();
    var headingCol = document.createElement('div');
    var heading = document.createElement('h4');
    headingCol.setAttribute('class', 'col-12');
    heading.textContent = '5-Day Forecast:';
    headingCol.append(heading);
    forecastContainer.innerHTML = '';
    forecastContainer.append(headingCol);
    for (var i = 0; i < dailyForecast.length; i++) {
        // First filters through all of the data and returns only data that falls between one day after the current data and up to 5 days later.
        if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
            // Then filters through the data and returns only data captured at noon for each day.
            //11: 29
            if (dailyForecast[i].dt_txt.slice(11, 13) == "12") {
                renderForecastCard(dailyForecast[i]);
            }
        }
    }
}
// function renderItems(city, data) {
//     renderCurrentWeather(city, data.list[0], data.city.timezone);
//     renderForecast(data.list);
// }
// Fetches weather data for given location from the Weather Geolocation
// endpoint; then, calls functions to display current and forecast weather data.
// function fetchWeather(location) {
//     var { lat } = location;
//     var { lon } = location;
//     var city = location.name;
//     var apiUrl = `${weatherApiRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIkey}`;
//     fetch(apiUrl)
//         .then(function (res) {
//             return res.json();
//         })
//         .then(function (data) {
//             renderItems(city, data);
//         })
//         .catch(function (err) {
//             console.error(err);
//         });
// }
// function fetchCoords(search) {
//     var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherAPIkey}`;
//     fetch(apiUrl)
//         .then(function (res) {
//             return res.json();
//         })
//         .then(function (data) {
//             if (!data[0]) {
//                 alert('Location not found');
//             } else {
//                 appendToHistory(search);
//                 fetchWeather(data[0]);
//             }
//         })
//         .catch(function (err) {
//             console.error(err);
//         });
// }
function handleSearchFormSubmit(e) {
    // Don't continue if there is nothing in the search form
    if (!searchInput.value) {
        return;
    }
    e.preventDefault();
    var search = searchInput.value.trim();
    fetchCoords(search);
    searchInput.value = '';
}
function handleSearchHistoryClick(e) {
    // Don't do search if current elements is not a search history button
    if (!e.target.matches('.btn-history')) {
        return;
    }
    var btn = e.target;
    var search = btn.getAttribute('data-search');
    fetchCoords(search);

initSearchHistory();
searchForm.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);
}
//The OpenWeather Current Weather Data documentation provides an example of how to make an API call using just the city name, as shown in the following code:


//string concatenation to create a new variable called queryURL, which will store the OpenWeather Current Weather Data URL and the necessary variables.
/*http://api.openweathermap.org/data/2.5/weather is the base URL for calling the Current Weather Data API.

The question mark (?) marks the boundary between the base URL of the API call and the query terms of the API call.
q= is the query parameter, where we can add any user input to specify the data that we want to request in the API call. The value assigned to this parameter is called the query string.

Following the query parameter, we concatenate the user input, which is stored in the variable city. This is the query string assigned to the query parameter.

The ampersand character (&) indicates that we're adding another parameter after the query parameter.

Next, we concatenate the other required parameter, appid=, where we'll add the API key specific to the application.

Finally, we concatenate the APIkey variable that contains the key we obtained at the beginning of this guide.  */



//Now that i have created A query URL, i only need to call the Fetch API to pass the query URL in as a parameter:
