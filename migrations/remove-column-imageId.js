"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Votes', 'ImageId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Votes', 'ImageId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Character_Images',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
};







