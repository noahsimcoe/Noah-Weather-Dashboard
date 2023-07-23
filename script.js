$(function () {

var buttonEl = document.querySelector(".button");
var historyEl = document.querySelector("#search-history");
var clearEl = document.querySelector(".clear");
var city;
var cityHistory = [];

// button that starts the search up once clicked
buttonEl.addEventListener("click", startPage);

function loadCity() {
    // sets the city variable to whatever the user last submitted
    var lastCity = localStorage.getItem("lastPicked");
    if (lastCity) {
      city = lastCity;
      getWeather();
      // if there is not a last picked city, Los Angeles is the default
    } else {
      city = "Los Angeles";
      getWeather();
    }
  }

loadCity();

// starts up the webpage
function startPage(e) {
    e.preventDefault();
    saveCity();
    getWeather();
}

// saves in local storage the last picked city
function saveCity() {
    city = $("#search-bar").val();
    localStorage.setItem("lastPicked", city);
}
    function getWeather () {
        var apiKey = "1244d2a48badc345c9b4913a87c4a16a";
        var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        var dateNow = dayjs().format('YYYY-MM-DD');

        fetch(queryUrl)
            .then (response => response.json())
            .then (async function(data) {
                latitude = data.coord.lat;
                longitude = data.coord.lon;
                var response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
                response.json().then((data_1) => {

                    // setting/formatting of required pieces of data from the request
                    currentTemp = Math.round((((data.main.temp-273.15)*1.8)+32) * 100) / 100;
                    currentWind = Math.round((data.wind.speed * 2.236936) * 100) / 100;
                    currentHumidity = data.main.humidity;
                    nameDate = `${data.name} (${dateNow})`;
                    firstIcon = data.weather[0].icon;
                    iconUrl = `https://openweathermap.org/img/w/${firstIcon}.png`;
                    $("#1 .icon").attr('src', iconUrl);
                    $("#1 .temp").text(`Temp: ${currentTemp}°F`);
                    $("#1 .wind").text(`Wind: ${currentWind} MPH`);
                    $("#1 .humidity").text(`Humidity: ${currentHumidity}%`);
                    $("#1 .name-date").text(nameDate);

                    // loops through the items required in the array for the 5 forecast days
                    for (var i = 4; i < 40; i = i + 8) {
                        temp = Math.round((((data_1.list[i].main.temp-273.15)*1.8)+32) * 100) / 100;
                        wind = Math.round((data_1.list[i].wind.speed * 2.236936) * 100) / 100;
                        humidity = data_1.list[i].main.humidity;
                        date = (data_1.list[i].dt_txt).split(" ");
                        date1 = date[0].split("-");
                        date2 = date1[1] + "/" + date1[2];
                        icon = data_1.list[i].weather[0].icon;
                        iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
                        $(`#${i} .icon`).attr('src', iconUrl);
                        $(`#${i} .date`).text(date2);
                        $(`#${i} .temp`).text(`Temp: ${temp}°F`);
                        $(`#${i} .wind`).text(`Wind: ${wind} MPH`);
                        $(`#${i} .humidity`).text(`Humidity: ${humidity}%`);
                    }
                });
            })
    }
});


