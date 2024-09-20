const recipes = [{
    title: "Easy Pancakes",
    type: "breakfast",
    restrictions: "none",
    time: "under-30",
    ingredients: ["pasta"]
}, {
    title: "Chicken Stir Fry",
    type: "dinner",
    restrictions: "none",
    time: "30-60",
    ingredients: ["chicken", "vegetables"]
}, {
    title: "Vegetarian Pasta",
    type: "lunch",
    restrictions: "vegetarian",
    time: "30-60",
    ingredients: ["pasta", "vegetables"]
}, {
    title: "Cheese Quesadillas",
    type: "snack",
    restrictions: "none",
    time: "under-30",
    ingredients: ["cheese"]
}];

function startRecipeFinder() {
    document.getElementById('recipe-finder').scrollIntoView({
        behavior: 'smooth'
    });
}

function findRecipe() {
    const mealType = document.getElementById('meal-type').value;
    const dietaryRestrictions = document.getElementById('dietary-restrictions').value;
    const timeAvailable = document.getElementById('time-available').value;
    const ingredients = Array.from(document.getElementById('ingredients').value.split(',').map(ingredient => ingredient.trim()));
    const filteredRecipes = recipes.filter(recipe => recipe.type === mealType && (recipe.restrictions === dietaryRestrictions || dietaryRestrictions === 'none') && recipe.time === timeAvailable && ingredients.some(ingredient => recipe.ingredients.includes(ingredient)));
    displayRecipes(filteredRecipes);
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '';
    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found based on your selection.</p>';
    } else {
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <div class="card-content">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description || 'Delicious and easy to make!'}</p>
                    <a href="#">See Recipe</a>
                </div>
            `;
            recipesContainer.appendChild(recipeCard);
        });
    }
    document.getElementById('recipe-results').style.display = 'block';
}
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#ingredients button');
    const mealTypeSelect = document.getElementById('meal-type');
    const dietaryRestrictionsSelect = document.getElementById('dietary-restrictions');
    const timeAvailableSelect = document.getElementById('time-available');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('selected');
        });
    });

    window.findRecipe = function() {
        const selectedIngredients = Array.from(buttons)
            .filter(button => button.classList.contains('selected'))
            .map(button => button.getAttribute('data-value'));

        const selectedMealType = mealTypeSelect.value;
        const selectedDietaryRestrictions = dietaryRestrictionsSelect.value;
        const selectedTimeAvailable = timeAvailableSelect.value;

        console.log('Selected ingredients:', selectedIngredients);
        console.log('Selected meal type:', selectedMealType);
        console.log('Selected dietary restrictions:', selectedDietaryRestrictions);
        console.log('Selected time available:', selectedTimeAvailable);

        const recipes = [
            { title: 'Chicken Stir Fry', ingredients: ['chicken', 'vegetables'], type: 'lunch', restrictions: 'none', time: '30-60', description: 'A tasty and colorful stir fry with simple ingredients.' },
            { title: 'Pasta Primavera', ingredients: ['pasta', 'vegetables'], type: 'lunch', restrictions: 'none', time: 'under-30', description: 'A quick and easy pasta dish with fresh vegetables.' },
            { title: 'Cheese Omelette', ingredients: ['cheese', 'eggs'], type: 'breakfast', restrictions: 'none', time: 'under-30', description: 'A fluffy omelette with melted cheese.' },
            { title: 'Gluten-Free Pancakes', ingredients: ['flour', 'milk', 'eggs'], type: 'breakfast', restrictions: 'gluten-free', time: 'under-30', description: 'Delicious pancakes made without gluten.' },
            { title: 'Pan-seared Steak', ingredients: ['salt', 'garlic powder', 'beef'], type: 'dinner', restrictions: 'gluten-free', time: '30-60', description: 'Golden-brown pan-seared steak.' },
            { title: 'Pasta', ingredients: ['salt', 'garlic powder', 'cheese', 'flour'], type: 'lunch', restrictions: 'vegetarian', time: '30-60', description: 'A perfectly-balanced recipe for whatever type of pasta you may have.' },
        ];

        const filteredRecipes = recipes.filter(recipe =>
            recipe.ingredients.some(ingredient => selectedIngredients.includes(ingredient)) &&
            (selectedMealType === 'all' || recipe.type === selectedMealType) &&
            (selectedDietaryRestrictions === 'none' || recipe.restrictions === selectedDietaryRestrictions) &&
            (selectedTimeAvailable === 'any' || recipe.time === selectedTimeAvailable)
        );

        displayRecipes(filteredRecipes);
    };

    function displayRecipes(recipes) {
        const recipesContainer = document.getElementById('recipes-container');
        recipesContainer.innerHTML = '';
        if (recipes.length === 0) {
            recipesContainer.innerHTML = '<p>No recipes found based on your selection.</p>';
        } else {
            recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'recipe-card';
                recipeCard.innerHTML = `
                    <div class="card-content">
                        <h3>${recipe.title}</h3>
                        <p>${recipe.description || 'Delicious and easy to make!'}</p>
                        <a href="#">See Recipe</a>
                    </div>
                `;
                recipesContainer.appendChild(recipeCard);
            });
        }
        document.getElementById('recipe-results').style.display = 'block';
    }
});
