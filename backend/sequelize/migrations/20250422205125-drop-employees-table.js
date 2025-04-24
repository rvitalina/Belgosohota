'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // 1. Проверяем существование таблицы
      const [results] = await queryInterface.sequelize.query(
        `SELECT to_regclass('"Employees"') as table_exists`
      );
      
      if (!results[0].table_exists) {
        await transaction.commit();
        return;
      }

      // 2. Удаляем конкретные внешние ключи в зависимых таблицах
      await Promise.all([
        queryInterface.removeConstraint(
          'NewsItems', 
          'NewsItems_employeeId_fkey', 
          { transaction }
        ),
        queryInterface.removeConstraint(
          'CurrentEvents', 
          'CurrentEvents_employeeId_fkey', 
          { transaction }
        )
      ]);

      // 3. Удаляем связь с Departments (если есть)
      await queryInterface.sequelize.query(`
        ALTER TABLE "Employees" 
        DROP CONSTRAINT IF EXISTS "Employees_departmentId_fkey"
      `, { transaction });

      // 4. Удаляем саму таблицу
      await queryInterface.dropTable('Employees', { transaction });

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
      // 1. Воссоздаем таблицу Employees (базовая структура)
      await queryInterface.createTable('Employees', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        departmentId: {
          type: Sequelize.INTEGER,
          allowNull: true
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

      // 2. Восстанавливаем связи
      await Promise.all([
        // Связь с Departments
        queryInterface.addConstraint('Employees', {
          fields: ['departmentId'],
          type: 'foreign key',
          name: 'Employees_departmentId_fkey',
          references: {
            table: 'Departments',
            field: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
          transaction
        }),

        // Связи в зависимых таблицах
        queryInterface.addConstraint('NewsItems', {
          fields: ['employeeId'],
          type: 'foreign key',
          name: 'NewsItems_employeeId_fkey',
          references: {
            table: 'Employees',
            field: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
          transaction
        }),

        queryInterface.addConstraint('CurrentEvents', {
          fields: ['employeeId'],
          type: 'foreign key',
          name: 'CurrentEvents_employeeId_fkey',
          references: {
            table: 'Employees',
            field: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
          transaction
        })
      ]);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error('Migration rollback error:', error);
      throw error;
    }
  }
};