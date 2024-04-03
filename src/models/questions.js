"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "question",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // This makes the 'id' field auto-increment
      },

      examId: {
        type: DataTypes.INTEGER,
        // defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
    // {
    //   sequelize,
    //   tableName: 'questions',
    //   modelName: 'Question',
    // }
  );
  Question.associate = (models) => {
    Question.belongsTo(models.exam);
    Question.hasMany(models.answer);
  };

  return Question;
};
