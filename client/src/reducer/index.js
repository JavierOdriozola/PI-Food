import {
	GET_RECIPES,
	GET_RECIPES_BY_NAME,
	GET_SORT,
	FILTER_BY_DIET,
	GET_RECIPE_BY_ID,
	GET_DIETS,
	POST_RECIPE
} from '../actions/index'


const initialState = {
    recipes: [],
	allRecipes: [],
	recipeById: [],
	dietsTypes: [],
};


function rootReducer (state = initialState, action){
    switch (action.type) {
		case GET_RECIPES: 
			return {
				...state,
				allRecipes: action.payload,
		};

		case GET_RECIPES_BY_NAME: 
			return {
				...state,
				allRecipes: action.payload,
		};

		case GET_DIETS: 
		return {
			...state,
			dietsTypes: action.payload,
		};

		case GET_RECIPE_BY_ID: 
			return {
				...state,
				recipeById: action.payload,
		};
		
		case POST_RECIPE:
			return {
				...state,
		};

		// case GET_SORT: 

		// function sort(payload) {
		// 	let sortedRecipes = []
		// 	if(payload.diets === "All") {
		// 		sortedRecipes = state.allRecipes;
		// 	} else if(payload.diets === "vegetarian") {

		// 	}


		// }

		case FILTER_BY_DIET:
			const allRecipes = state.allRecipes;

			const recipesFiltered = action.payload === 'All' ? 
			state.allRecipes : allRecipes.filter(recipe => {
			if(recipe.diets){
				if(recipe.diets.includes(action.payload)) return recipe
			}})
			return {
				...state,
				recipes: recipesFiltered
				}

		default: {
			return state;
		}
	}
}

export default rootReducer;





		