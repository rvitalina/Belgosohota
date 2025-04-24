'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // 1. Создаем таблицу Rangers
      await queryInterface.createTable('Rangers', {
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        patronymic: {
          type: Sequelize.STRING,
          allowNull: false
        },
        departmentId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Departments',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { transaction });

      // 2. Добавляем внешний ключ в HuntingTerritories
      await queryInterface.addConstraint('HuntingTerritories', {
        fields: ['rangerId'],
        type: 'foreign key',
        name: 'HuntingTerritories_rangerId_fkey',
        references: {
          table: 'Rangers',
          field: 'userId'  // Ссылаемся на userId в Rangers
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        transaction
      });

      // 3. Добавляем индексы
      await Promise.all([
        queryInterface.addIndex('Rangers', ['departmentId'], { transaction }),
        queryInterface.addIndex('HuntingTerritories', ['rangerId'], { transaction })
      ]);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // 1. Удаляем внешний ключ из HuntingTerritories
      await queryInterface.removeConstraint(
        'HuntingTerritories', 
        'HuntingTerritories_rangerId_fkey', 
        { transaction }
      );

      // 2. Удаляем таблицу Rangers
      await queryInterface.dropTable('Rangers', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};