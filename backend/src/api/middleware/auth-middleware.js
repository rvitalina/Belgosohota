const jwt = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');
const { Users } = require('../../../sequelize/models/models');

module.exports = async function (req, res, next) {
  try {
    // 1. Получаем токен из заголовков
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.unauthorized('Не авторизован'));
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
      return next(ApiError.unauthorized('Не авторизован'));
    }

    // 2. Верифицируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Проверяем существование пользователя
    const user = await Users.findByPk(decoded.id);
    if (!user) {
      return next(ApiError.unauthorized('Пользователь не найден'));
    }

    // 4. Добавляем пользователя в запрос
    req.user = user;
    next();
  } catch (e) {
    return next(ApiError.unauthorized('Не авторизован'));
  }
};