'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Удаляем все зависимые внешние ключи
      await Promise.all([
        queryInterface.removeConstraint('WeaponPermissions', 'WeaponPermissions_hunterId_fkey', { transaction }),
        queryInterface.removeConstraint('HunterHistories', 'HunterHistories_hunterId_fkey', { transaction }),
        queryInterface.removeConstraint('BookingComplexes', 'BookingComplexes_hunterId_fkey', { transaction }),
        queryInterface.removeConstraint('HunterPermissions', 'HunterPermissions_hunterId_fkey', { transaction }),
        queryInterface.removeConstraint('HuntingCertificates', 'HuntingCertificates_hunterId_fkey', { transaction })
      ]);

      // Если нужно также удалить первичный ключ Hunters
      // await queryInterface.removeConstraint('Hunters', 'Hunters_pkey', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Восстанавливаем все внешние ключи
      await Promise.all([
        queryInterface.addConstraint('WeaponPermissions', {
          fields: ['hunterId'],
          type: 'foreign key',
          name: 'WeaponPermissions_hunterId_fkey',
          references: {
            table: 'Hunters',
            field: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction
        }),
        queryInterface.addConstraint('HunterHistories', {
          fields: ['hunterId'],
          type: 'foreign key',
          name: 'HunterHistories_hunterId_fkey',
          references: {
            table: 'Hunters',
            field: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction
        }),
        queryInterface.addConstraint('BookingComplexes', {
          fields: ['hunterId'],
          type: 'foreign key',
          name: 'BookingComplexes_hunterId_fkey',
          references: {
            table: 'Hunters',
            field: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction
        }),
        queryInterface.addConstraint('HunterPermissions', {
          fields: ['hunterId'],
          type: 'foreign key',
          name: 'HunterPermissions_hunterId_fkey',
          references: {
            table: 'Hunters',
            field: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction
        }),
        queryInterface.addConstraint('HuntingCertificates', {
          fields: ['hunterId'],
          type: 'foreign key',
          name: 'HuntingCertificates_hunterId_fkey',
          references: {
            table: 'Hunters',
            field: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction
        })
      ]);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};