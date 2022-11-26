const mongoose = require('mongoose');

const regex = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (value) => regex.test(value),
        message: 'Неправильный формат ссылки',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
