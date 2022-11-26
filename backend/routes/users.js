const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regex = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;
const {
  getUsers,
  getAboutUser,
  getUserId,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getAboutUser);

userRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserId);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
}), updateUserAvatar);

module.exports = userRouter;
