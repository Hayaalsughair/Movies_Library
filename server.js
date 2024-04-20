//1. requird the package 
const express = require('express')
// to get the JSON file 
const homeMove = require('./move_data/data.json')
//2. creat an Express app
const app = express()
const port = 3000

//creat rout 
app.get("/", handelHomePage)

app.get("/favorite", handelFavorite)

//Error handler for 500 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Error handler for 404 - Not Found
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

//3. The server listener 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//functions 
function handelHomePage(req, res) {
    const { title, poster_path, overview } = homeMove;
    const responseData = {
        title: title,
        poster_path: poster_path,
        overview: overview
    };
    res.json(responseData);
}
function handelFavorite(req, res) {
    res.send("Welcome to Favorite Page ❤️")   
}

