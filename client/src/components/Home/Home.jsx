import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes } from '../../actions';
import {Link} from 'react-router-dom'

export default function Home () {

const dispatch = useDispatch()
const allRecipes = useSelector ((state) => state.recipes) 

useEffect(() => {
    dispatch(getRecipes())
},[])

function handleClick(e){
e.preventDefault();
dispatch(getRecipes());
}

return (
    <div>
    <Link to= '/recipe'>Crear Receta</Link>
    <h1>RECIPES 4 U</h1>
    <button onClick={e=> {handleClick(e)}}>
        Volver a cargar todos los personajes
    </button>
    <div>
        <select>
            <option value= 'asc_alf'>Ascendente A-Z</option>
            <option value= 'desc_alf'>Descendente Z-A</option>
            <option value= 'asc_score'>Ascendente 1-100</option>
            <option value= 'desc_score'>Ascendente 100-1</option>
        </select>
        <select>    
            <option default value=''>Select a Diet</option>
			<option value='gluten free'>Gluten Free</option>
			<option value='dairy free'>Ketogenic</option>
			<option value='vegetarian'>Vegetarian</option>
			<option value='lacto ovo vegetarian'>Lacto-Vegetarian</option>
			<option value='lacto ovo vegetarian'>Ovo-Vegetarian</option>
			<option value='vegan'>Vegan</option>
			<option value='pescatarian'>Pescetarian</option>
			<option value='paleolithic'>Paleo</option>
			<option value='primal'>Primal</option>
			<option value='whole 30'>Whole30</option>;
            <option>Paginado?</option>
        </select>
    </div>
    </div>

)


}