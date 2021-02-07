const foodContainer = document.getElementById("food-container");
const foodDetailsDiv = document.getElementById("food-details")

const button = document.getElementById("search_button").addEventListener("click", function(){
    const foodName = document.getElementById("food-name").value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    fetch(url)
    .then(res => res.json())
    .then(data =>displayData(data.meals))
    .catch(err => swal("Opppss!!!", "Wrong Food name, Please type valid food name", "error"))
    foodContainer.innerHTML = "";
    foodDetailsDiv.innerHTML = ""
   
})
//This function for displaying food data on click of search
const displayData = foodName =>{

     foodName.forEach(foodInfo => {
        const foodDiv = document.createElement("div");
        foodDiv.className = "food-div"

        const food = `
            <img src ="${foodInfo.strMealThumb}">
            <h4 class="name">${foodInfo.strMeal}</h4>
            <button onclick="showDetails('${foodInfo.strMeal}')"> details </button>
        `
        foodDiv.innerHTML = food;
        foodContainer.appendChild(foodDiv)
        document.getElementById("food-name").value = ""
        
    });
 }


 //this function for calling a api for show details food
    const showDetails = name =>{

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
    .then(res => res.json())
    .then(data => foodDataDetails(data.meals[0]))
}

//this function for food details data
const foodDetailsSubDiv = document.createElement("div");

const foodDataDetails = food =>{
  const foodDetailsObject = food;
  const foodDetailsArray = Object.keys(foodDetailsObject);

  foodDetailsSubDiv.innerHTML = `
  <img src ="${food.strMealThumb}">
  <h3 class="name">${food.strMeal}</h3>
  <h4>Ingredient</h4>
  `
  for (let i = 9; i <= 28; i++) {
      let ingredient = (foodDetailsObject[foodDetailsArray[i]]);
      if(ingredient !==""){
    let li = document.createElement("li")
    li.innerText = ingredient
    const ul = document.createElement("ul")
    ul.appendChild(li);
    foodDetailsSubDiv.appendChild(ul)
    foodDetailsDiv.appendChild(foodDetailsSubDiv)

        }
    }

}