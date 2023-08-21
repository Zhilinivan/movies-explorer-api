const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { regUser } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), regUser);

module.exports = router;
