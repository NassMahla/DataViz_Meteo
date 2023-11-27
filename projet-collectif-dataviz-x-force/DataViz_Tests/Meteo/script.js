const API_KEY = "554e3c56cfb28bccd863b1120534404e";
let CITY = "";
let lat = 0;
let lon = 0;
//const API_URL_MAIN = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
let API_GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${CITY}&limit=1&appid=${API_KEY}`;
document.querySelector("#search").addEventListener("click", getWeather);
function geoCoding(city) {
  API_GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  return fetch(API_GEO_URL)
    .then((response) => response.json())
    .then((data) => {
      lat = data[0].lat;
      lon = data[0].lon;
      console.log(lat, lon);
      document.querySelector(".meteoBox").innerHTML = `
        <div>
          <p>Latitude: ${lat}</p>
          <p>Longitude: ${lon}</p>
        </div>`;
    })
    .catch((error) => {
      console.error(error);
    });
}
function getWeather(e) {
  CITY = document.querySelector("#cityName").value;
  geoCoding(CITY)
    .then(() => {
      // Use lat and lon values here
      console.log("geocoding", lat, lon);
      const API_URL_MAIN = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      fetch(API_URL_MAIN)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.main.temp_min)
          let rainCheck = `<p>Pas de pluie</p>`
          if (data.hasOwnProperty("rain")) {
            rainCheck = `<p>Pluie: ${data.rain["1h"]}</p>`
          }
          document.querySelector(".meteoBox").innerHTML = `
        <div>
        </div>
        <div class="cityInfos">
          <h1>${data.name}</h1>
          <p>Température: ${data.main.temp_min}</p>
          <p>Humidité: ${data.main.humidity}</p>
          <p>Vent: ${data.wind.speed}</p>
          ${rainCheck}
        </div > `
        })
        .catch((err) => {
          document.querySelector(".meteoBox").innerHTML = `
          <h4> City not found :déçu:</h4>
        `;
          console.log("City not found", err);
        });
      e.preventDefault();
    })
}