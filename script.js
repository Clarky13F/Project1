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


displayRecipes('');





const formEl = document.querySelector("#search-form");


gapi.load('client', initClient);

function initClient() {
    gapi.client.init({
        apiKey: 'put our own api key to use',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
    }).then(function () {
        
        console.log('api ready');
    });
}

function handleSearch(event) {
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

formEl.addEventListener("submit", handleSearch)