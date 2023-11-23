const APIKey = "47146e26459781309d8f34f10ea0a9a3"


function getCoordonates(city) {
    console.log(    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`).then((response) => response.json()))
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`)
    .then((response) => response.json())
    .then((data) => {
        
    })
}

getCoordonates('Paris')




function getMeteo(e) {
    // const name = document.querySelector("#meteo").value;
    const APIKey = "47146e26459781309d8f34f10ea0a9a3"
    console.log(fetch(`https://history.openweathermap.org/data/2.5/aggregated/year?lat=35&lon=139&appid=${APIKey}`).then((response) => response.json()))
    fetch(`https://history.openweathermap.org/data/2.5/aggregated/year?lat=35&lon=139&appid=${APIKey}`)
    .then((response) => response.json())

    .then((data) => {
        
    })
    .catch((err) => {
        document.querySelector(".pokemonBox").innerHTML = `
        <h4>Pokemon not found 😞</h4>
        `;
        console.log("Pokemon not found", err);
    });
    
    // e.preventDefault();
}

// getMeteo()