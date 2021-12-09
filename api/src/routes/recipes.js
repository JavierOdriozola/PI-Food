const { Router } = require('express');
const axios = require ('axios')
const { Recipes, Diets } = require('../db')
const {Op } = require('sequelize');
const {v4: uuidv4 } =require('uuid');

require('dotenv').config();

const router = Router();

const {
    API_KEY1,
    API_KEY2,
    API_KEY3,
    API_KEY4,
    API_KEY5,
    API_KEY6,
    API_KEY7,
    API_KEY8
  } = process.env;


router.get('/', async (req, res, next) => {
	try {
        const {name} = req.query;
        const recipesFromApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY4}&addRecipeInformation=true&number=100`);
        const recipesFromDB = await Recipes.findAll({include: Diets})
        const allDiets = []  
        const recipesFilteredDB = recipesFromDB.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                score: recipe.score,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                diets: recipe.diets.map( diet => diet.name)
            }
        })
        Promise.all([
            recipesFromApi,
            recipesFilteredDB
        ])
        .then( (respuesta) => {
            const [recipesAPI, recipesDB] = respuesta;
            const filteredFromAPI = recipesAPI.data.results.map( recipe => {
                if (recipe.vegetarian && !recipe.diets.includes('vegetarian')) {
                    recipe.diets = [...recipe.diets, 'vegetarian']
                } else if (recipe.glutenFree  && !recipe.diets.includes('gluten free')){
                    recipe.diets = [...recipe.diets, 'gluten free']
                } else if (recipe.vegan  && !recipe.diets.includes('vegan')) {
                    recipe.diets = [...recipe.diets, 'vegan']
                }
                return {
                    id:    recipe.id,
                    title: recipe.title,
                    image: recipe.image,
                    score: recipe.spoonacularScore,
                    summary: recipe.summary.replace(/<[^>]*>?/g,""),
                    healthScore: recipe.healthScore,
                    diets: recipe.diets,
                    instructions: recipe.analyzedInstructions.map(el => el.steps.map(e => e.step))
                }
            })
            filteredFromAPI.forEach(recipe => {
                recipe.diets.forEach(diet => {
                    if(!allDiets.includes(diet)) allDiets.push(diet)
                })        
            })
            allDiets.forEach(diet => {
                Diets.findOrCreate({
                    where: {
                        name: diet
                    }
                })
            })
            return allRecipes = [...recipesDB, ...filteredFromAPI]
        })
        .then( fullRecipes => {
            if(name) {
                const filter = fullRecipes.filter(recipe => recipe.title.toLowerCase().includes(name))
                filter.length? res.status(200).send(filter) : res.status(404).send('No se encontró la receta');
            } else {
                res.send(fullRecipes)
            }
        })
    } catch (error) {
        next(error)        
    } 
})


router.get('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        //recupero receta con id de la base de datos
        if(id.length >= 10 && typeof id === "string"){
          const recipe = await Recipes.findByPk(id, {
            include: Diets
          });
          return res.json(recipe);
        }
          //si no la encontre en la db, busco en la api
          const recipeAPI = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY4}`);
          recipe = {
              id: recipeAPI.data.id,
              title: recipeAPI.data.title,
              summary: recipeAPI.data.summary.replace(/<[^>]*>?/g,""),
              spoonacularScore: recipeAPI.data.spoonacularScore,
              healthScore: recipeAPI.data.healthScore,
              instructions: recipeAPI.data.analyzedInstructions.map(el => el.steps.map(e => e.step)),
              image: recipeAPI.data.image,
              diets: recipeAPI.data.diets,
              dishTypes: recipeAPI.data.dishTypes
          }
          return res.json(recipe);
        }
      catch(err){
        next(err);
      }
  });


router.post("/recipe", async (req, res, next) => {
	const {title, summary, healthScore, score, instructions, image, diets} = req.body;

	try {
    let recipes = await Recipes.create({
        title,
		summary, 
		healthScore, 
		score, 
		instructions, 
		image: image || 'https://image.freepik.com/vector-gratis/pagina-error-404-no-encontrada-donut_114341-54.jpg',  // si no se envía imagen, queda de default
		diets,
		id: uuidv4()
    })

    const dbDiets = await Diets.findAll({
             where: {
                 name: {
                     [Op.in]: Array.isArray(diets) ? diets : [diets]
                 }
             } 
         });

    recipes.addDiets(dbDiets)

    res.send('Actividad Creada!')
		}
		catch(err){
			next(err);
		  }
})

    
    
    
    
    
    
    
    

	// try {
    // let recipeCreated = await Recipes.create({
    //     title,
	// 	summary, 
	// 	healthScore, 
	// 	score, 
	// 	instructions, 
	// 	image: image || 'https://image.freepik.com/vector-gratis/pagina-error-404-no-encontrada-donut_114341-54.jpg',  // si no se envía imagen, queda de default
	// 	diets,
	// 	id: uuidv4()
    // })

    // let dietDb = await Diets.findAll({
    //     where: { name: diets } 
    // });

    // recipeCreated.addDiets(dietDb)







module.exports = router;
