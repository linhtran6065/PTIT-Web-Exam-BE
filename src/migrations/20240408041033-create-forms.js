"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("forms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentMsv: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "students",
          key: "msv",
          as: "studentMsv",
        },
      },
      examId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "exams",
          key: "id",
          as: "examId",
        },
      },
      score: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      isFinish: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("forms");
  },
};
