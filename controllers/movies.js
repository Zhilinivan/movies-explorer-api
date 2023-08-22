const Movie = require('../models/movie');
const ForbiddenError = require('../utils/errors/forbiddenerror');
const NotFoundError = require('../utils/errors/notfounderror');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: _id,
  })
    .then((movie) => res.send({ movie }))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { filmId } = req.params;

  Movie
    .findById(filmId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError('Ошибка доступа'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch((err) => next(err));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
