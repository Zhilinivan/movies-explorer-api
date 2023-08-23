const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const createMovieValidation = require('../utils/validation/createMovieValidation');
const deleteMovieValidation = require('../utils/validation/deleteMovieValidation');

router.get('/movies/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:filmId', deleteMovieValidation, deleteMovie);

module.exports = router;
