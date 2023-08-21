const Movies = require('../models/movie');
const BadRequestError = require('../utils/errors/badrequesterror');
const ForbiddenError = require('../utils/errors/forbiddenerror');
const NotFoundError = require('../utils/errors/notfounderror');

const getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
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

  Movies.create({
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message || 'Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movies.findOne({movieId: req.params.movieId, owner: req.user._id.toString()})
    .orFail(new NotFoundError(`Фильм не найден`))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id.toString()) {
        return movie.remove()
          .then(() => res.status(200)
            .send({ message: 'Фильм удален' }));
      }
      throw new ForbiddenError('Ошибка доступа');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
