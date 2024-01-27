//My openWeather link and API key.
var geoURL = "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}"
var APIKey = "e8e64517935ca0b0e88c99dd00d7fc00";
//5 day forecast link (add https)
var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"

//var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// DOM element references (get all id's)
var searchForm = document.getElementById('#search-form');
var searchInput = document.getElementById('#search-input');
var searchBtn = document.getElementById('#search-button');
var todayContainer = document.getElementById('#today');
var forecastContainer = document.getElementById('#forecast');
var historyContainer = document.getElementById('#history');
var serachForm

//create event listener and call out function name (for search button)
searchBtn.addEventListener("click", searchCity)

//validate the input of the city, then call out next function
function searchCity() {

    e.preventDefault()
    var citty = searchInput.ariaValueMax.trim()
    geoCoords(city)

    searchInput.value.innerHTML = ""
}
//fetch to lat and lon from the geoURL and the call out to functions
function geoCoords(city) {
    console.log(city);

    var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
}
//fetching the city and its coorinates
fetch(geoURL)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data[0]);
        weatherCoord(data[0],city)
    }
    )

    //purpose of this function is to use geo fetch data and get weather ready to call out functions to display current day and forecast
    function weatherCoord(location, city){//changed "data[0]" to location as code didnt like the [0]
        console.log(location, city);
        var {lon, lat} = location
        var city = location.name

        var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    }

    //fething the weather for current and forecast (copy & paste fetch)
    fetch(weatherURL)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data[0]);
       //data for current day weather 1 day
        currentDay(data.list[0], city)
       //data for 5 day forecast
       forcast5Day(data.list)
    }
    )

    function currentDay(current, city){
        //current = data[0]
        console.log(current);
        //pull data info from api
        var temp = current.main.temp
        console.log(temp);
    }
//create card to list information

var card = document.createElement('div')
var cardBody = document.createElement('div')

card.append(cardBody)
//cardBody elements - title - text
var cardTitle
var cardTextTemp =

//join the card and date
cardTitle.textcontent = city


//The OpenWeather Current Weather Data documentation provides an example of how to make an API call using just the city name, as shown in the following code:


//string concatenation to create a new variable called queryURL, which will store the OpenWeather Current Weather Data URL and the necessary variables.
/*http://api.openweathermap.org/data/2.5/weather is the base URL for calling the Current Weather Data API.

The question mark (?) marks the boundary between the base URL of the API call and the query terms of the API call.
q= is the query parameter, where we can add any user input to specify the data that we want to request in the API call. The value assigned to this parameter is called the query string.

Following the query parameter, we concatenate the user input, which is stored in the variable city. This is the query string assigned to the query parameter.

The ampersand character (&) indicates that we're adding another parameter after the query parameter.

Next, we concatenate the other required parameter, appid=, where we'll add the API key specific to the application.

Finally, we concatenate the APIKey variable that contains the key we obtained at the beginning of this guide.  */



//Now that i have created A query URL, i only need to call the Fetch API to pass the query URL in as a parameter:

