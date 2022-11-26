const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');

const regex = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (value) => regex.test(value),
        message: 'Неправильный формат ссылки',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Неправильный формат почты',
      },

    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((document) => {
      if (!document) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, document.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          const user = document.toObject();
          delete user.password;
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
