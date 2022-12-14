"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Bulk inserting the 6 Character Images into the character_images table in the database
    await queryInterface.bulkInsert("Character_Images", [
      {
        name: "Character 1",
        image_url:
          "https://drive.google.com/uc?export=view&id=1gOaSw_IicT6tBrW03WpLzXmMcNQV6PLl",
        createdAt: "2022-12-13",
        updatedAt: "2022-12-13",
      },
      {
        name: "Character 2",
        image_url:
          "https://drive.google.com/uc?export=view&id=14YMy4HF_wJ04J9EntAZfn-z3J56uDUlf",
        createdAt: "2022-12-13",
        updatedAt: "2022-12-13",
      },
      {
        name: "Character 3",
        image_url:
          "https://drive.google.com/uc?export=view&id=1F5lA1OiNMyX3q5H9wdN9ifeLRTJ49bVQ",
        createdAt: "2022-12-13",
        updatedAt: "2022-12-13",
      },
      {
        name: "Character 4",
        image_url:
          "https://drive.google.com/uc?export=view&id=1XczAzUJQmLc-kbeiB-AvB-G7oszl9v_J",
        createdAt: "2022-12-13",
        updatedAt: "2022-12-13",
      },
      {
        name: "Character 5",
        image_url:
          "https://drive.google.com/uc?export=view&id=1nE1m8GjEqh7JHEQ_wf_OfazZB2rciotX",
        createdAt: "2022-12-13",
        updatedAt: "2022-12-13",
      },
      {
        name: "Character 6",
        image_url:
          "https://drive.google.com/uc?export=view&id=1FPJu7QqdGAThtE6WdHcsmVNsXail8kTr",
        createdAt: "2022-12-13",
        updatedAt: "2022-12-13",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Character_Images", null, {});
  },
};
