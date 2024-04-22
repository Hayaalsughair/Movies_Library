//1. requird the package 
const express = require('express')
// to get the JSON file 
const homeMovie = require('./move_data/data.json')
//2. creat an Express app
const app = express()
const port = 3000

//creat rout 
app.get("/", handelHomePage)
app.get("/favorite", handelFavorite)

//Error handler for 500 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Sorry, something went wrong');
});

// Error handler for 404 - Not Found
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

//functions 
//constructor for array of object
function Movie(title, poster_path, overview ) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}
function handelHomePage(req, res) {
  let newMovie = new Movie(homeMovie.title, homeMovie.poster_path, homeMovie.overview);
    res.json(newMovie);
}
function handelFavorite(req, res) {
    res.send("Welcome to Favorite Page ❤️")   
}

//3. The server listener 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
