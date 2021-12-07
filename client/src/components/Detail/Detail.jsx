import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeById } from '../../actions';
import { useParams } from 'react-router';
import style from "./Detail.module.css";

export default function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() =>{
        dispatch(getRecipeById(id));
    }, []);
    const recipeById = useSelector((state) => state.recipeById);
    

    return (
        <div>
            <h2>{`${recipeById.title}`}</h2>
            <div>
                <img src={recipeById.image} alt="not found"/>
            <div>
                <h4>{`Diets: "${recipeById.diets}."`}</h4>
                <h4>{`Spoonacular Score: "${recipeById.score}".`}</h4>
                <h4>{`Health Score: "${recipeById.healthScore}".`}</h4>
                <h4>{`Dish Types: "${recipeById.dishTypes}`}</h4>
            </div>
            </div>
        <h4>{`Resume: ${recipeById.summary}`}</h4>
        <h4>{`Resume: ${recipeById.steps}`}</h4>
        </div>
    )
}