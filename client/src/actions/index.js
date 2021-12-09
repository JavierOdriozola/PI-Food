import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const FILTER_BY_SCORE = 'FILTER_BY_SCORE';
export const FILTER_BY_ASCDESC = 'FILTER_BY_ASCDESC';
export const GET_RECIPE_BY_NAME = 'GET_RECIPES_BY_NAME';
export const GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS';
export const GET_DIETS = 'GET_DIETS';
export const CLEAR_DETAILED = 'CLEAR_DETAILED';
export const POST_RECIPE = 'POST_RECIPE';


export function getAllRecipes() {
    return async function(dispatch){
        let apiCall = await axios.get("http://localhost:3001/api/recipes/");
        let apiInfo = apiCall.data;
        return dispatch({type: GET_RECIPES, payload: apiInfo})
    }
}

export function filterRecipesByDiet(payload) {
    return {
        type: 'FILTER_BY_DIET',
        payload: payload
    }
}

export function filterRecipesByScore(payload) {
    return {
        type: 'FILTER_BY_SCORE',
        payload: payload
    }
}

export function filterRecipesAscDesc(payload) {
    return {
        type: 'FILTER_BY_ASCDESC',
        payload: payload
    }
}

export function getRecipeDetails(id){
    return async function(dispatch){
    const apiCall = await axios(`http://localhost:3001/api/recipes/${id}`)
    let apiInfo = apiCall.data;
    return dispatch({type: GET_RECIPE_DETAILS,payload: apiInfo})
    }
}

export function getRecipeByName(name){
    return async function(dispatch){
        let apiCall = await axios(`http://localhost:3001/api/recipes?name=${name}`)
        let apiInfo = apiCall.data;
        return dispatch({type: GET_RECIPE_BY_NAME,payload: apiInfo})
    }
}

export function getAllDiets() {
    return async function(dispatch){
        let apiCall = await axios(`http://localhost:3001/api/diets/types`);
        let apiInfo = apiCall.data;
        return dispatch({type: GET_DIETS,payload: apiInfo})
    }
}

export function clearRecipeDetail() {
    return {
        type: 'CLEAR_DETAILED',
        payload: null
    }
}

export function postRecipe(payload){ // payload brings the information needed to create a new recipe
    return async function(dispatch){
    const post = await axios.post(`http://localhost:3001/api/recipes/recipe`, payload)
    return dispatch({
        type: POST_RECIPE,
        payload: post.data
    });
    }
}