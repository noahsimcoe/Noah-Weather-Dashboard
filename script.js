$(function () {
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
    var city = "Kansas City";
    var queryUrlOne = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    var dateNow = dayjs().format('YYYY-MM-DD');

    function getApiOne (url) {
        fetch(url)
            .then (response => response.json())
            .then (async function(data) {
                latitude = data.coord.lat;
                longitude = data.coord.lon;
                var response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
                response.json().then((data_1) => {
                    currentTemp = Math.round((((data.main.temp-273.15)*1.8)+32) * 100) / 100;
                    currentWind = Math.round((data.wind.speed * 2.236936) * 100) / 100;
                    currentHumidity = data.main.humidity;
                    nameDate = `${data.name} (${dateNow})`;
                    $("#1 .temp").text(`Temp: ${currentTemp}°F`);
                    $("#1 .wind").text(`Wind: ${currentWind} MPH`);
                    $("#1 .humidity").text(`Humidity: ${currentHumidity}%`);
                    $("#1 .name-date").text(nameDate);

                    for (var i = 4; i < 40; i = i + 8) {
                        temp = Math.round((((data_1.list[i].main.temp-273.15)*1.8)+32) * 100) / 100;
                        wind = Math.round((data_1.list[i].wind.speed * 2.236936) * 100) / 100;
                        humidity = data_1.list[i].main.humidity;
                        date = (data_1.list[i].dt_txt).split(" ");
                        $(`#${i} .date`).text(date[0]);
                        $(`#${i} .temp`).text(`Temp: ${temp}°F`);
                        $(`#${i} .wind`).text(`Wind: ${wind} MPH`);
                        $(`#${i} .humidity`).text(`Humidity: ${humidity}%`);

                    }
// result = dayjs().add(dayjs.duration({'days' : 1}))
//const a = dayjs()
//const b = a.add(7, 'day')

// date =
                });
            })
    }

    getApiOne(queryUrlOne)
});


