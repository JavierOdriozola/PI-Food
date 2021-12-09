import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets, postRecipe } from '../../actions/index';
import NavBar from '../NavBar/Navbar';



function Form() {
    const dispatch = useDispatch()
    const diets = useSelector ((state) => state.diets)
    const [errors, setErrors] = useState({
        title: 'Title is required'
    })
const [input, setInput] = useState({
    title: '',
    summary: '',
    score: '',
    healthScore: '',
    image: '',
    diets: []
})
useEffect(() => {
    dispatch(getAllDiets())
}, [dispatch])

const handleInputChange = (event) => {
    setInput({
        ...input,
        [event.target.name] : event.target.value
    })
    setErrors(validateInput({
        ...input,
        [event.target.name] : event.target.value
    }))
}

const handleSelect = (event) => {
    if(!input.diets.includes(event.target.value)) {
        setInput({
            ...input,
            diets: [...input.diets, event.target.value]
        })
    }
}

const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postRecipe(input))
    alert('Recipe created successfully!')
    setInput({
        title: '',
        summary: '',
        score: '',
        healthScore: '',
        image: '',
        diets: []
    })
}

const handleDelete = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter(diet => diet !== e.target.value)
    })
  }

  const validateInput = (input) => {
    let errors = {}
    if(!input.title) {
        errors.title =  'Title is required'
    } else if(!input.summary) {
        errors.summary = 'Summary is required'
    } else if(!input.score) {
        errors.score = 'Score is required'
    } else if(!input.healthScore) {
        errors.healthScore = 'HealthScore is required'
    }
    return errors
}


return (
    <>
    <NavBar/>
    <div>
        <h1> Create a new Recipe </h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input placeholder='Title of your recipe...' type='text' value={input.title} name='title' onChange={handleInputChange} />
                {errors.title && <span>{errors.title}</span>} 
            </div>
            <div>
                <label>Summary:</label>
                <input placeholder='Write a summary of your recipe...' type='text' value={input.summary} name='summary' onChange={handleInputChange} />
                {errors.summary && <span>{errors.summary}</span>}
            </div>
            <div>
                <label>Score:</label>
                <input placeholder='Insert a score for your recipe...' type='text' value={input.score} name='score' onChange={handleInputChange} />
                {errors.score && <span>{errors.score}</span>}
            </div>
            <div>
                <label>HealthScore:</label>
                <input placeholder='Insert a health score for your recipe...' type='text' value={input.healthScore} name='healthScore' onChange={handleInputChange} />
                {errors.healthScore && <span>{errors.healthScore}</span>}
            </div>
            <div>
                <label>Image:</label>
                <input placeholder='Insert your image URL...' type='text' value={input.image} name='image' onChange={handleInputChange} />
            </div>
            <div>
                <label>Choose diets for your recipe:</label>
                <select onChange={handleSelect}>
                    {diets.map((diet, k) => <option value={diet.name}>{diet.name}</option>)}
                </select>
            </div>
            <ul>
                {input.diets.map(diet => <li>{diet}<button value={diet} onClick={handleDelete}>X</button></li>)}
            </ul>
            <button disabled={Object.keys(errors).length > 0} type='submit'>Create your Recipe!</button>
        </form>
    </div>
    </>
)
}

export default Form;