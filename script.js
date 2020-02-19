var apiKey = "8759341f015b5fa1502e0bb2d6da1061";

// Current weather
var weatherURL =
  "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=miami&units=imperial&appid=" +
  apiKey;

$.ajax({
  url: weatherURL,
  method: "GET"
}).then(function(obj) {
  console.log(obj);

  var name = obj.name;
  var temp = obj.main.temp;
  var humidity = obj.main.humidity;
  var wind = obj.wind.speed;

  $("#cityName").html(name);
  $("#temp").html(temp + " °F");
  $("#humid").html(humidity + "%");
  $("#windSpeed").html(wind + " mph");

  $(this).each(function() {
    var coord = obj.coord;
    uvIndex(coord);
  });
});

// 5 day Forecast

var forecastURL =
  "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?q=miami&appid=" +
  apiKey;

$.ajax({
  url: forecastURL,
  method: "GET"
}).then(function(obj) {
  console.log(obj);
});

// Current UV Index
function uvIndex(coords) {
  var lon = coords.lon;
  var lat = coords.lat;

  var url =
    "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;

  $.ajax({
    url: url,
    method: "GET"
  }).then(function(obj) {
    var uv = obj.value;
    $("#uvIndex").html(uv);
  });
}
