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
        const recipesFromApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY1}&addRecipeInformation=true&number=100`);
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
                    summary: recipe.summary,
                    diets: recipe.diets,
                    score: recipe.spoonacularScore,
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
                const filter = fullRecipes.filter( recipe => recipe.title?.toLowerCase().includes(name.toLowerCase()) )
                res.send(filter)
            } else {
                res.send(fullRecipes)
            }
        })
    } catch (error) {
        next(error)        
    } 
})





router.get('/:idReceta', async (req, res, next) => {
	const {idReceta} = req.params;
    
    try {
        if(idReceta.length < 20 ) {
            const recipesFromApi = await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY1}`);
            const recipe = recipesFromApi.data
            if (recipe.vegetarian && !recipe.diets.includes('vegetarian')) {
                recipe.diets = [...recipe.diets, 'vegetarian']
              } else if (recipe.glutenFree  && !recipe.diets.includes('gluten free')){
                recipe.diets = [...recipe.diets, 'gluten free']
              } else if (recipe.vegan  && !recipe.diets.includes('vegan')) {
                recipe.diets = [...recipe.diets, 'vegan']
              }
            res.json(recipe)
        } else {
            const recipesFromDB = await Recipes.findAll({include: Diets});
            const recipe = recipesFromDB.map( recipe => {
                if(recipe.id.toString() === idReceta )
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
            res.json(recipe[0])
        }
    } catch (error) {
        next(error)
    }
        
})








//   const id = req.params.idReceta;
// 	if (id.includes('-')) {
// 		Recipes.findByPk(id, { include: Diets }).then((recipe) => {
// 			return res.json(recipe);
// 		});
// 	} else {
// 		axios
// 			.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY1}`)
// 			.then((response) => {
// 				return res.json({
// 					title: response.data.title,
// 					image: response.data.image,
// 					diets: response.data.diets,
// 					summary: response.data.summary,
// 					score: response.data.spoonacularScore,
// 					healthScore: response.data.healthScore,
// 					instructions: response.data.instructions,
// 				});
// 			})
// 			.catch((error) => next(error));
// 	}
// })


router.post("/recipe", async (req, res, next) => {
	let {title, summary, healthScore, score, instructions, image, diets} = req.body;

	try {
    let newRecipe = await Recipes.create({
        title,
		summary, 
		healthScore, 
		score, 
		instructions, 
		image, 
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

    newRecipe.addDiets(dbDiets)

    res.send('Actividad Creada!')
		}
		catch(err){
			next(err);
		  }
})






	
	// try{
	// 	const {title, summary, spoonacularScore, healthScore, analyzedInstructions, image, diets} = req.body;
	// 	//creo una receta con los datos recibidos
	// 	const [recipeCreated, hola] = await Recipes.findOrCreate({
	// 	  where: {
	// 	  id: uuidv4(),
	// 	  title,
	// 	  summary,
	// 	  spoonacularScore,
	// 	  healthScore,
	// 	  analyzedInstructions,
	// 	  image
	// 	  }
	// 	});
	// 	// const dietsFound = await getMatchingDiets(diets);
	// 	await recipeCreated.setDiets(diets);
	// 	res.json({hola, obj: recipeCreated});
	//   }
	//   catch(err){
	// 	next(err);
	//   }
	// })














// 	try {
//         const {title, summary, score, healthScore, steps, image, diets} = req.body;
//         const newRecipe = await Recipes.create({
//             title,
//             summary,
//             score,
//             healthScore,
//             image
//         })
//         const dietsDB = await Diets.findAll({
//             where: {name: diets}
//         }) 

//         newRecipe.addDiets(dietsDB)

//         res.status(201).send(newRecipe)
//     } catch (error) {
//         next(error)
//     }
// })










//   const { title, summary, score, healthScore, instructions, diets } = req.body;
// 	Recipes.create({
//     id,
// 		title,
// 		image: '',
// 		summary,
// 		score: parseFloat(score),
// 		healthScore: parseFloat(healthScore),
// 		instructions,
// 	})
// 		.then((recipeCreated) => {
// 			return recipeCreated.setDiets(diets);
// 		})
// 		.then(newRecipe => {
// 			return res.json({
// 				message: 'Recipe created successfully',
// 			});
// 		})
// 		.catch((error) => next(error));
// })








module.exports = router;
