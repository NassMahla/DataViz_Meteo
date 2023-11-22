const API_KEY = "554e3c56cfb28bccd863b1120534404e";
const CITY = "";
const lat = 0
const lon = 0
const API_URL_MAIN = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
const API_GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${CITY}&limit=1&appid=${API_KEY}`;

document.querySelector("#search").addEventListener("click", getWeather);

function geoCoding() {
  fetch(API_GEO_URL)
  .then((response) => response.json())
  .then((data) => {
    const lat = data.lat;
    console.log(lat)
    const lon = data.lon;
    console.log(lon)
    document.querySelector(".meteoBox").innerHTML = `
    <div>
    <p>Latitude: ${console.log(lat)}</p>
    <p>Longitude: ${lon}</p>   
    </div>`
  })
  .catch(error => {
    console.error(error);
  });
}



function getWeather(e) {
  const CITY = document.querySelector("#cityName").value;
  console.log(fetch(API_GEO_URL).then((response) => response.json()))
  
  geoCoding(CITY)

  // console.log(fetch(API_URL_MAIN).then((response) => response.json()))
  .then(console.log(lat))
  .then(console.log(lon))

  .then(fetch(API_URL_MAIN))
  .then((response) => response.json())
  .then((data) => {
      document.querySelector(".meteoBox").innerHTML = `
      <div>
      <img
      src="${data.sprites.other["official-artwork"].front_default}"
      alt="City name"
      /> 
      </div>  
      <div class="cityInfos">
      <h1>${capitalizeFirstLetter(data.name)}</h3>
      <p>Température: ${data.main.temp}</p>
      <p>Humidité: ${data.main.humidity}</p>
      </div>`;
  })
  .catch((err) => {
      document.querySelector(".meteoBox").innerHTML = `
      <h4>City not found 😞</h4>
      `;
      console.log("City not found", err);
  });
  
  e.preventDefault();
}
