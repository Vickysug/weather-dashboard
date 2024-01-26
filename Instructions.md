1: Project Setup
 HTML Structure:
    ◦ Create an HTML file (index.html) with the basic structure.
    ◦ Include the necessary meta tags, CSS reset, and title for the webpage.
    ◦ Create a container with two columns: one for the search form and search history, and the other for displaying weather information.
   2 Include Dependencies:
    ◦ Add Day.js and jQuery as script dependencies in the HTML file.
    ◦ Link to script.js to include your project-specific JavaScript.
  3: JavaScript - Global Variables
    ◦ Declare Global Variables:Create global variables for the search history array, OpenWeather API root URL, and the API key placeholder.
    ◦ Set up variables to reference DOM elements using jQuery.
 4: JavaScript - Functions for Search History
  Render Search History:
    ◦ Implement a function (renderSearchHistory) to display search history buttons on the page. This function iterates through the search history array and creates buttons for each search term.
 5 Append to Search History:
    ◦ Write a function (appendToHistory) to add a search term to the search history array.
    ◦ Update the local storage with the latest search history.
    ◦ Call the renderSearchHistory function to update the displayed history.
 6 Initialize Search History:
    ◦ Create a function (initSearchHistory) to initialize the search history from local storage on page load.
 7: JavaScript - Functions for Weather Display
 . Render Current Weather:
    ◦ Implement a function (renderCurrentWeather) to display the current weather for a given city. This function constructs HTML elements to present key weather information.
  Render Forecast Card:
    ◦ Create a function (renderForecastCard) to display a forecast card for a specific day. This function constructs HTML elements for a card displaying forecast information.
  Render 5-Day Forecast:
    ◦ Write a function (renderForecast) to display the 5-day forecast. This function filters the forecast data to include only noon data and then calls the renderForecastCard function for each day.
  Render Items:
    ◦ Implement a function (renderItems) to render both the current weather and the 5-day forecast.
 8: JavaScript - API Calls
  Fetch Weather Data:
    ◦ Create a function (fetchWeather) that takes the location's coordinates and city name, constructs the API URL, and fetches weather data from the OpenWeather API.
    ◦ Call the renderItems function with the received data.
  Fetch Coordinates:
    ◦ Write a function (fetchCoords) to fetch geographic coordinates for a given city using the OpenWeather API.
    ◦ If successful, call fetchWeather with the location data.
 9: JavaScript - Event Handling
 Handle Form Submission:
    ◦ Set up an event handler (handleSearchFormSubmit) for the form submission.
    ◦ Prevent the default form submission, get the search input, and call fetchCoords with the search term.
 Handle Search History Click:
    ◦ Implement an event handler (handleSearchHistoryClick) for clicking on search history buttons.
    ◦ Retrieve the search term from the clicked button and call fetchCoords with the search term.
  Event Listeners:
    ◦ Initialize the search history on page load using initSearchHistory.
    ◦ Set up event listeners for form submission and search history button clicks.
 10: Finishing Touches
 API Key:
    ◦ Replace the placeholder for the OpenWeather API key with your actual API key.
 Styling (Optional):
    ◦ Add CSS styles to enhance the visual appeal of your weather dashboard.
 11: Testing
    ◦ Test Your Application:Open the HTML file in a web browser and test the functionality.
    ◦ Ensure that searches update the UI with current weather and the 5-day forecast.
    ◦ Verify that search history is displayed correctly.