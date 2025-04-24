'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // 1. Удаляем зависимые внешние ключи
      await queryInterface.sequelize.query(`
        DO $$
        DECLARE
          r record;
        BEGIN
          FOR r IN 
            SELECT conname, conrelid::regclass AS table_name
            FROM pg_constraint
            WHERE confrelid = 'Hunters'::regclass
          LOOP
            EXECUTE 'ALTER TABLE ' || r.table_name || 
                    ' DROP CONSTRAINT IF EXISTS ' || r.conname;
          END LOOP;
        END $$;
      `, { transaction });

      // 2. Добавляем временный userId (пока без ограничений)
      await queryInterface.addColumn('Hunters', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: true
      }, { transaction });

      // 3. Заполняем userId (пример - адаптируйте под вашу логику)
      await queryInterface.sequelize.query(`
        UPDATE "Hunters" SET "userId" = "id";
      `, { transaction });

      // 4. Удаляем старый первичный ключ
      await queryInterface.removeConstraint('Hunters', 'Hunters_pkey', { transaction });

      // 5. Удаляем старый столбец id
      await queryInterface.removeColumn('Hunters', 'id', { transaction });

      // 6. Делаем userId NOT NULL и PRIMARY KEY
      await queryInterface.changeColumn('Hunters', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      }, { transaction });

      // 7. Добавляем внешний ключ на Users
      await queryInterface.addConstraint('Hunters', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'Hunters_userId_fkey',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        transaction
      });

      // 8. Добавляем поле location (PostGIS)
      await queryInterface.addColumn('Hunters', 'location', {
        type: Sequelize.GEOGRAPHY('POINT'),
        allowNull: true
      }, { transaction });

      // 9. Восстанавливаем зависимые внешние ключи
      await queryInterface.sequelize.query(`
        ALTER TABLE "WeaponPermissions" 
        ADD CONSTRAINT "WeaponPermissions_hunterId_fkey" 
        FOREIGN KEY ("hunterId") REFERENCES "Hunters" ("userId") 
        ON UPDATE CASCADE ON DELETE CASCADE;
        
        -- Повторите для других таблиц
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
      // 1. Удаляем новые зависимости
      await queryInterface.sequelize.query(`
        DO $$
        DECLARE
          r record;
        BEGIN
          FOR r IN 
            SELECT conname, conrelid::regclass AS table_name
            FROM pg_constraint
            WHERE confrelid = 'Hunters'::regclass
            AND conname != 'Hunters_pkey'
          LOOP
            EXECUTE 'ALTER TABLE ' || r.table_name || 
                    ' DROP CONSTRAINT IF EXISTS ' || r.conname;
          END LOOP;
        END $$;
      `, { transaction });

      // 2. Удаляем location
      await queryInterface.removeColumn('Hunters', 'location', { transaction });

      // 3. Добавляем обратно старый id
      await queryInterface.addColumn('Hunters', 'id', {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }, { transaction });

      // 4. Заполняем старый id (пример)
      await queryInterface.sequelize.query(`
        UPDATE "Hunters" SET "id" = "userId";
      `, { transaction });

      // 5. Удаляем userId
      await queryInterface.removeColumn('Hunters', 'userId', { transaction });

      // 6. Восстанавливаем старые внешние ключи
      await queryInterface.sequelize.query(`
        ALTER TABLE "WeaponPermissions" 
        ADD CONSTRAINT "WeaponPermissions_hunterId_fkey" 
        FOREIGN KEY ("hunterId") REFERENCES "Hunters" ("id") 
        ON UPDATE CASCADE ON DELETE CASCADE;
        
        -- Повторите для других таблиц
      `, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};