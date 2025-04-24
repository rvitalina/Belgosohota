'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Удаляем конкретную запись
      await queryInterface.sequelize.query(`
        DELETE FROM "WeaponPermissions"
        WHERE "hunterId" = '1'
      `, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error('Migration error:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    // Восстановление удаленной записи (если нужно)
    // Здесь должен быть код для восстановления из бэкапа
  }
};