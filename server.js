//Lab 13

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios').default;
const cors = require('cors');
const PORT = 3000;
const homeMovie = require('./move_data/data.json');

const apiKey = process.env.API_KEY;
const url = process.env.URL


//postgres
const { Client } = require('pg')
const client = new Client(url)
//or 
//const pg = require('pg');
// const client = new Client(url)


const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


//postgres
const { Client } = require('pg')
const client = new Client(url)
//or 
//const pg = require('pg');
// const client = new Client(url)


const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
/* ========================= lab 11 ============================= */
// routs
app.get("/", handelHomePage);
app.get("/favorite", handelFavorite);


/* ========================= lab 12 ============================= */
app.get("/trending", handelTrending);
app.get("/search", handelSearch);

//requset from client => server 
app.post("/addMovie", handleAdd)
app.get("/getMovie", handleGet)


/* ========================= lab 13 ============================= */
//requset from client => server 
app.post("/addMovie", handleAdd)
app.get("/getMovie", handleGet)


/* ========================= lab 12 ============================= */

//Tow more routs
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


/* ========================= lab 11 ============================= */
//Fuctions
function handelHomePage(req, res) {
    let newMovie = new Movie(homeMovie.title, homeMovie.poster_path, homeMovie.overview);
    res.json(newMovie);
}

function handelFavorite(req, res) {
    res.send("Welcome to Favorite Page ❤️")
}

/* ========================= lab 12 ============================= */


//Fuctions

function handelTrending(req, res) {
    // To get data from 3rd party 
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`;
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
            console.error(error);
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
            console.error(error);
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
            console.error(error);
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
            console.error(error);
            res.status(500).json('Internal Server Error');
        });
}

/* ========================= lab 13 ============================= */
function handleAdd(req, res) {
    // console.log(req.body);
    const { id, title, release_date, poster_path, overview } = req.body;
    let sql = `INSERT INTO movies (id, title, release_date, poster_path, overview)
             VALUES ($1, $2, $3, $4, $5) RETURNING*;`


    let value = [id, title, release_date, poster_path, overview]
    client.query(sql, value)
        .then((result) => {
            console.log(result.rows);
            return res.status(201).json(result.rows)
        }).catch((error) => {
            errorHandler(error, req, res);
        });
}

function handleGet(req, res) {
    let sql = 'SELECT * FROM movies;'
    //we dont need value caus it null we return it from handelAdd
    client.query(sql)
        .then((result) => {
            return res.status(200).json(result.rows);
        })
}


//start listen when db connect 
client.connect().then(() => {
    // the server always listen but i want it start listen when db connect 
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    })
})
=======


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
            console.error(error);
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
            console.error(error);
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

function handleAdd(req, res) {
    // console.log(req.body);
    const { id, title, release_date, poster_path, overview } = req.body;
    let sql = `INSERT INTO movies (id, title, release_date, poster_path, overview)
             VALUES ($1, $2, $3, $4, $5) RETURNING*;`


    let value = [id, title, release_date, poster_path, overview]
    client.query(sql, value)
        .then((result) => {
            console.log(result.rows);
            return res.status(201).json(result.rows)
        }).catch((error) => {
            errorHandler(error, req, res);
        });
}

function handleGet(req, res) {
    let sql = 'SELECT * FROM movies;'
    //we dont need value caus it null we return it from handelAdd
    client.query(sql)
        .then((result) => {
            return res.status(200).json(result.rows);
        })
}



//start listen when db connect 
client.connect().then(() => {
    // the server always listen but i want it start listen when db connect 
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    })
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
