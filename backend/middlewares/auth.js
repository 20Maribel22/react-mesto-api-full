const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация!');
  }
  const token = authorization.replace(/^Bearer\s/i, '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthorizedError('Необходима авторизация!'));
  }
  req.user = payload;// записываем пейлоуд в объект запроса
  next();// пропускаем запрос дальше
};

module.exports = auth;
