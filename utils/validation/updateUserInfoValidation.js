const { celebrate, Joi } = require('celebrate');

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError('Ошибка валидации')),
    email: Joi.string().email().required().error(new Joi.ValidationError('Ошибка валидации')),
  }),
});

module.exports = updateUserInfoValidation;
