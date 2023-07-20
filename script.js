// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// search bar area
// search button to press
// area for past searches to be stored (local storage)
// current and future conditions of selected city

var apiKey = "1244d2a48badc345c9b4913a87c4a16a";
var city = "Miami";
var queryUrlOne = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
var queryUrlTwo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
var lat;
var lon;

function getApiOne (url) {
    fetch(url)
        .then (function(response) {
            return response.json();
        })
        .then (function(data) {
            lat = data.coord.lat;
                console.log(lat);
            lon = data.coord.lon;
                console.log(lon);
            console.log(queryUrlTwo);
        })
    fetch(queryUrlTwo)
        .then (function(response) {
            return response.json();
        })
        .then (function(data) {
            console.log(data);
        })
}

getApiOne(queryUrlOne);