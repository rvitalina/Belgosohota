'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Функция для проверки существования ограничения
      const constraintExists = async (tableName, constraintName) => {
        const [results] = await queryInterface.sequelize.query(
          `SELECT 1 FROM pg_constraint WHERE conname = '${constraintName}'`
        );
        return results.length > 0;
      };

      // 1. Связи для HunterPermissions
      if (!await constraintExists('HunterPermissions', 'HunterPermissions_hunterId_fkey')) {
        await queryInterface.addConstraint('HunterPermissions', {
          fields: ['hunterId'],
          type: 'foreign key',
          name: 'HunterPermissions_hunterId_fkey',
          references: {
            table: 'Hunters',
            field: 'userId'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction
        });
      }

      if (!await constraintExists('HunterPermissions', 'HunterPermissions_permissionId_fkey')) {
        await queryInterface.addConstraint('HunterPermissions', {
          fields: ['permissionId'],
          type: 'foreign key',
          name: 'HunterPermissions_permissionId_fkey',
          references: {
            table: 'Permissions',
            field: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction
        });
      }

      // 2. Связи для HunterHistories
      if (!await constraintExists('HunterHistories', 'HunterHistories_hunterId_fkey')) {
        await queryInterface.addConstraint('HunterHistories', {
          fields: ['hunterId'],
          type: 'foreign key',
          name: 'HunterHistories_hunterId_fkey',
          references: {
            table: 'Hunters',
            field: 'userId'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction
        });
      }

      if (!await constraintExists('HunterHistories', 'HunterHistories_courseId_fkey')) {
        await queryInterface.addConstraint('HunterHistories', {
          fields: ['courseId'],
          type: 'foreign key',
          name: 'HunterHistories_courseId_fkey',
          references: {
            table: 'Courses',
            field: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction
        });
      }

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
      // Удаляем только существующие ограничения
      await Promise.all([
        queryInterface.sequelize.query(
          `ALTER TABLE "HunterPermissions" 
           DROP CONSTRAINT IF EXISTS "HunterPermissions_hunterId_fkey"`,
          { transaction }
        ),
        queryInterface.sequelize.query(
          `ALTER TABLE "HunterPermissions" 
           DROP CONSTRAINT IF EXISTS "HunterPermissions_permissionId_fkey"`,
          { transaction }
        ),
        queryInterface.sequelize.query(
          `ALTER TABLE "HunterHistories" 
           DROP CONSTRAINT IF EXISTS "HunterHistories_hunterId_fkey"`,
          { transaction }
        ),
        queryInterface.sequelize.query(
          `ALTER TABLE "HunterHistories" 
           DROP CONSTRAINT IF EXISTS "HunterHistories_courseId_fkey"`,
          { transaction }
        )
      ]);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error('Migration rollback error:', error);
      throw error;
    }
  }
};