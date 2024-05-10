// //Lab 14

// //require express
// const express = require('express');
// const app = express();

// //require axios
// const axios = require('axios').default;

// //require cors
// const cors = require('cors');

// //set port 
// const port =process.env.PORT || 3001;

// //require body-parser
// const bodyParser = require('body-parser');

// const homeMovie = require('./move_data/data.json');
// //Use cors
// app.use(cors())

// //require env 
// require('dotenv').config();

// //API KEY  
// const apiKey = process.env.API_KEY;

// //Use body parser
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
//  /* ********************************************** Local DB *****************************************************/ 
//  const url = process.env.URL
// //postgres
// const { Client } = require('pg')
// const client = new Client(url)

// /* ************************************** Deplye DataBase************************************************************ */ 
// //require pg
// // const pg = require( 'pg');
// // const { Client } = require('pg')

// // //URL Database 
// // const DataBase=process.env.PG_DATABASE;
// // const UserName=process.env.PG_USER;
// // const Password=process.env.PG_PASSWORD;
// // const Host=process.env.PG_HOST;
// // // const Port=process.env.PG_PORT;
//postgres://movies_6zi3_user:PkGrF7X9lkpUIhHyuH2xIblJ2pL0Wv0u@dpg-copbss6n7f5s73b3lnh0-a.oregon-postgres.render.com/movies_6zi3
// // const pgUrl =`postgresql://${UserName}:${Password}@${Host}.oregon-postgres.render.com/${DataBase}?ssl=true`;
// // const client = new Client(pgUrl);
// /* ************************************************************************************************* */ 


// // routs
// app.get("/", handelHomePage);
// app.get("/favorite", handelFavorite);
// app.get("/trending", handelTrending);
// app.get("/search", handelSearch);

// //requset from client => server 
// app.post("/addMovie", handleAdd)
// app.get("/getMovies", handleGet)

// // New CRUD 
// // app.put("/UPDATE/:id", handleUpdate); //PUT => Update 
// // app.delete("/DELETE/:id", handleDelete); //In Query 
// // app.get("/getMovie/:id", handleGetMovieId);


// app.put('/updateMovie/:id', updateMovieHandler);//lab14
// app.delete('/deleteMovie/:id', deleteMovieHandler);//lab14
// app.get('/getMovie/:id', getMovieHandler);//lab14

// //Tow more routs
// app.get("/upcoming", handelUpcoming)
// app.get("/nowPlaying", handelNowPlaying)

// //constructor
// function Movie(id, title, release_data, poster_path, overview) {
//     this.id = id;
//     this.title = title;
//     this.release_data = release_data;
//     this.poster_path = poster_path;
//     this.overview = overview;
// }



// //Fuctions
// function updateMovieHandler(req,res){
//     const id = req.params.id
//     // const {original_title, release_date, poster_path, overview, comment }= req.body 
//     // const  sql = `UPDATE movies SET original_title=$1, release_date=$2, poster_path=$3, overview=$4, comment=$5 WHERE id= ${id} RETURNING *;`
//     // const values = [original_title,release_date,poster_path,overview,comment] 

//     const {title, release_date, poster_path, overview } = req.body;
//     const sql = `UPDATE movies SET title=$2, release_date=$3, poster_path=$4, overview=$5  WHERE id=$1 RETURNING *;`
//     const values = [ id, title, release_date, poster_path, overview]

//     client.query(sql, values).then((reuslt)=>{
//         console.log(reuslt.rows)
//         res.status(200).json(reuslt.rows)
//     })
//     .catch(((error) =>{
//         errorHandler(error, req, res);
//     }))
// }
// // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// function deleteMovieHandler(req,res){
//     const id = req.params.id
//     const  sql = `DELETE FROM movies WHERE id= ${id} RETURNING *;`
//     client.query(sql).then((reuslt)=>{
//         console.log(reuslt.rows)
//         res.status(204).json(reuslt.rows)
//     })
//     .catch(((error) =>{
//         errorHandler(error, req, res);
//     }))
// }
// // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// function getMovieHandler(req,res){
//     const id = req.params.id;
//     const sql=`SELECT * FROM movies WHERE id = ${id} ;`
//     client.query(sql).then((reuslt)=>{
//         console.log(reuslt.rows)
//         res.status(200).json(reuslt.rows)
//     })
//     .catch(((error) =>{
//         errorHandler(error, req, res);
//     }))
//   }

// // function handleUpdate(req, res) {
// //     /* id, title, release_date, poster_path, overview*/
// //     let id = req.params.id;
// //     let { title, release_date, poster_path, overview } = req.body;
// //     let sql = `UPDATE movies SET title=$2, release_date=$3, poster_path=$4, overview=$5  WHERE id=$1 RETURNING *;`
// //     let value = [ id, title, release_date, poster_path, overview]

