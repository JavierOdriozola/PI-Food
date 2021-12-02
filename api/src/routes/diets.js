const { Router } = require('express');
const { Diets } = require('../db')
const axios = require('axios')
// const {
//     API_KEY1,
//     API_KEY2,
//     API_KEY3,
//     API_KEY4,
//     API_KEY5,
//     API_KEY6,
//     API_KEY7,
//     API_KEY8
//   } = process.env;
  
const router = Router();


let diets = [
    {
        name: 'Gluten Free',
    },
    {
        name: 'Ketogenic',
    },
    {
        name: 'Vegetarian',
    },
    {
        name: 'Lacto-Vegetarian',
    },
    {
        name: 'Ovo-Vegetarian',
    },
    {
        name: 'Vegan',
    },
    {
        name: 'Pescetarian',
    },
    {
        name: 'Paleo',
    },
    {
        name: 'Primal',
    },
    {
        name: 'Whole 30',
    },
];



router.get('/types', async (req, res, next) => {
    
    return Diets.findAll()
    .then((diet) => {
        res.send(diet)
    })
    .catch((error) => {
        next(error)
    })
})

module.exports = router;


