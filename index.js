const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';


//   title,
//   level,
//   ingredients,
//   cuisine,
//   dishType,
//   duration
//   creator,

const newRecipe = {

    title: "Pasta",
    level: "Easy Peasy",
    ingredients: ["water","pasta", "sauce"],
    cuisine: "Italian",
    dishType: "main_course",
    duration: 12,
    creator: "Juan Reyes",
   
}


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones    
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(newRecipe)
  }) 
  .then((result) => {
    console.log(`${result.title}`)
  })
  .then(() => {
    return Recipe.insertMany(data)
    })
  .then(() => {
    data.forEach(element => console.log(element.title))   
  })
  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake' })
  })
  .then(() => {
    return console.log("Deleted Carrot Cake")
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .then(() => {
    return console.log ("Bye bye")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
