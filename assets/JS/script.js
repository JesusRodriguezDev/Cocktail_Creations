var searchBox = document.getElementById("form1");
var searchButton = document.getElementById("search-btn");
var randButton = document.getElementById("random-btn");
var resultMain = document.getElementById("result-main");


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
  


        // for (var i = 0; i < data.drinks.length; i++) {
    
        //     instructionItem.textContent = data.drinks[i].strDrink;
        //     // detailName.textContent=data.drinks[i].strDrink;
        //     listArray.appendChild(instructionItem);
        //     console.log(data.drinks[i].strDrink);
        // }
        console.log(data);
    })
    
    

}

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


randButton.addEventListener("click", searchRandom);
searchButton.addEventListener("click", searchByName);
// testButton.addEventListener("click", showHide);

