$(document).ready(function() {
  var apiKey = "8759341f015b5fa1502e0bb2d6da1061";
  var date = moment().format("L");

  $(".cityBtn").on("click", function() {
    // Current weather
    var cityInput = $("#cityInput").val();
    var weatherURL =
      "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" +
      cityInput +
      "&units=imperial&appid=" +
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
      var icon =
        "http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";

      $("#cityName").html(name + " " + date);
      $("#cityName").append(
        "<img class='imageSave' id='image' src='" + icon + "'>"
      );
      $("#temp").html("Temperature: " + temp + " °F");
      $("#humid").html("Humidity: " + humidity + "%");
      $("#windSpeed").html("Wind speed: " + wind + " mph");

      $(this).each(function() {
        var coord = obj.coord;
        uvIndex(coord);
      });

      save();
    });

    function uvIndex(coords) {
      var lon = coords.lon;
      var lat = coords.lat;
      // Current UV Index
      var urlIndex =
        "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey;

      $.ajax({
        url: urlIndex,
        method: "GET"
      }).then(function(obj) {
        var uv = obj.value;
        $("#uvIndex").html("UV Index: " + uv);
      });
    }
  });

  //First gets city name
  $(".city").on("click", function() {
    var getCity = $(this).attr("city");

    findCity(getCity);
  });

  function findCity(city) {
    console.log(city);
    var weatherURL =
      "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
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
      var icon =
        "http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";

      $("#cityName").html(name + " " + date + '<img id="image" src="" />');
      $("#image").attr("src", icon);
      $("#temp").html("Temperature: " + temp + " °F");
      $("#humid").html("Humidity: " + humidity + "%");
      $("#windSpeed").html("Wind speed: " + wind + " mph");

      $(this).each(function() {
        var coord = obj.coord;
        uvIndex(coord);
      });
    });

    function uvIndex(coords) {
      var lon = coords.lon;
      var lat = coords.lat;
      // Current UV Index
      var urlIndex =
        "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey;

      $.ajax({
        url: urlIndex,
        method: "GET"
      }).then(function(obj) {
        var uv = obj.value;
        $("#uvIndex").html("UV Index: " + uv);

        save();
      });
    }
  }

  function save() {
    $(".save").each(function() {
      var id = $(this).attr("id");
      var value = $(this).text();
      localStorage.setItem(id, value);
    });
    $(".imageSave").each(function() {
      var id = $(this).attr("id");
      var value = $(this).attr("src");
      localStorage.setItem(id, value);
    });
  }

  $(".save").each(function() {
    var id = $(this).attr("id");
    console.log(id);
    $(this).html(localStorage.getItem(id));
  });
});
