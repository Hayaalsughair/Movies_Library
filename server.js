//Lab 12 
require('dotenv').config();
const express = require('express');
const axios = require('axios').default;
var cors = require('cors');
const app = express();
const port = 3000;
const homeMovie = require('./move_data/data.json');
const apiKey = process.env.API_KEY;
app.use(cors())

// routs
app.get("/", handelHomePage);
app.get("/favorite", handelFavorite);
app.get("/trending", handelTrending);
app.get("/search", handelSearch);
//Tow rout 
app.get("/upcoming", handelUpcoming)
app.get("/nowPlaying", handelNowPlaying)

//constructor
function Movie(id, title, release_data, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_data = release_data;
    this.poster_path = poster_path;
    this.overview = overview;
}

//Fuctions
function handelTrending(req, res) {
    // To get data from 3rd party 
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=The&page=2`;
    //Axios 
    axios.get(url)
        .then(result => {
            console.log(result.data.results);
            let trending = result.data.results.map(trend => {
                return new Movie(
                    trend.id,
                    trend.title,
                    trend.release_data,
                    trend.poster_path,
                    trend.overview
                );
            });
            res.json(trending);
        })
        .catch(error => {
            console.error( error);
            res.status(500).json('Internal Server Error');
        });
}

function handelSearch(req, res) {
    console.log(req.query);
    let movieName = req.query.movieName;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=1`; 
    axios.get(url)
         .then(result => {
            // console.log(result.data.results);
            res.json(result.data.results);
          })
          .catch(error => {
            console.error( error);
            res.status(500).json('Internal Server Error');
        });

    // res.send("movie name ")
}

function handelUpcoming(req, res) {
   const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&query=The&page=1`
    //Axios 
    axios.get(url)
        .then(result => {
            console.log(result.data.results);
            let upComing = result.data.results.map(coming => {
                return new Movie(
                    coming.id,
                    coming.title,
                    coming.release_data,
                    coming.poster_path,
                    coming.overview
                );
            });
            res.json(upComing);
        })
        .catch(error => {
            console.error( error);
            res.status(500).json('Internal Server Error');
        });

}

function handelNowPlaying(req, res) {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&query=The&page=1`
    axios.get(url)
    .then(result => {
    //    console.log(result.data.results);
       res.json(result.data.results);
     })
     .catch(error => {
       console.error( error);
       res.status(500).json('Internal Server Error');
   });
}

function handelHomePage(req, res) {
    let newMovie = new Movie(homeMovie.title, homeMovie.poster_path, homeMovie.overview);
      res.json(newMovie);
  }

function handelFavorite(req, res) {
    res.send("Welcome to Favorite Page ❤️")   
}

//The server listener 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//Error handler for 500 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Sorry, something went wrong');
});

// Error handler for 404 - Not Found
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});
