"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("results", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      formId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "forms",
          key: "id",
          as: "formId",
        },
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "questions",
          key: "id",
          as: "questionId",
        },
      },
      answerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "answers",
          key: "id",
          as: "answerId",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("results");
  },
};
