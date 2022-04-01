var searchBox = document.getElementById("form1").value;
var searchButton = document.getElementById("search-btn");
var randButton = document.getElementById("random-btn");


function searchByName(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+searchBox)
                 
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
    

}

searchButton.addEventListener("click", searchByName);

