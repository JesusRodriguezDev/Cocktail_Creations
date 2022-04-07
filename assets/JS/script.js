var searchBox = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var videoButton = document.getElementById("video-btn");
const cocktailList = document.getElementById('cocktail');
const cocktailDetailsContent = document.querySelector('.cocktail-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const containerMain = document.querySelector(".containerMain");
// var videoUrlEl = document.getElementById("video-link");
const apiKey = "AIzaSyA2xWtrEgWvRVZbpne84P7jXYvNZB-_J2Y";
const channelId = "UCu9ArHUJZadlhwt3Jt0tqgA";
var linksEl = document.querySelector(".links");
window.onload = () => {
  var firstTime = Boolean(sessionStorage.getItem("isLoaded"));
  if (!firstTime) {
    // first time loaded!
    containerMain.style.display = "none";
    setTimeout(() => {
      sessionStorage.setItem("isLoaded", "true");
      containerMain.style.display = "block";
      document.querySelector(".loaderMain").style.display = "none";
    }, 3000);
  } else {
    document.querySelector(".loaderMain").style.display = "none";
  }
  getCocktailList();
};
// button event for cocktailDB and Youtube
videoButton.addEventListener("click", searchVideo);
searchBtn.addEventListener('click', getCocktailList);
cocktailList.addEventListener('click', getCocktailRecipe);
recipeCloseBtn.addEventListener('click', () => {
    cocktailDetailsContent.parentElement.classList.remove('showRecipe');
});

function getCocktailList(){
  let searchedCocktail = searchBox.value.trim();
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchedCocktail}`)
  .then(response => response.json())
  .then(data => {
      let html = "";
      if(data.drinks){
          data.drinks.forEach(cocktail => {
              html += `
                  <div class = "cocktail-item" data-id="${cocktail.idDrink}">
                      <div class = "cocktail-img">
                          <img src = "${cocktail.strDrinkThumb}" alt = "drink">
                      </div>
                      <div class = "cocktail-name">
                          <h3>${cocktail.strDrink}</h3>
                          <a href = "#" class = "recipe-btn">Get Recipe</a>
                      </div>
                  </div>
              `;
          });
          cocktailList.classList.remove('notFound');
      } else{
          html = "Sorry, we didn't find any cocktail!";
          cocktailList.classList.add('notFound');
      }

      cocktailList.innerHTML = html;
  });
}
function getCocktailRecipe(e){
  if(e.target.classList.contains('recipe-btn')){
      let cocktailItem = e.target.parentElement.parentElement;
      fetch(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailItem.dataset.id}`)
      .then(response => response.json())
      .then(data => cocktailRecipeModal(data.drinks));
  }
}

// create a modal
function cocktailRecipeModal(cocktail){
  console.log(cocktail);
  cocktail = cocktail[0];
  let html = `
      <h2 class = "recipe-title">${cocktail.strDrink}</h2>
      <p class = "recipe-category">${cocktail.strCategory}</p>
      <div class = "recipe-instruct">
          <h3>Instructions:</h3>
          <p>${cocktail.strInstructions}</p>
      </div>
      <div class = "recipe-cocktail-img">
          <img src = "${cocktail.strDrinkThumb}" alt = "">
      </div>
      <div class = "recipe-link">
          <a href = "" target = "_blank">Watch Video</a>
      </div>
  `;
  cocktailDetailsContent.innerHTML = html;
  cocktailDetailsContent.parentElement.classList.add('showRecipe');
}

function searchVideo() {
  fetch(
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" +
      searchBox.value +
      "&type=video&key=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.items.length; i++) {
        var videoId = data.items[i].id.videoId;
        // var videoLink = (document.getElementById("video-link").href="https://www.youtube.com/watch?v=" + videoId);
        // videoUrlEl.textContent = videoLink;
        var links = document.createElement("a");
        links.href = ("https://www.youtube.com/watch?v=" + videoId);
        links.textContent = "https://www.youtube.com/watch?v=" + videoId;
        console.log(linksEl);
        linksEl.appendChild(links);


        console.log(data);
        // console.log(videoLink);
      }
    });
}

