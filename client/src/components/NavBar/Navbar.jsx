import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearRecipeDetail, getRecipeByName} from '../../actions/index'

export default function NavBar() {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (event) => {
        event.preventDefault();
        setSearchText(event.target.value)
    }

    const handleSearch = (event) => {
        event.preventDefault();
        dispatch(getRecipeByName(searchText));
        setSearchText('')
    }

    const handleClick = () => {
        dispatch(clearRecipeDetail())
    }


    return (
        <div>
            <Link to='/home' onClick={handleClick}><span>home</span></Link>
            <div>
                <input type='text' placeholder='Search a recipe...' name="searchText" value={searchText} 
                onChange={handleInputChange} autocomplete='off'
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <Link to='/form'>+ Create your own Recipe</Link>
        </div>
    )
}