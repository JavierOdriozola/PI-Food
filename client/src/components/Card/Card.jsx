import { Link } from 'react-router-dom';
import style from "./Card.module.css"

export default function Card({ recipe }) {
    return(
        <div className={style.card}>
            <div>
            <Link to={`/recipes/${recipe.id}`} style={{textDecoration:'none'}}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt="img not found" width="200px" height="250px"/> 
            </Link> 
            <p>
              {'Diets: ' + recipe.diets.join(', ')}
            </p>
            </div>
        </div>
    )
}