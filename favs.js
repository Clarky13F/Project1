var recipeList = document.getElementById('recipe-list');

function loadFavs() {
    var favsArr = JSON.parse(localStorage.getItem("favsArr")) || [];


    favsArr.forEach(recipe => {
        var recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');
        recipeItem.innerHTML = `
            <div class="recipe-heading">
                <h2>
                    ${recipe.label}
                </h2>
            </div>
            <div class="recipe-body">
                <div class="recipe-div recipe-body-item">
                    <img src="${recipe.image}" alt="${recipe.label}" class="recipe-image">
                    <ul>
                        <li>
                            ${recipe.ingredientLines.join("</li><li>")}
                        </li>
                    </ul>
                </div>
                <a class="recipe-body-item" href="https://youtube.com/watch?v=${recipe.youtubeObj.items[0].id.videoId}" target="_blank">
                    <img class="recipe-image tutorial-thumbnail ${recipe.label}" src=${recipe.youtubeObj.items[0].snippet.thumbnails.high.url} alt=${recipe.youtubeObj.items[0].snippet.title}></img>
                </a>
            </div>
        `;
        recipeList.appendChild(recipeItem);
    });
}

document.getElementById("go-to-search-button").addEventListener("click", function() {
    console.log('hit');
    location.assign('./index.html');
})

loadFavs();