const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlTest } = require('../utils/constants');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies/', getMovies);

router.post('/movies/',
  celebrate({
   body: Joi.object({
     country: Joi.string().required(),
     director: Joi.string().required(),
     duration: Joi.number().required(),
     year: Joi.string().required(),
     description: Joi.string().required(),
     image: Joi.string().pattern(urlTest).required(),
     trailer: Joi.string().pattern(urlTest).required(),
     thumbnail: Joi.string().pattern(urlTest).required(),
     movieId: Joi.number().required(),
     nameRU: Joi.string().required(),
     nameEN: Joi.string().required(),
   }),
  }),
  createMovie);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object()
    .keys({
      movieId: Joi.number(),
    }),
}), deleteMovie);

module.exports = router;