// //     client.query(sql, value).then((result) => {
// //         return res.json(result.rows[0]);
// //     })
// //     .catch((error) => {
// //         errorHandler(error, req, res);
// //     });
// // }

// // function handleDelete(req, res){
// //     const {id} = req.params;
// //     let sql = `DELETE FROM movies WHERE id=$1;`
// //     let value = [id];
// //     client.query(sql, value).then((result) => {
// //         // console.log(result);
// //         return res.status(204).json(result.rows[0]);
// //     })
// //     .catch((error) => {
// //         errorHandler(error, req, res);
// //     });
// // }

// // function handleGetMovieId(req, res){
// //     const {id} = req.params;
// //     let sql = `SELECT * FROM movies WHERE id=$1;`
// //     let value = [id];
// //     client.query(sql, value).then((result) => {
// //         return res.json(result.rows);
// //     })
// //     .catch((error) => {
// //         errorHandler(error, req, res);
// //     }); 
// // }

// function handelTrending(req, res) {
//     // To get data from 3rd party 
//     const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`;
//     //Axios 
//     axios.get(url)
//         .then(result => {
//             console.log(result.data.results);
//             let trending = result.data.results.map(trend => {
//                 return new Movie(
//                     trend.id,
//                     trend.title,
//                     trend.release_data,
//                     trend.poster_path,
//                     trend.overview
//                 );
//             });
//             res.json(trending);
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json('Internal Server Error');
//         });
// }


// function handelSearch(req, res) {
//     console.log(req.query);
//     let movieName = req.query.movieName;
//     const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=1`;
//     axios.get(url)
//         .then(result => {
//             // console.log(result.data.results);
//             res.json(result.data.results);
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json('Internal Server Error');
//         });

//     // res.send("movie name ")
// }


// function handelUpcoming(req, res) {
//     const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&query=The&page=1`
//     //Axios 
//     axios.get(url)
//         .then(result => {
//             console.log(result.data.results);
//             let upComing = result.data.results.map(coming => {
//                 return new Movie(
//                     coming.id,
//                     coming.title,
//                     coming.release_data,
//                     coming.poster_path,
//                     coming.overview
//                 );
//             });
//             res.json(upComing);
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json('Internal Server Error');
//         });

// }

// function handelNowPlaying(req, res) {
//     const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&query=The&page=1`

//     axios.get(url)
//         .then(result => {
//             //    console.log(result.data.results);
//             res.json(result.data.results);
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json('Internal Server Error');
//         });
// }

// function handelHomePage(req, res) {
//     let newMovie = new Movie(homeMovie.title, homeMovie.poster_path, homeMovie.overview);
//     res.json(newMovie);
// }

// function handelFavorite(req, res) {
//     res.send("Welcome to Favorite Page ❤️")
// }

// // function handleAdd(req, res) {
// //     console.log(req.body);
// //     const {id,title, release_date, poster_path, overview  } = req.body;
// //     let sql = `INSERT INTO movies (id, title, release_date, poster_path, overview)
// //              VALUES ($1, $2, $3, $4, $5) RETURNING *;`

// //     // let sql = `INSERT INTO movietable (original_title, release_date, poster_path, overview, comment )
// //     // VALUES ($1, $2, $3, $4, $5) RETURNING *;`

// //     const value = [id, title, release_date, poster_path, overview] 
// //     client.query(sql, value)
// //         .then((result) => {
// //             console.log(result.rows);
// //             return res.status(201).json(result.rows)
// //         })
// //         .catch(error => {
// //             console.error(error);
// //             res.status(500).json('Internal Server Error');
// //         });
// // }

// function handleAdd(req, res) {
//     console.log(req.body);
//     let { title, release_date, poster_path, overview } = req.body;

//     let sql = `INSERT INTO movies(title, release_date, poster_path, overview)
//              VALUES ($1, $2, $3, $4) RETURNING *;`

//     let values = [title, release_date, poster_path, overview];
    
//     client.query(sql, values)
//         .then((result) => {
//             console.log(result.rows);
//             return res.status(200).json(result.rows[0])
//         })
//         // .catch(error => {
//         //     console.error(error);
//         //     res.status(500).json('Internal Server Error');
//         // });
// }


// function handleGet(req, res) {
//     let sql = 'SELECT * FROM movies;'
//     //we dont need value caus it null we return it from handelAdd
//     client.query(sql)
//         .then((result) => {
//             return res.status(200).json(result.rows);
//         })
//         // .catch(error => {
//         //     console.error(error);
//         //     res.status(500).json('Internal Server Error');
//         // });

