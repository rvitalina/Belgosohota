const Router = require('express');
const router = new Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth-middleware');
const roleMiddleware = require('../middleware/role-middleware');

// Публичные роуты
router.post('/registration', UserController.create);

// Защищенные роуты
router.get('/', authMiddleware, roleMiddleware(['admin']), UserController.getAll);
router.get('/me', authMiddleware, UserController.getMe);
router.get('/role/:role', authMiddleware, roleMiddleware(['admin', 'ranger']), UserController.getByRole);
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'ranger']), UserController.getById);
router.put('/:id', authMiddleware, UserController.update);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), UserController.delete);

module.exports = router;