const { Users } = require('../../../sequelize/models/models');
const ApiError = require('../errors/ApiError');
const bcrypt = require('bcrypt');

class UserController {
  
  // Получить всех пользователей (только для admin)
  async getAll(req, res, next) {
    try {
      const users = await Users.findAll({
        attributes: { exclude: ['password'] }
      });
      return res.json(users);
    } catch (e) {
      next(ApiError.internal('Ошибка при получении пользователей'));
    }
  }

  // Получить текущего пользователя
  async getMe(req, res, next) {
    try {
      const user = await Users.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
      });
      return res.json(user);
    } catch (e) {
      next(ApiError.internal('Ошибка при получении профиля'));
    }
  }

  // Получить пользователя по ID
  async getById(req, res, next) {
    try {
      const user = await Users.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
      });
      
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }
      
      return res.json(user);
    } catch (e) {
      next(ApiError.internal('Ошибка при получении пользователя'));
    }
  }

  async create(req, res, next) {
    try {
      const { email, password, role } = req.body;

      // Валидация входных данных
      if (!email || !password || !role) {
        return next(ApiError.badRequest('Все поля обязательны для заполнения'));
      }

      // Проверка формата email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return next(ApiError.badRequest('Некорректный формат email'));
      }

      // Проверка существующего пользователя
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'));
      }

      // Хеширование пароля
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Создание пользователя
      const user = await Users.create({
        email,
        password: hashedPassword,
        role
      });

      // Формирование ответа без пароля
      const userResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };

      return res.status(201).json(userResponse);

    } catch (error) {
      console.error('Детали ошибки:', error);
      
      // Специфичные ошибки Sequelize
      if (error.name === 'SequelizeUniqueConstraintError') {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'));
      }
      if (error.name === 'SequelizeValidationError') {
        return next(ApiError.badRequest(error.errors.map(e => e.message).join(', ')));
      }
      
      return next(ApiError.internal('Произошла ошибка при создании пользователя'));
    }
  }

  // Обновить пользователя
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { email, password, role } = req.body;
      
      const user = await Users.findByPk(id);
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }
      
      // Проверка прав доступа
      if (req.user.role !== 'admin' && req.user.id !== user.id) {
        return next(ApiError.forbidden('Нет доступа'));
      }
      
      const updateData = { email, role };
      
      if (password) {
        updateData.password = await bcrypt.hash(password, 5);
      }
      
      await user.update(updateData);
      
      const userData = user.get();
      delete userData.password;
      
      return res.json(userData);
    } catch (e) {
      next(ApiError.internal('Ошибка при обновлении пользователя'));
    }
  }

  // Удалить пользователя
  async delete(req, res, next) {
    try {
      const user = await Users.findByPk(req.params.id);
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }
      
      await user.destroy();
      return res.json({ message: 'Пользователь успешно удален' });
    } catch (e) {
      next(ApiError.internal('Ошибка при удалении пользователя'));
    }
  }

  // Получить пользователей по роли
  async getByRole(req, res, next) {
    try {
      const { role } = req.params;
      const validRoles = ['hunter', 'ranger', 'employee', 'admin'];
      
      if (!validRoles.includes(role)) {
        return next(ApiError.badRequest('Некорректная роль'));
      }
      
      const users = await Users.findAll({
        where: { role },
        attributes: { exclude: ['password'] }
      });
      
      return res.json(users);
    } catch (e) {
      next(ApiError.internal('Ошибка при получении пользователей'));
    }
  }
}

module.exports = new UserController();