"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Characters", "PhotoId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Character_Images",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("Characters", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Characters", "PhotoId");
    await queryInterface.removeColumn("Characters", "UserId");
  },
};
