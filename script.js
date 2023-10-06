var edamamAppId = "cd4e5584";
var edamamAppKey = "73d84eab9b2b08ba19b3a16596fc6954";

var searchInput = document.getElementById('search-input');
var recipeList = document.getElementById('recipe-list');
var searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    var searchTerm = searchInput.value.trim();
    $.get(`https://api.edamam.com/search?app_id=${edamamAppId}&app_key=${edamamAppKey}&q=${searchTerm}`, function (data) {
        displayRecipes(data);
    });
});




function displayRecipes(recipeData) {
    recipeList.innerHTML = '';

    var recipeCount = recipeData.hits.length
    if (recipeCount === 0) {
        recipeList.innerHTML = '<p>No recipes found.</p>';
        return;
    }
    
    // grab each recipe object from data
    var recipes = recipeData.hits.map(function(recipe) {
        return recipe.recipe;
    });
    

    recipes.forEach(recipe => {
        var recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');
        recipeItem.innerHTML = `
            <h2>
                ${recipe.label}
                <button>Favorite</button>
                
            </h2>
            <img src="${recipe.image}" alt="${recipe.label}" class="recipe-image">
            <ul>
                <li>
                    ${recipe.ingredientLines.join("</li><li>")}
                </li>
            </ul>
        `;
        recipeList.appendChild(recipeItem);
    });

}
// favButton.addEventListener('click', () => {
//     var recipeName = document.getElementById('recipe').value;
//     localStorage.setItem('recipe', recipeName);
// })





// var formEl = document.querySelector("#search-form");



gapi.load('client', initClient);

function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyB0CEWjg3JYSVDh742-xOUpieEeiZE1UMA',
        apiKey: 'AIzaSyB0CEWjg3JYSVDh742-xOUpieEeiZE1UMA',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
    }).then(function () {
        console.log('api ready');
    });
}

// function handleSearch1(event) {
//     event.preventDefault();

//     var searchValue = document.querySelector('#search-input').value;

//     searchVideos(searchValue);
// }


// function searchVideos(query) {
//     var request = gapi.client.youtube.search.list({
//         part: 'snippet',
//         q: query,
//         maxResults: 10  // You can adjust this number based on your preference
//     });

//     request.execute(function (response) {
//         // Handle the response data here
//         console.log(response);
//     });
// }
 
//  const favButton = document.createElement('button');
// favButton.textContent = 'Favorite me!';
// document.body.appendChild(favButton)

// favButton.addEventListener('click', () => {
// alert('Favorite button clicked!'):
}