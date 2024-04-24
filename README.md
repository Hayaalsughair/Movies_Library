> # Movies_Library - V.0.1 📽️
  **Author Name**: Haya Al-Sughair 
## Web Request Response Cycle (WRRC)
![wrrc2_imge](wrrc2.jpg)
## Overview 
This project is an Express.js API for accessing movie data. It lets users fetch trending movies and search for movies by title. The app connects to TMDB (The Movie Database) API to get movie information.

## Getting Started
- Using Nodejs (RunTime enviroment )
- Install the cors Package (`$ npm install cors`) Using By:
    - `var cors = require('cors')`
    - `app.use(cors())`
- Install nodemon Package (`$npm i nodemon`)
    - `npm i -g nodemon`.
    - If you face error in access use this : `sudo npm i -g nodemon`.
    - `nodemon File-Name `.

## New Project Features   
- Trending Movies Endpoint:

    Endpoint: `/trending`.

    Description: Retrieves a list of trending movies from the TMDB API and returns the data as JSON.
- Search Movies Endpoint:

     Endpoint: `/search`. 

    Description: Allows users to search for movies based on their titles. Users can provide a query parameter (movieName) to search for specific movies. The endpoint queries the TMDB API and returns the search results as JSON.




> # Movies_Library - V.0.0 

## Web Request Response Cycle (WRRC)
![wrrc_imge](wrrc.jpg)
## Overview
This application serves as a basic framework for serving movie data and handling simple HTTP requests.
## Getting Started
- Node JS (Runtime enviroment) 
- Building a server : 
    - Use Express (Frame Work for node js ) By :
        - `npm init -y`: Use this command to create a package.json .
        - `npm install express` : To install the express package.
        - `npm file name ` : To run the server.

## Project Features
1.  Routing 
    - Home Routing. 
    - Favorite Routing .
2. Error Handling: The app handel two type of error 
    - 500:Internal Server Error "Sorry, something went wrong".
    - 404: "Not Found".
3. Server SetUp.
4. Data Handling.
