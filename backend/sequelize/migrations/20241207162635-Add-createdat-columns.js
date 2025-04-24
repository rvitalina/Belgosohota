'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables(); // Получаем список всех таблиц

    for (const table of tables) {
      // Проверяем наличие столбца createdAt
      const hasCreatedAt = await queryInterface.describeTable(table).then(columns => columns.createdAt);
      if (!hasCreatedAt) {
        await queryInterface.addColumn(table, 'createdAt', {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        });
      }

      // Проверяем наличие столбца updatedAt
      const hasUpdatedAt = await queryInterface.describeTable(table).then(columns => columns.updatedAt);
      if (!hasUpdatedAt) {
        await queryInterface.addColumn(table, 'updatedAt', {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        });
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables(); // Получаем список всех таблиц

    for (const table of tables) {
      await queryInterface.removeColumn(table, 'createdAt');
      await queryInterface.removeColumn(table, 'updatedAt');
    }
  },
};