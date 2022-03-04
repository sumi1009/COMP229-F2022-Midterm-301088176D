// movies.js, Sumi Lee, 301088176, Movie List

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// call the movies model
let movies = require('../models/movies');

/* GET movies List page. READ */
router.get('/', (req, res, next) => {
  // find all movie in the books collection
  movies.find( (err, list) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('movies/index', {
        title: 'Movies',
        list: list
      });
    }
  });

});

//  GET the Movies Details page in order to add a new Movies
/* If an error occurs in the process of importing movie details, 
it displays an error occurrence message.
If you bring the appropriate movie details, show the movie that 
fits the information you brought.
*/
router.get('/add', (req, res, next) => {
  movies.find((err, movies) => {
      if (err) {
          return console.error(err);
      } else {
          res.render('movies/details', {
              title: 'New Movies',
              movies: movies,
              Title: movies.Title,
              Description: movies.Description,
              Released: movies.Released,
              Director: movies.Director,
              Genre: movies.Genre
          });
      }
  });
});

// POST process the Movies Details page and create a new Movies - CREATE
/* Receive and save new movie information.
When an error occurs, an error message is displayed.
*/
router.post('/add', (req, res, next) => {
  const new_movies = new movies({
      Title: req.body.title_txt,
      Description: "",
      Released: req.body.released_txt,
      Director: req.body.director_txt,
      Genre: req.body.genre_txt
  });
  new_movies.save().then(() => console.log('Complete the save movie'));
  movies.find((err, movies) => {
      if (err) {
          return console.error(err);
      } else {
          res.render('movies/index', {
              title: 'Movies',
              movies: movies
          });
      }
  });
  return res.redirect('/movies');
});

// GET the Movies Details page in order to edit an existing Movies
/*Among the movie lists, modify the movie to be modified.
When an error occurs, an error message is displayed.
*/
router.get('/:id', (req, res, next) => {
  console.log(req.params.id);
  movies.findById(req.params.id.value,(err, movies) => {
      if (err) {
          return console.error(err);
      } else {
          res.render('movies/details', {
              title: "Edit Movies",
              movies: movies,
              Title: movies.Title,
              Description: movies.Description,
              Released: movies.Released,
              Director: movies.Director,
              Genre: movies.Genre
          });
      }
  });
});

// POST - process the information passed from the details form and update the document
/*Update and save new content.
When an error occurs, an error message is displayed.
*/
router.post('/:id', (req, res, next) => {

  const new_movies = new movies({
      Title: req.body.title_txt,
      Description: "",
      Released: req.body.released_txt,
      Director: req.body.director_txt,
      Genre: req.body.genre_txt
  });
  new_movies.save().then(() => console.log('Complete the save movie'));
  movies.find((err, movies) => {
      if (err) {
          return console.error(err);
      } else {
          res.render('movies/index', {
              title: 'Movies',
              movies: movies
          });
      }
  });

});

// GET - process the delete by user id
/*Select a movie to delete and delete it.
When an error occurs, an error message is displayed.
*/
router.get('/delete/:id', (req, res, next) => {
  movies.findById(id,(err, movies) => {
      if (err) {
          return console.error(err);
      } else {
          res.render('movies/details', {
              Title: 'Delete Movies',
              movies: movies,
              Title: movies.Title,
              Description: movies.Description,
              Released: movies.Released,
              Director: movies.Director,
              Genre: movies.Genre
          });
      }
  });
});


module.exports = router;
