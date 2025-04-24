'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HuntingCertificates', {
      certificateId: {
        type: Sequelize.STRING, 
        allowNull: false,
        primaryKey: true, 
        autoIncrement: false, 
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HuntingCertificates');
  },
};