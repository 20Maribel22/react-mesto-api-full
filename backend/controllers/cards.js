const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const ServerError = require('../errors/ServerError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => next(new ServerError('Произошла внутренняя ошибка сервера')));
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неправильный, некорректный запрос'));
      } else {
        next(new ServerError('Произошла внутренняя ошибка сервера'));
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному id не найдена');
      }
      if (req.user._id !== String(card.owner)) {
        throw new ForbiddenError('Нельзя удалить чужую карточку!');
      }
      return card.remove()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неправильный, некорректный запрос'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        next(new NotFoundError('Карточка по указанному id не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неправильный, некорректный запрос'));
      } else {
        next(new ServerError('Произошла внутренняя ошибка сервера'));
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        next(new NotFoundError('Карточка по указанному id не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неправильный, некорректный запрос'));
      } else {
        next(new ServerError('Произошла внутренняя ошибка сервера'));
      }
    });
};
