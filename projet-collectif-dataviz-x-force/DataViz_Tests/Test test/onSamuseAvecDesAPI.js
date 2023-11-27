
const url = 'http://www.boredapi.com/api/activity/'

//Fetch de l'API

// Différence de fonctionnement entre 
// function fetchAPI () {
const fetchAPI = () => {   
        fetch(url)
        .then((resp) => {
            // resp.json()
            return resp.json();    
        })
        // return resp.json()})
        .then((data) => {
            document.querySelector(".resultat").innerHTML = `
            </div>  
            <div class="activityInfos">
            <p>${data.activity}</p>
            <p>${JSON.stringify(data)}</p>
            </div>;
            `
        })
    }
    
    
document.querySelector("#search").addEventListener("click", fetchAPI);
