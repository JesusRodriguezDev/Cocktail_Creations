var searchBox = document.getElementById("form1");
var searchButton = document.getElementById("search-btn");
var videoButton = document.getElementById("video-btn");
var resultMain = document.getElementById("result-main");
const apiKey = "AIzaSyA2xWtrEgWvRVZbpne84P7jXYvNZB-_J2Y"


function searchByName(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+searchBox.value)
                 
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        
        var thumbnailMain = document.getElementById("thumbnail1");
        var drinknameMain = document.getElementById("drink-name");
        var instructionMain = document.getElementById("drink-instruction");
        var drinkName = data.drinks[0].strDrink;
        var drinkInstruction = data.drinks[0].strInstructions;
        var drinkThumbnail = data.drinks[0].strDrinkThumb;
        
        thumbnailMain.src = drinkThumbnail;
        drinknameMain.textContent = drinkName;
        instructionMain.textContent = drinkInstruction;
  
        console.log(data);
    })
};


function searchRandom(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
                 
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
    
    

}

// function showHide(){
//     listArray.classList.add("hide");
//     details.classList.remove("hide");
// }

function searchVideo(){
  
        fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q="+searchBox.value+"&type=video&key="+apiKey)
                     
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            console.log(data);
        }) 
}


videoButton.addEventListener("click", searchVideo);
searchButton.addEventListener("click", searchByName);


