'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // 1. Проверяем, что permissionId подходит для PK (нет NULL и дублей)
      const [nullCheck] = await queryInterface.sequelize.query(
        `SELECT COUNT(*) as nulls FROM "HunterPermissions" WHERE "permissionId" IS NULL`,
        { transaction }
      );
      if (nullCheck[0].nulls > 0) throw new Error('Есть записи с permissionId = NULL!');

      const [duplicates] = await queryInterface.sequelize.query(
        `SELECT "permissionId", COUNT(*) as cnt 
         FROM "HunterPermissions" 
         GROUP BY "permissionId" HAVING COUNT(*) > 1`,
        { transaction }
      );
      if (duplicates.length > 0) throw new Error('Найдены дубликаты permissionId!');

      // 2. Назначаем permissionId новым PK
      await queryInterface.sequelize.query(`
        ALTER TABLE "HunterPermissions" 
        ADD PRIMARY KEY ("permissionId")
      `, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Возвращаем составной PK (hunterId, permissionId)
      await queryInterface.sequelize.query(`
        ALTER TABLE "HunterPermissions" 
        DROP CONSTRAINT IF EXISTS "HunterPermissions_pkey",
        ADD PRIMARY KEY ("hunterId", "permissionId")
      `, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};