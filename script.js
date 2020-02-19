var apiKey = "8759341f015b5fa1502e0bb2d6da1061";

// Current weather
var weatherUrl =
  "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=miami&units=imperial&appid=" +
  apiKey;

$.ajax({
  url: weatherUrl,
  method: "GET"
}).then(function(obj) {
  console.log(obj);

  //Main temps
  var temp = obj.main.temp;
  var humidity = obj.main.humidity;

  //wind

  console.log(temp, humidity);
});

// 5 day Forecast

// UV Index
