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

function getApiOne (url) {
    fetch(url)
        .then (response => response.json())
        .then (async function(data) {
            latitude = data.coord.lat;
            longitude = data.coord.lon;

            var response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
            response.json().then((data_1) => {
                console.log(data_1);
            });
        })
}

getApiOne(queryUrlOne);


