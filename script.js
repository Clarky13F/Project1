var edamamAppId = "cd4e5584";
var edamamAppKey = "73d84eab9b2b08ba19b3a16596fc6954";
var youtubeApiKey = 'AIzaSyB0CEWjg3JYSVDh742-xOUpieEeiZE1UMA';
var youtubeApiKey2 = 'AIzaSyCNgCA2AhwK4oqa3dAvIofgE2d8HqpmKno'
var searchInput = document.getElementById('search-input');
var recipeList = document.getElementById('recipe-list');
var searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    var searchTerm = searchInput.value.trim();
    $.get(`https://api.edamam.com/search?app_id=${edamamAppId}&app_key=${edamamAppKey}&q=${searchTerm}`, function (data) {
        displayRecipes(data);
    });
});

async function displayRecipes(recipeData) {
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

var videoThumbnail; // "ImagePlaceholder_icon.png"

    try {
        const allVideos = await Promise.all(recipes.map((recipe) => handleSearch1(recipe.label)));

        var finalRecipes = recipes.map((recipe, i) => {
            return {
                ...recipe,
                youtubeObj: allVideos[i]
            }
        })

        console.log(finalRecipes);

    } catch(err) {
        console.log(err);
    };


    finalRecipes.forEach(recipe => {
        var recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');
        recipeItem.innerHTML = `
            <div>
                <h2>
                    ${recipe.label}
                    <button>Favorite *</button>
                </h2>
                <img src="${recipe.image}" alt="${recipe.label}" class="recipe-image">
                <ul>
                    <li>
                        ${recipe.ingredientLines.join("</li><li>")}
                    </li>
                </ul>
            </div>
            <a href="https://youtube.com/watch?v=${recipe.youtubeObj.items[0].id.videoId}" target="_blank">
                <img class="tutorial-thumbnail ${recipe.label}" src=${recipe.youtubeObj.items[0].snippet.thumbnails.high.url} alt=${recipe.youtubeObj.items[0].snippet.title}></img>
            </a>
        `;
        recipeList.appendChild(recipeItem);
    });
}





// var formEl = document.querySelector("#search-form");


gapi.load('client', initClient);

function initClient() {
    gapi.client.init({
        apiKey: youtubeApiKey2, // AIzaSyB0CEWjg3JYSVDh742-xOUpieEeiZE1UMA
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
    }).then(function () {
        console.log('api ready');
    });
}

function handleSearch1(recipe) {
    // event.preventDefault();

    // var searchValue = document.querySelector('#search-input').value;
    var searchValue = "how to make" + recipe;

    return searchVideos(searchValue); // searchVideos(searchValue)
}

function searchVideos(query) {

    return new Promise((resolve, reject) => {
        var request = gapi.client.youtube.search.list({
            part: 'snippet',
            q: query,
            maxResults: 1  // You can adjust this number based on your preference
        });
    
        request.execute(function (response) {
            try{
                // Handle the response data here
                // console.log(response);
                // videoThumbnail = response.items[0].snippet.thumbnails.high.url || [];
                // console.log(videoThumbnail);
                resolve(response);
            } catch(error) {
                reject(response);
            }
        });
    })

}