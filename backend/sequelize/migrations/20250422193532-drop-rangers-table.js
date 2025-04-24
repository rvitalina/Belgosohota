'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Проверяем существование таблицы
      const [results] = await queryInterface.sequelize.query(
        `SELECT to_regclass('"Rangers"') as table_exists`
      );
      
      if (results[0].table_exists) {
        // Удаляем все зависимые ограничения (если есть)
        await queryInterface.sequelize.query(`
          DO $$
          DECLARE
            constraint_record RECORD;
          BEGIN
            FOR constraint_record IN 
              SELECT conname AS constraint_name, 
                     conrelid::regclass AS table_name
              FROM pg_constraint
              WHERE confrelid = '"Rangers"'::regclass
            LOOP
              EXECUTE 'ALTER TABLE ' || constraint_record.table_name || 
                      ' DROP CONSTRAINT IF EXISTS ' || constraint_record.constraint_name;
            END LOOP;
          END $$;
        `, { transaction });

        // Удаляем саму таблицу
        await queryInterface.dropTable('Rangers', { transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    // Если нужно восстановить таблицу, добавьте соответствующий код здесь
    // Пример:
    /*
    await queryInterface.createTable('rangers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // ... другие поля
    });
    */
  }
};