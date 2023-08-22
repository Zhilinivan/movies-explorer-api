const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { secretString } = require('../utils/constants');
const NotFoundError = require('../utils/errors/notfounderror');
const DataError = require('../utils/errors/dataerror');

const regUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(201).send({
        _id,
        email,
        name,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new DataError('Email используется.'));
      } else {
        next(err);
      }
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      const token = jwt.sign({ userId }, secretString, { expiresIn: '7d' });
      res.send({ _id: token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const { userId } = req.user;

  User
    .findById(userId)
    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь не найден');
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден.'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  regUser,
  loginUser,
};
