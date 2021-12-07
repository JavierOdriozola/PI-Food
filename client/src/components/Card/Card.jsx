import React from 'react';

export default function Card({ title, image, diets }) {
    return(
        <div>
            <h2>{title}</h2>
            <img src={image} alt="img not found" width="200px" height="250px"/> 
            <h4>{diets}</h4>
        </div>
    )
}