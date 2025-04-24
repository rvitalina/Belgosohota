'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WeaponPermissions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, 
      },
      hunterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Hunters', 
          key: 'id',
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE',
      },
      issueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      expiryDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      weaponBrand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      weaponCaliber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weaponType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('WeaponPermissions');
  },
};