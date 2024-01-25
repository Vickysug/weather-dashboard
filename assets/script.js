//My openWeather API key.
var APIKey = "e8e64517935ca0b0e88c99dd00d7fc00";

var city;

//The OpenWeather Current Weather Data documentation provides an example of how to make an API call using just the city name, as shown in the following code:

api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//string concatenation to create a new variable called queryURL, which will store the OpenWeather Current Weather Data URL and the necessary variables.
/*http://api.openweathermap.org/data/2.5/weather is the base URL for calling the Current Weather Data API.

The question mark (?) marks the boundary between the base URL of the API call and the query terms of the API call.
q= is the query parameter, where we can add any user input to specify the data that we want to request in the API call. The value assigned to this parameter is called the query string.

Following the query parameter, we concatenate the user input, which is stored in the variable city. This is the query string assigned to the query parameter.

The ampersand character (&) indicates that we're adding another parameter after the query parameter.

Next, we concatenate the other required parameter, appid=, where we'll add the API key specific to the application.

Finally, we concatenate the APIKey variable that contains the key we obtained at the beginning of this guide.  */

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

//Now that i have created A query URL, i only need to call the Fetch API to pass the query URL in as a parameter:

fetch(queryURL)