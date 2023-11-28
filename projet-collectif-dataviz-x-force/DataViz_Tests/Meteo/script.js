


const API_KEY = "554e3c56cfb28bccd863b1120534404e";
let CITY = "";
let lat = 0;
let lon = 0;
let myChart

document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?landscape`)"
//const API_URL_MAIN = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
let API_GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${CITY}&limit=1&appid=${API_KEY}`;
document.querySelector("#search").addEventListener("click", getWeather);
/*document.querySelector("#search").addEventListener("submit", getWeather);
document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    console.log('Enter key pressed');
  }
})*/

function geoCoding(city) {
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${city})`

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
/*function handle(e) {
  e.preventDefault()
  getWeather(); console.log("touche_entrée")
}*/
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

          let humidity = data.main.humidity
          let wind = data.wind.speed
          let temp = data.main.temp_min

          const ctx = document.getElementById('myChart');

          if (myChart) { myChart.destroy() }

          myChart = ctx.innerHTML = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['temp', 'Humidity', 'wind'],
              datasets: [{
                label: '# of Votes',
                data: [temp, humidity, wind],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });


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