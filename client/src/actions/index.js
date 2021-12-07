import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
export const GET_DIETS = 'GET_DIETS';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const POST_RECIPE = 'POST_RECIPE';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';

export const SWITCH_LOADING = 'SWITCH_LOADING';


export function getRecipes() {
    return async function(dispatch){
        let apiCall = await axios.get("http://localhost:3001/api/recipes/");
        let apiInfo = apiCall.data;
        return dispatch({type: GET_RECIPES, payload: apiInfo})
    }
}

// export const filterRecipesByDiet = (diets) => {
//     return {type: 'FILTER_BY_DIET',payload: diets
//     }
// }


export function getRecipesByName(title){
    return async function(dispatch){
        let apiCall = await axios.get(`http://localhost:3001/api/recipes?title=${title}`)
        let apiInfo = apiCall.data;
        return dispatch({type: GET_RECIPES_BY_NAME,payload: apiInfo})
    }
}

export const getAllDiets = () => {
    return async function(dispatch){
        let apiCall = await axios(`http://localhost:3001/api/diets/types`);
        let apiInfo = apiCall.data;
        return dispatch({type: GET_DIETS,payload: apiInfo})
    }
}

export function getRecipeById(id){
    return async function(dispatch){
    let apiCall = await axios(`http://localhost:3001/api/recipes/${id}`)
    let apiInfo = apiCall.data;
    return dispatch({type: GET_RECIPE_BY_ID,payload: apiInfo})
    }
}

export function postRecipe(payload){ // payload brings the information i need to create a new recipe
    return async function(dispatch){
    const post = await axios.post(`http://localhost:3001/api/recipe`, payload)
    return dispatch({type: POST_RECIPE,payload: post.data})
    }
}