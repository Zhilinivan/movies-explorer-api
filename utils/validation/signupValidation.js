const { celebrate, Joi } = require('celebrate');

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().error(new Joi.ValidationError('Ошибка валидации')),
    password: Joi.string().required().error(new Joi.ValidationError('Ошибка валидации')),
    name: Joi.string().min(2).max(30).error(new Joi.ValidationError('Ошибка валидации')),
  }),
});

module.exports = signupValidation;
