'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {

      // 2. Связь 1:1 HuntingCertificates -> Hunters
      await queryInterface.addConstraint('HuntingCertificates', {
        fields: ['hunterId'],
        type: 'foreign key',
        name: 'HuntingCertificates_hunterId_fkey',
        references: {
          table: 'Hunters',
          field: 'userId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        transaction
      });

      // 3. Связь 1:N WeaponPermissions -> Hunters
      await queryInterface.addConstraint('WeaponPermissions', {
        fields: ['hunterId'],
        type: 'foreign key',
        name: 'WeaponPermissions_hunterId_fkey',
        references: {
          table: 'Hunters',
          field: 'userId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        transaction
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      await Promise.all([
        queryInterface.removeConstraint('HuntingCertificates', 'HuntingCertificates_hunterId_fkey', { transaction }),
        queryInterface.removeConstraint('WeaponPermissions', 'WeaponPermissions_hunterId_fkey', { transaction })
      ]);
      
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};