// }


// //start listen when db connect 
// client.connect().then(() => {
//     // the server always listen but i want it start listen when db connect 
//     app.listen(port, () => {
//         console.log(`Example app listening on port ${port}`)
//     })
// })
//  .catch()
 
// //Error handler for 500 
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Sorry, something went wrong');
// });


// // function errorHandler(error, erq, res) {
// //     res.status(500).send(error);
// // }


// // Error handler for 404 - Not Found
// app.use((req, res) => {
//     res.status(404).send('Page Not Found');
// });


require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios').default;
const cors = require('cors');
const port = 3000;
const homeMovie = require('./move_data/data.json');

const apiKey = process.env.API_KEY;
/* *********************** Local DB ******************* */
const url = process.env.URL

//postgres
// const { Client } = require('pg')
// const client = new Client(url)
//or 
//const pg = require('pg');
// const client = new Client(url)
/* ****************************************** */
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
/********************** Deploying Part *****************************/
const DataBase=process.env.PG_DATABASE;
const UserName=process.env.PG_USER;
const password=process.env.PG_PASSWORD;
const Host=process.env.PG_HOST;
const PORT=process.env.PG_PORT;
const {Client}= require('pg');
// const dbURL = `postgres://${UserName}:${password}@${Host}:${PORT}/${DataBase}`;
const dbURL =`postgresql://${UserName}:${password}@${Host}.oregon-postgres.render.com/${DataBase}?ssl=true`;

const client = new Client(dbURL);
/* *********************************************************** */
// API routs
app.get("/", handelHomePage);
app.get("/favorite", handelFavorite);
app.get("/trending", handelTrending);
app.get("/search", handelSearch);
//Tow more routs
app.get("/upcoming", handelUpcoming)
app.get("/nowPlaying", handelNowPlaying)

//DB
app.post("/addMovie", handleAdd)
app.get("/getMovies", handleGet)
//CRUD
app.put('/updateMovie/:id', updateMovieHandler);//lab14
app.delete('/deleteMovie/:id', deleteMovieHandler);//lab14
app.get('/getMovie/:id', getMovieHandler);//lab14
+

//constructor
function Movie(id, title, release_data, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_data = release_data;
    this.poster_path = poster_path;
    this.overview = overview;
}

//Fuctions
//CRUD function
function updateMovieHandler(req,res){
    const id = req.params.id
    // const {original_title, release_date, poster_path, overview, comment }= req.body 
    // const  sql = `UPDATE movies SET original_title=$1, release_date=$2, poster_path=$3, overview=$4, comment=$5 WHERE id= ${id} RETURNING *;`
    // const values = [original_title,release_date,poster_path,overview,comment] 

    const {title, release_date, poster_path, overview } = req.body;
    const sql = `UPDATE movies SET title=$2, release_date=$3, poster_path=$4, overview=$5  WHERE id=$1 RETURNING *;`
    const values = [ id, title, release_date, poster_path, overview]

    client.query(sql, values).then((reuslt)=>{
        console.log(reuslt.rows)
        res.status(200).json(reuslt.rows)
    })
    .catch(((error) =>{
        errorHandler(error, req, res);
    }))
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function deleteMovieHandler(req,res){
    const id = req.params.id
    const  sql = `DELETE FROM movies WHERE id= ${id} RETURNING *;`
    client.query(sql).then((reuslt)=>{
        console.log(reuslt.rows)
        res.status(204).json(reuslt.rows)
    })
    .catch(((error) =>{
        errorHandler(error, req, res);
    }))
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getMovieHandler(req,res){
    const id = req.params.id;
    const sql=`SELECT * FROM movies WHERE id = ${id} ;`
    client.query(sql).then((reuslt)=>{
        console.log(reuslt.rows)
        res.status(200).json(reuslt.rows)
    })
    .catch(((error) =>{
        errorHandler(error, req, res);
    }))
  }


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
             VALUES ($1, $2, $3, $4, $5) RETURNING *;`


    let value = [id, title, release_date, poster_path, overview]
    client.query(sql, value)
        .then((result) => {
            console.log(result.rows);
            return res.status(201).json(result.rows)
        })

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
// client.connect().then(() => {
//     // the server always listen but i want it start listen when db connect 
//     app.listen(port, () => {
//         console.log(`Example app listening on port ${port}`)
//     })
// })
client.connect().then(()=>{
    app.listen(port, () => {
    console.log(`Iam listen for ${port}`)
});
}).catch()

//Error handler for 500 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Sorry, something went wrong');
});

// Error handler for 404 - Not Found
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});