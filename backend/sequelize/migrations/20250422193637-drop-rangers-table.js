'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // 1. Проверяем существование таблицы
      const [results] = await queryInterface.sequelize.query(
        `SELECT to_regclass('"Rangers"') as table_exists`
      );
      
      if (!results[0].table_exists) {
        await transaction.commit();
        return; // Таблица не существует, выходим
      }

      // 2. Удаляем конкретное ограничение в HuntingTerritories
      await queryInterface.sequelize.query(`
        ALTER TABLE "HuntingTerritories" 
        DROP CONSTRAINT IF EXISTS "HuntingTerritories_rangerId_fkey"
      `, { transaction });

      // 3. Удаляем другие возможные зависимости
      await queryInterface.sequelize.query(`
        DO $$
        DECLARE
          r record;
        BEGIN
          FOR r IN 
            SELECT conname as constraint_name,
                   conrelid::regclass as table_name
            FROM pg_constraint
            WHERE confrelid = '"Rangers"'::regclass
            AND conname != 'HuntingTerritories_rangerId_fkey'
          LOOP
            EXECUTE 'ALTER TABLE ' || r.table_name || 
                    ' DROP CONSTRAINT IF EXISTS ' || r.constraint_name;
          END LOOP;
        END $$;
      `, { transaction });

      // 4. Удаляем саму таблицу
      await queryInterface.dropTable('Rangers', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    // Логика восстановления таблицы (пример)
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      await queryInterface.createTable('Rangers', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        // ... другие поля таблицы Rangers
      }, { transaction });

      // Восстанавливаем внешние ключи
      await queryInterface.sequelize.query(`
        ALTER TABLE "HuntingTerritories"
        ADD CONSTRAINT "HuntingTerritories_rangerId_fkey"
        FOREIGN KEY ("rangerId") REFERENCES "Rangers" ("id")
        ON DELETE SET NULL ON UPDATE CASCADE;
      `, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};