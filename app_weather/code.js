let lat;
let long;

function returnApiKey() {
  const apiKey = "write your API key from https://openweathermap.org ";
  return apiKey;
}

function startApp() {
  //reference to navigator Object
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        getWeatherData();
      }
    );
  }
}

function getWeatherData() {

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${returnApiKey()}`;
  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(response => updateWeatherData(response))
}

function updateWeatherData(data) {

  let imgUrl = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

  const temp = data.main.temp;
  const pressure = data.main.pressure;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const cloudsPercentage = data.clouds.all;
  const sunRise = new Date(data.sys.sunrise * 1000);
  const sunSet = new Date(data.sys.sunset * 1000);
  const city = data.name;

  document.getElementById("temp").innerHTML = temp + " ℃";
  document.getElementById("pressure").innerHTML = pressure + " hPa";
  document.getElementById("humidity").innerHTML = humidity + " %";
  document.getElementById("windSpeed").innerHTML = windSpeed + " km/h";
  document.getElementById("cloudsPerce").innerHTML = cloudsPercentage + " %";
  document.getElementById("sunRise").innerHTML = sunRise.getHours() + ":" + sunRise.getMinutes();
  document.getElementById("sunSet").innerHTML = sunSet.getHours() + ":" + sunSet.getMinutes();
  document.getElementById("currentWeatherImg").setAttribute("src", imgUrl);
  document.getElementById("locationLink").innerHTML = city;
  document.getElementById("locationLink").href = `https://openstreetmap.org/#map=9/${lat}/${long}`;
  document.getElementById("locationLink").href = `https://openstreetmap.org/#map=9/${lat}/${long}`;
}