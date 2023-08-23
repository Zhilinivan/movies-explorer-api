const { celebrate, Joi } = require('celebrate');
const { urlTest } = require('../constants');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().error(new Joi.ValidationError('Ошибка валидации')),
    director: Joi.string().required().error(new Joi.ValidationError('Ошибка валидации')),
    duration: Joi.number().required().error(new Joi.ValidationError('Ошибка валидации')),
    year: Joi.string().required().error(new Joi.ValidationError('Ошибка валидации')),
    description: Joi.string().required().error(new Joi.ValidationError('Ошибка валидации')),
    image: Joi.string().pattern(urlTest).required().error(new Joi.ValidationError('Ошибка валидации')),
    trailer: Joi.string().pattern(urlTest).required().error(new Joi.ValidationError('Ошибка валидации')),
    thumbnail: Joi.string().pattern(urlTest).required().error(new Joi.ValidationError('Ошибка валидации')),
    movieId: Joi.number().required().error(new Joi.ValidationError('Ошибка валидации')),
    nameRU: Joi.string().required().error(new Joi.ValidationError('Ошибка валидации')),
    nameEN: Joi.string().required().error(new Joi.ValidationError('Ошибка валидации')),
  }),
});

module.exports = createMovieValidation;
