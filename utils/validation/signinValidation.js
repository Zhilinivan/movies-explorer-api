const { celebrate, Joi } = require('celebrate');

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().error(new Joi.ValidationError('Ошибка валидации')),
    password: Joi.string().required().error(new Joi.ValidationError('Ошибка валидации')),
  }),
});

module.exports = signinValidation;
