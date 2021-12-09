import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeDetails } from '../../actions';
import { useParams } from 'react-router';
// import NavBar from '../NavBar/Navbar'

export default function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() =>{
        dispatch(getRecipeDetails(id));
    }, [dispatch]);
    const recipeById = useSelector((state) => state.recipeDetailed);
    

    return (
        <div>
            <div>
                <h2>{`${recipeById.title}`}</h2>
                <img src={recipeById.image} alt="Img not found"/>
                {
                (recipeById?.dishTypes)
                ? <h4>Dish Types: <br/> <div>{recipeById?.dishTypes?.join(', ')}</div></h4>
                : null
            }
                <h4>Diets: <br/> <div>{recipeById?.diets?.map(diets => {
                    return (diets.name)
                })}</div></h4>
                {/* <h4>{`Diets:   "${recipeById.diets}."`}</h4> */}
                <h4>Resume: <div dangerouslySetInnerHTML={{__html: recipeById.summary}}/></h4>
                {
                    (recipeById?.instructions)
                    ? <h4>Steps: <div dangerouslySetInnerHTML={{__html: recipeById.instructions}}/></h4>
                    : null
                }
                {
                    (recipeById?.spoonacularScore)
                    ? <h4>Spoonacular Score: <div dangerouslySetInnerHTML={{__html: recipeById.spoonacularScore}}/></h4>
                    : <h4>Spoonacular Score: <div dangerouslySetInnerHTML={{__html: recipeById.score}}/></h4>
                }
                <h4>{`Health Score: "${recipeById.healthScore}".`}</h4>
        </div>
        </div>
    )
}