const foodContainer = document.getElementById("food-container");
const foodDetailsDiv = document.getElementById("food-details")
const searchHeading = document.getElementById("search-heading")

const button = document.getElementById("search_button").addEventListener("click", function(){
    const foodName = document.getElementById("food-name").value;
        if(foodName === ""){
        swal("No Word", "Please type a valid name", "info");
    }else{

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
        fetch(url)
        .then(res => res.json())
        .then(data =>displayData(data.meals))
        .catch(err => (searchHeading.style.display = "none", swal("Opppss!!!", "Wrong food name, Please type valid food name", "error")))
        foodContainer.innerHTML = "";
        foodDetailsDiv.innerHTML = "";
    }

   
})
//This function for displaying food data on click of search
const displayData = foodName =>{
    searchHeading.style.display = "block"
     foodName.forEach(foodInfo => {
        const foodDiv = document.createElement("div");
        foodDiv.className = "food-div"

        foodDiv.innerHTML = `
        <div id="food-click-div" onclick="showDetails('${foodInfo.strMeal}')">
            <img src ="${foodInfo.strMealThumb}">
            <h4 class="food-name">${foodInfo.strMeal}</h4>  
        </div>
        `
        foodContainer.appendChild(foodDiv)   
    });

 }


 //this function for calling a api for show details food
    const showDetails = name =>{

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
    .then(res => res.json())
    .then(data => foodDataDetails(data.meals[0]))
    .catch(err => swal("No Word", "Something missing, Please try again latter", "info"))
}

//this function for food details data
const foodDetailsSubDiv = document.createElement("div");

const foodDataDetails = food =>{
  const IngredientObject = food;                                        // this line for get ingredient object

  const IngredientArray = Object.keys(IngredientObject);                // this line for convert object in an Array

  foodDetailsSubDiv.innerHTML = `
  <h2 class="bg-info text-white text-center mb-3">Food Details</h2>
  <img src ="${food.strMealThumb}">
  <h3 class="food-name">${food.strMeal}</h3>
  <h4>Ingredient</h4>
  `
  for (let i = 9; i <= 28; i++) {
      let ingredient = (IngredientObject[IngredientArray[i]]);
      console.log(ingredient);
      if(ingredient !=="" && ingredient !== null){
    let li = document.createElement("li")
    li.innerText = ingredient
    const ul = document.createElement("ul")
    ul.appendChild(li);
    foodDetailsSubDiv.appendChild(ul)
    foodDetailsDiv.appendChild(foodDetailsSubDiv)

        }
    }

}