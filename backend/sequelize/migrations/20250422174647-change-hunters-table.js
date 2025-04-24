'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // 1. Удаляем все зависимые внешние ключи автоматически
      await queryInterface.sequelize.query(`
        DO $$
        DECLARE
          constraint_record RECORD;
        BEGIN
          FOR constraint_record IN 
            SELECT conname AS constraint_name, 
                   conrelid::regclass AS table_name
            FROM pg_constraint
            WHERE confrelid = '"Hunters"'::regclass
          LOOP
            EXECUTE 'ALTER TABLE ' || constraint_record.table_name || 
                    ' DROP CONSTRAINT IF EXISTS ' || constraint_record.constraint_name;
          END LOOP;
        END $$;
      `, { transaction });

      // 2. Удаляем саму таблицу
      await queryInterface.dropTable('Hunters', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Воссоздаём таблицу (адаптируйте под вашу исходную структуру)
      await queryInterface.createTable('Hunters', {
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
        patronymic: {
          type: Sequelize.STRING,
          allowNull: true
        },
        birthDate: {
          type: Sequelize.DATEONLY,
          allowNull: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
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

      // Здесь можно добавить восстановление индексов и внешних ключей

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};