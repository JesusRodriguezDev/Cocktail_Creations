var searchBox = document.getElementById("form1");
var searchButton = document.getElementById("search-btn");
var randButton = document.getElementById("random-btn");
var listArray = document.getElementById("instructions");
var details = document.getElementById("drink-details");
var testButton = document.getElementById("test");
var detailName = document.getElementById("drink-name");

function searchByName(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+searchBox.value)
                 
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
       
        for (var i = 0; i < data.drinks.length; i++) {
            var instructionItem = document.createElement("li");
            instructionItem.textContent = data.drinks[i].strDrink;
            detailName.textContent=data.drinks[i].strInstruction[true];
            listArray.appendChild(instructionItem);
            console.log(data.drinks[i].strDrink);
        }
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

function showHide(){
    listArray.classList.add("hide");
    details.classList.remove("hide");
}


randButton.addEventListener("click", searchRandom);
searchButton.addEventListener("click", searchByName);
testButton.addEventListener("click", showHide);

