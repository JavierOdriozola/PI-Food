import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterRecipesByDiet, getAllDiets } from '../../actions/index';
import Card from '../Card/Card';
import Paginado from '../Paginado'

export default function Home () {

const dispatch = useDispatch()
const allRecipes = useSelector ((state) => state.allRecipes) 
const allDiets = useSelector ((state) => state.dietsTypes)
const [currentPage, setCurrentPage] = useState(1)
const [recipesPerPage, setRecipesPerPage] = useState(9)
const indexOfLastRecipe = currentPage * recipesPerPage
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage 
const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

useEffect(() => {
    dispatch(getRecipes())
    dispatch(getAllDiets())
},[dispatch])

function handleClick(e){
e.preventDefault();
dispatch(getRecipes());
}

function handleFilterDiets(e){
dispatch(filterRecipesByDiet(e.target.value))
setCurrentPage(1)
}

return (
    <div>
    <Link to= '/recipe'>Crear Receta</Link>
    <h1>ESTO ES HOME</h1>
    <button onClick={e=> {handleClick(e)}}>
        Volver a cargar todos los personajes
    </button>
    <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado = {paginado}/>
    <div>
        <select>
            <option value= 'asc_alf'>Ascendente A-Z</option>
            <option value= 'desc_alf'>Descendente Z-A</option>
            <option value= 'asc_score'>Ascendente 1-100</option>
            <option value= 'desc_score'>Ascendente 100-1</option>
        </select>
        <select onChange={(e) => handleFilterDiets(e)}>    
            {/* {allDiets.map(diet => <option value={diet.name}>{diet.name}</option>)} */}
            <option default value='All'>Select a Diet</option>
			<option value="gluten free">Gluten Free</option>
			<option value="dairy free">Ketogenic</option>
			<option value='vegetarian'>Vegetarian</option>
			<option value='lacto ovo vegetarian'>Lacto-Vegetarian</option>
			<option value='fodmap friendly'>Fodmap friendly</option>
			<option value='vegan'>Vegan</option>
			<option value='pescatarian'>Pescetarian</option>
			<option value='paleolithic'>Paleo</option>
			<option value='primal'>Primal</option>
			<option value='whole 30'>Whole30</option>;
            <option>Paginado?</option>
        </select>
        {currentRecipes?.map( (recipe) => {
            return (
                <fragment>
                    <Link to={"/home/" + recipe.id}>
                        <Card title={recipe.title} image={recipe.image} diets={recipe.diets} key={recipe.id}/>
                    </Link>
               </fragment>
            )
            })}
    </div>
    </div>

)
}

