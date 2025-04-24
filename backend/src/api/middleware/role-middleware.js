const ApiError = require('../errors/ApiError');

module.exports = function(roles) {
  return function(req, res, next) {
    try {
      // 1. Проверяем что пользователь авторизован
      if (!req.user) {
        return next(ApiError.unauthorized('Не авторизован'));
      }

      // 2. Проверяем наличие нужной роли
      if (!roles.includes(req.user.role)) {
        return next(ApiError.forbidden('Нет доступа'));
      }

      next();
    } catch (e) {
      return next(ApiError.internal('Ошибка проверки прав доступа'));
    }
  }
}