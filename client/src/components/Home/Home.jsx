import NavBar from '../NavBar/Navbar'
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, getAllDiets, filterRecipesByDiet, filterRecipesByScore, filterRecipesAscDesc } from '../../actions/index';
import Card from '../Card/Card';

import {Link} from 'react-router-dom'
import Paginado from '../Paginado'

export default function Home () {

const dispatch = useDispatch()
const allRecipes = useSelector ((state) => state.recipes) 
const allDiets = useSelector ((state) => state.diets)
const [orden, setOrden] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [recipesPerPage, setRecipesPerPage] = useState(9)
const indexOfLastRecipe = currentPage * recipesPerPage
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage 
const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

const [type, setType] = useState('Alphabetical')
const [diets, setDiets] = useState('All')


const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

useEffect(() => {
    dispatch(getAllRecipes())
    dispatch(getAllDiets())
},[dispatch])

const handlerFilterDiets = (event) => {
    dispatch(filterRecipesByDiet(event.target.value))
    setCurrentPage(1)
}

const handlerFilterScore = (event) => {
    dispatch(filterRecipesByScore(event.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado${event.target.value}`)
  }

  const handlerFilterAscDesc = (event) => {
    dispatch(filterRecipesAscDesc(event.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado${event.target.value}`)
  }

  const handleReset = (event) => {
    event.preventDefault();
    dispatch(getAllRecipes())
  }



return (
    <div>
        <NavBar/>
        <div>
            <p>Filters</p>
            <select onChange={handlerFilterAscDesc}>
                <option value='asc'>Ascendente A-Z</option>
                <option value='desc'>Descendente Z-A</option>
            </select>
            <select onChange={handlerFilterDiets}>
                {allDiets.map(diet => <option value={diet.name}>{diet.name}</option>)}
            </select>
            <select onChange={handlerFilterScore}>
                <option value='higher score'>Higher Score</option>
                <option value='lower score'>Lower Score</option>
            </select>
            <button onClick={handleReset}>Reset Filters</button>
        </div>
    <div>
        {currentRecipes?.map(recipe =>
            <Card
                recipe={recipe}>

                </Card>)}
                </div>
                <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}/>
            </div>
)};
















//      <div className='filtersContainer'>
//         <p className='FilterTEXT'>FILTERS</p> 
//         <select className='selectAscDesc' onChange={handlerFilterAscDesc}>
//             <option value='asc'>Ascendente A-Z</option>
//             <option value='desc'>Descendente Z-A</option>
//       </select>
//       <select className='selectAscDesc' onChange={handlerFilterDiets}>
//             {dietTypes.map(diet => <option value={diet.name}>{(diet.name)}</option>)}
//         </select>
//         <select className='selectAscDesc' onChange={handlerFilterScore}>
//             <option value='higher score'>Higher Score</option>
//             <option value='lower score'>Lower Score</option>
//         </select>
//         <button className='selectAscDesc' onClick={handleReset}>Reset Filters</button>
//         </div>
                     
//             <button type='submit' onClick={event => {handleSubmit(event)}}>Reload</button>

//         {currentRecipes?.map( (recipe) => {
//             return (
//                 <fragment>
//                     <Link to={"/home/" + recipe.id}>
//                         <Card title={recipe.title} image={recipe.image} diets={recipe.diets} key={recipe.id}/>
//                     </Link>
//                </fragment>
//             )
//             })} 
//     </div>
//     </div> 


// return (
//     <div>
//         <div>
//             <select name='order' onChange={e => changeOrder(e)}>
//                 <option value='Increasing'>Increasing</option>
//                 <option value='Decreasing'>Decreasing</option>
//             </select>
//             <select name='type' onChange={e => changeType(e)}>
//                 <option value='Alphabetical'>Alphabetical</option>
//                 <option value='Score'>Score</option>
//             </select>
//             <select name='diets' onChange={e => changeDiet(e)}>
//                 <option value='All'>All</option>
//                 <option value='healthScore'>healthScore</option>
//                 {
//                     dietTypes && dietTypes.map(diet => {return <option value={diet.title}>{diet.title}</option>})
//                 }
//             </select>
//             <button type='submit' onClick={event => {handleSubmit(event)}}>Reload</button>
//         </div>
//         <Cards/>
//     </div>
// )
// }
