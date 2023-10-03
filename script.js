const recipes = [
    { name: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish with eggs, cheese, and pancetta.' },
    { name: 'Chicken Alfredo', description: 'Creamy pasta dish with grilled chicken and Alfredo sauce.' },
    { name: 'Vegetable Stir-Fry', description: 'Stir-fried vegetables with tofu in a savory sauce.' },
    { name: 'Homemade Pizza', description: 'Delicious homemade pizza with your favorite toppings.' },
    
];

const searchInput = document.getElementById('search-input');
const recipeList = document.getElementById('recipe-list');


function displayRecipes(searchTerm) {
    recipeList.innerHTML = ''; 

    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredRecipes.length === 0) {
        recipeList.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    filteredRecipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');
        recipeItem.innerHTML = `
            <h2>${recipe.name}</h2>
            <p>${recipe.description}</p>
        `;
        recipeList.appendChild(recipeItem);
    });
}


searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    displayRecipes(searchTerm);
});

// Initial display of all recipes
// displayRecipes('');





const formEl = document.querySelector("#search-form");


// gapi.load('client', initClient);

function initClient() {
    gapi.client.init({
        apiKey: 'put our own api key to use',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
    }).then(function () {
        
        console.log('api ready');
    });
}

function handleSearch1(event) {
    event.preventDefault();

    var searchValue = document.querySelector('#search-input').value;

    searchVideos(searchValue);
}

function searchVideos(query) {
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: query,
        maxResults: 10  // You can adjust this number based on your preference
    });

    request.execute(function (response) {
        // Handle the response data here
        console.log(response);
    });
}

// Call Recipe API
var edamamRecipeAppId = "cd4e5584";
var edamamRecipeAppKey = "73d84eab9b2b08ba19b3a16596fc6954";
var exampleRecipeChicken = "chicken";

$("#search-test1").click(function handleSearch2 () {
    $("#recipe-list").html("");
    $.get(`https://api.edamam.com/search?app_id=${edamamRecipeAppId}&app_key=${edamamRecipeAppKey}&q=${exampleRecipeChicken}`, function (data) {
        console.log(data);
        console.log(data.hits[0].recipe.label);
        for(let i = 0; i < data.hits.length; i++) {
        $("<p />", { text: data.hits[i].recipe.label }).appendTo("#recipe-list");
        }
    });
});

// Call Ingredient API
var edamamIngredientAppId = "d01e0992";
var edamamIngredientAppKey = "05456ac1f21695133da813475b3f88f8";
var exampleIngredientChicken = "chicken";

    $("#search-test2").click(function handleSearch3 () {
        $("#Ingredient-list").html("");
        $.get(`https://api.edamam.com/search?app_id=${edamamIngredientAppId}&app_key=${edamamIngredientAppKey}&q=${exampleIngredientChicken}`, function (data) {
            console.log(data);
            console.log(data.hits[0].recipe.label);
            for(let i = 0; i < data.hits.length; i++) {
            $("<p />", { text: data.hits[i].recipe.label }).appendTo("#recipe-list");
            }
        });
    });