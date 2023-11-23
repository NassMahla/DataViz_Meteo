let lat = 1;
let lon = 1;
const API_KEY = "554e3c56cfb28bccd863b1120534404e";
const API_URL_MAIN = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric `;

// ETAPE 1 : Input
document.querySelector("#search").addEventListener("click", getWeather());

// ETAPE 2 : Récupérer l'Input

// ETAPE 3 : Transformer ville en coordonnées :
function getCityToCoords(city) {
  console.log("#2", lat, lon);
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

//console.log(getCityToCoords("Paris"));

// Fonction pour récupérer les données météo
// 1) Input récupérer la ville
// 2) lancer la fonction "getCityCoords"
// 3) Récupérer les coordonnées
// 4) Lancer l'API avec les coordonnées
// 5) Parser les données météo
// 6) Afficher les données sélectionnées

function getWeather() {
  let city = document.querySelector("#cityName").value;
  console.log("#1", lat, lon);
  getCityToCoords(city).then((data) => {
    console.log("#5", data);
    lat = data.lat;

    lon = data.lon;
    fetch(API_URL_MAIN)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.main.temp);
        document.querySelector(".meteoBox").innerHTML = `
        <div>
        </div>  
        <div class="cityInfos">
        <h1>'Test Affichage'</h1>
        <h1>${data.name}</h1>
        <p>Température: ${data.main.temp}</p>
        <p>Humidité: ${data.main.humidity}</p>
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
