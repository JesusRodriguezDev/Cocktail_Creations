var searchBox = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var searchBoxId = document.getElementById("searchBoxId");
var favoritedVideosButton = document.getElementById("favorited-video-btn");
const cocktailList = document.getElementById("cocktail");
const cocktailDetailsContent = document.querySelector(
  ".cocktail-details-content"
);
const favoritedVideosContent = document.querySelector(
  ".favorited-videos-content"
);
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const favoritedVideosCloseBtn = document.getElementById(
  "favorited-videos-close-btn"
);
const containerMain = document.querySelector(".containerMain");
// var videoUrlEl = document.getElementById("video-link");
const apiKey = "AIzaSyA2xWtrEgWvRVZbpne84P7jXYvNZB-_J2Y";
const channelId = "UCu9ArHUJZadlhwt3Jt0tqgA";
var linksEl = document.querySelector(".links");
var youtubeLink = "https://www.youtube.com/watch?v=";
var listSearches = document.getElementById("list-searches");

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
searchBtn.addEventListener("click", getCocktailList);
cocktailList.addEventListener("click", getCocktailRecipe);
favoritedVideosButton.addEventListener("click", favoritedVideosModal);
recipeCloseBtn.addEventListener("click", () => {
  cocktailDetailsContent.parentElement.classList.remove("showRecipe");
});
favoritedVideosCloseBtn.addEventListener("click", () => {
  favoritedVideosContent.parentElement.classList.remove("showFavorites");
});

function getCocktailList() {
  let searchedCocktail = searchBox.value.trim();
  previousSaved(searchedCocktail);
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchedCocktail}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.drinks) {
        data.drinks.forEach((cocktail) => {
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
        cocktailList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any cocktail!";
        cocktailList.classList.add("notFound");
      }

      cocktailList.innerHTML = html;
    });
}
function getCocktailRecipe(e) {
  if (e.target.classList.contains("recipe-btn")) {
    let cocktailItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => cocktailRecipeModal(data.drinks));
  }
}
function removeHidden(cocktail) {
  var showVideos = document.getElementById("videoList");
  showVideos.classList.remove("hidden");
  searchVideo(cocktail);
}

function favoritedVideosModal() {
  let html = "<h1>List of Favorite videos:</h1>";
  const favoriteVideos = localStorage.getItem("favoriteVideos");
  if (favoriteVideos !== null) {
    JSON.parse(favoriteVideos).forEach((favoriteVideo) => {
      html += `
              <div class = "favorite-video-in-modal">
                <a href="${favoriteVideo}" target="_blank">${favoriteVideo}</a>
              </div>
          `;
    });
  }

  favoritedVideosContent.innerHTML = html;
  favoritedVideosContent.parentElement.classList.add("showFavorites");
}

// create a modal
function cocktailRecipeModal(cocktail) {
  cocktail = cocktail[0];
  let html = `
      <div class = "recipe-cocktail-img">
        <img src = "${cocktail.strDrinkThumb}" alt = "">
      </div>
      <h2 class = "recipe-title">${cocktail.strDrink}</h2>
      <p class = "recipe-category">${cocktail.strCategory}</p>
      <div class = "recipe-instruct">
        <h3>Instructions:</h3>
        <p>${cocktail.strInstructions}</p>
      </div>
      <div class = "recipe-link">
        <button class = "watch-btn">Find Video</button>
      </div>
  `;
  cocktailDetailsContent.innerHTML = html;
  cocktailDetailsContent.parentElement.classList.add("showRecipe");
  const watchVideoBtn = document.querySelector(".watch-btn");
  // watchVideoBtn.onclick = removeHidden(cocktail.strDrink);
  watchVideoBtn.addEventListener("click", function (e) {
    e.preventDefault();
    removeHidden(cocktail.strDrink);
  });
}

function saveVideoAsFavorite(videoURL) {
  let favoriteVideos = localStorage.getItem("favoriteVideos");
  if (favoriteVideos === null) {
    favoriteVideos = "[]";
  }
  const favoriteVideosArray = JSON.parse(favoriteVideos);
  favoriteVideosArray.push(videoURL);
  localStorage.setItem("favoriteVideos", JSON.stringify(favoriteVideosArray));
}
function searchVideo(youtubeDrink) {
  // console.log("Hello");
  fetch(
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" +
      youtubeDrink +
      "&type=video&key=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      linksEl.textContent = "";
      data.items.map((item) => {
        const videoId = item.id.videoId;
        const videoTitle = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.default.url;

        linksEl.innerHTML += `<div class="related-video">
                                <div class="video-image-and-favorite-button">
                                  <div>
                                    <img src="${thumbnail}"/>
                                  </div>
                                  <div>
                                    <button onclick="saveVideoAsFavorite('${thumbnail}')" class="finalFavBtn">Add to favorites</button>
                                  </div>
                                </div>
                                <div>
                                  <a href="${
                                    youtubeLink + videoId
                                  }" target="_blank">${videoTitle}</a>
                                </div>
                              </div>`;
      });
      console.log(linksEl);
    });
}
function previousSaved(cocktail) {
  if (!cocktail) return;
  var getStoredCocktails = JSON.parse(localStorage.getItem("savedCocktails"));
  if (getStoredCocktails) {
    // console.log(getStoredCocktails);
    getStoredCocktails.push(cocktail);
    localStorage.setItem("savedCocktails", JSON.stringify(getStoredCocktails));
  } else {
    localStorage.setItem("savedCocktails", JSON.stringify([cocktail]));
  }
}
function renderList() {
  var savedCocktails = JSON.parse(localStorage.getItem("savedCocktails")) || [];
  var drinkList = document.getElementById("searchList");
  drinkList.innerHTML = "";
  // drinkList.textContent = savedCocktails.length;
  // Render a new li for each search
  for (var i = 0; i < savedCocktails.length; i++) {
    var list = savedCocktails[i];
    var drinkList = document.getElementById("searchList");
    var li = document.createElement("li");
    li.textContent = list;
    li.setAttribute("data-index", i);
    drinkList.appendChild(li);
  }
}
// when HTML is finished loading run this function
window.addEventListener("load", function () {
  renderList();
});
const el = document.getElementById("search-btn");
el.addEventListener("click", search);
function search() {
  renderList();
}
