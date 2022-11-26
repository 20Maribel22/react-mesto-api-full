require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const regex = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors);
app.use(bodyParser.json());

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().default('Жак-Ив Кусто').min(2).max(30),
    about: Joi.string().default('Исследователь').min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Cтраница не найдена'));
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = status === 500 ? 'Ошибка на сервере' : err.message;
  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
});
