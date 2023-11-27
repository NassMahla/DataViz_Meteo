const API_KEY = "554e3c56cfb28bccd863b1120534404e";

// ETAPE 1 : Input
document.querySelector("#search").addEventListener("click", getWeather);

// ETAPE 2 : Récupérer l'Input

// ETAPE 3 : Transformer ville en coordonnées :
function getCityToCoords(city) {
  const API_GEO_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  // a- call API
  return (
    fetch(API_GEO_URL)
      // b- PARSE / mettre en forme et trier
      .then((response) => response.json())
      .then((data) => {
        const lat = data[0].lat;
        const lon = data[0].lon;
        return { lat, lon };
      })
  );
}

// ETAPE 4 : récupérer les données méteo de la ville
function getWeather() {
  let city = document.querySelector("#cityName").value;
  getCityToCoords(city).then((data) => {
    let lat = data.lat;
    let lon = data.lon;
    const API_URL_MAIN = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric `;
    fetch(API_URL_MAIN)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".meteoBox").innerHTML = `
          <div>
          </div>  
          <div class="cityInfos">
          <h1>${data.name}</h1>
          <p>Température: ${data.main.temp}</p>
          <p>Humidité: ${data.main.humidity}</p>
          <p>Pluie: ${data.rain["1h"]}</p>
          </div>`;
      });
  });
}

// function fetchDeKevin(url) {
//   return new Promise((resolve, reject) => {
//     // call API avec url
//     if (err) return reject(err);
//     return resolve({
//         json: function () {/** */}
//     });
//   });
// }

// async function fetchDeKevinBis(url) {
//   // call API avec url
//   if (err) return new Error(err);
//   return resp;
// }

// fetchDeKevin("http://").then(resp => resp.json())
