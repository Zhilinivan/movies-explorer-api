const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthError = require('../utils/errors/autherror');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: true,
      validate: {
        validator: (email) => /.+@.+\..+/.test(email),
        message: 'Некорректный Email.',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      minlength: [2, 'Минимальная длина 2 символа.'],
      maxlength: [30, 'Максимальная длина 30 символов.'],
      required: true,
    },
  },

  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this
          .findOne({ email })
          .select('+password')
          .then((user) => {
            if (user) {
              return bcrypt.compare(password, user.password)
                .then((matched) => {
                  if (!matched) {
                    throw new AuthError('Неправильные почта или пароль.');
                  }
                  return user;
                });
            }

            throw new AuthError('Неправильные почта или пароль');
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
