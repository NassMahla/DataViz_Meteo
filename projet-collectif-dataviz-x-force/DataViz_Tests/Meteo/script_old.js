const API_KEY = "554e3c56cfb28bccd863b1120534404e";
let city = ""
const API_URL_MAIN = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric `;
const API_GEO_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

document.querySelector("#search").addEventListener("click", getWeather);


function fetchGeoCoding(city) {
  const API_GEO_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  fetch(API_GEO_URL)
  .then((response) => response.json())
  .then((data) => {
    lat = data[0].lat;
    lon = data[0].lon;
  })
  .catch(error => {
    console.error(error);
})


function geoCoding(fetchGeoCoding) {
  return
  };
}



async function getWeather(e) {
  city = document.querySelector("#cityName").value;
  const resp = await geoCoding(city)
  console.log(lat)
  console.log(lon)
  try {
    const response = await fetch(API_URL_MAIN);
    const data = await response.json();
    console.log(data.main.pressure)
    console.log(data.main.temp)
    document.querySelector(".meteoBox").innerHTML = `
      <div>
      </div>  
      <div class="cityInfos">
      <h1>'Test Affichage'</h1>
      <h1>${(data.name)}</h1>
      <p>Température: ${data.main.temp}</p>
      <p>Humidité: ${data.main.humidity}</p>
      </div>`;
  } catch (err) {
    document.querySelector(".meteoBox").innerHTML = `
      <h4>City not found 😞</h4>
      `;
    console.log("City not found", err);
  }
  e.preventDefault();
}



// async function getWeather(e) {

//   city = document.querySelector("#cityName").value;
//   await geoCoding(city)

//   console.log(lat)
//   console.log(lon)

//   // console.log(fetch(API_URL_MAIN).then((response) => response.json()))
//   .then(console.log(lat))
//   .then(console.log(lon))

//   .then(fetch(API_URL_MAIN))
//   .then((response) => response.json())
//   .then((data) => {
//       document.querySelector(".meteoBox").innerHTML = `
//       <div>
//       <img
//       src="${data.sprites.other["official-artwork"].front_default}"
//       alt="City name"
//       /> 
//       </div>  
//       <div class="cityInfos">
//       <h1>${capitalizeFirstLetter(data.name)}</h3>
//       <p>Température: ${data.main.temp}</p>
//       <p>Humidité: ${data.main.humidity}</p>
//       </div>`;
//   })
//   .catch((err) => {
//       document.querySelector(".meteoBox").innerHTML = `
//       <h4>City not found 😞</h4>
//       `;
//       console.log("City not found", err);
//   });
  
//   e.preventDefault();
// }

