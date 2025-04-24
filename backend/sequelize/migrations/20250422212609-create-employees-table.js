'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // 1. Создаем таблицу Employees
      await queryInterface.createTable('Employees', {
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
          allowNull: false,
          references: {
            model: 'Departments',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
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

      // 2. Восстанавливаем связи с зависимыми таблицами
      await Promise.all([
        // Связь с CurrentEvents
        queryInterface.addConstraint('CurrentEvents', {
          fields: ['employeeId'],
          type: 'foreign key',
          name: 'CurrentEvents_employeeId_fkey',
          references: {
            table: 'Employees',
            field: 'userId'  // Ссылаемся на userId в Employees
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
          transaction
        }),

        // Связь с NewsItems
        queryInterface.addConstraint('NewsItems', {
          fields: ['employeeId'],
          type: 'foreign key',
          name: 'NewsItems_employeeId_fkey',
          references: {
            table: 'Employees',
            field: 'userId'  // Ссылаемся на userId в Employees
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
          transaction
        })
      ]);

      // 3. Добавляем индексы для ускорения запросов
      await Promise.all([
        queryInterface.addIndex('Employees', ['departmentId'], { transaction }),
        queryInterface.addIndex('CurrentEvents', ['employeeId'], { transaction }),
        queryInterface.addIndex('NewsItems', ['employeeId'], { transaction })
      ]);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error('Migration error:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // 1. Удаляем связи с зависимыми таблицами
      await Promise.all([
        queryInterface.removeConstraint('CurrentEvents', 'CurrentEvents_employeeId_fkey', { transaction }),
        queryInterface.removeConstraint('NewsItems', 'NewsItems_employeeId_fkey', { transaction })
      ]);

      // 2. Удаляем саму таблицу Employees
      await queryInterface.dropTable('Employees', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error('Migration rollback error:', error);
      throw error;
    }
  }
};