import {
	GET_RECIPES,
	FILTER_BY_DIET,
	FILTER_BY_SCORE,
	FILTER_BY_ASCDESC,
	GET_RECIPE_BY_NAME,
	GET_RECIPE_DETAILS,
	GET_DIETS,
	CLEAR_DETAILED,
	POST_RECIPE
} from '../actions/index'


const initialState = {
    recipes: [],
	allRecipesConst: [],
	recipeDetailed: {},
	diets: [],
};


function rootReducer (state = initialState, action){
    switch (action.type) {

		case GET_RECIPES: 
			return {
				...state,
				recipes: action.payload,
				allRecipesConst: action.payload
		};

		case FILTER_BY_DIET:
			const allRecipes = state.allRecipesConst;
			const recipesFiltered = allRecipes.filter(recipe => action.payload === 'all' ? 
			allRecipes : recipe.diets.includes(action.payload.toLowerCase()));
			return {
				...state,
				recipes: recipesFiltered
				}

		case FILTER_BY_SCORE:
            const recipesFilteredByScore =  action.payload === 'lower score' ? 
                                            state.recipes.sort(function(a,b){
                                                if( a.score > b.score ) return 1
                                                if( b.score > a.score ) return -1
                                                return 0;
                                            })
                                            : state.recipes.sort(function(a,b){
                                                if( a.score > b.score ) return -1
                                                if( b.score > a.score ) return 1
                                                return 0;
                                            }) 
            return {
                ...state,
                recipes: recipesFilteredByScore
            }
        case FILTER_BY_ASCDESC:
            const filteredByName = action.payload === 'asc' ? 
                             state.recipes.sort(function(a,b){
                                 if( a.title > b.title ) return 1
                                 if( b.title > a.title ) return -1
                                 return 0;
                             })
                             : state.recipes.sort(function(a,b){
                                 if( a.title > b.title ) return -1
                                 if( b.title > a.title ) return 1
                                 return 0;
                             }) 
            return {
                ...state,
                recipes: filteredByName
            }

		case GET_RECIPE_BY_NAME: 
			return {
				...state,
				recipes: action.payload,
		};

		case GET_DIETS: 
		return {
			...state,
			diets: action.payload,
		};

		case GET_RECIPE_DETAILS: 
			return {
			...state,
			recipeDetailed: action.payload,
		};
		
		case CLEAR_DETAILED:
			return {
				...state, 
				recipeDetailed: {}
			}
		
		case POST_RECIPE:
			return {
				...state,
			}

		default: {
			return state;
		}
	}
}

export default rootReducer;





		