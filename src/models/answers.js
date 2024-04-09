"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define("answer", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
    },
  });
  Answer.associate = (models) => {
    Answer.belongsTo(models.question);
    Answer.hasMany(models.result);
  };
  return Answer;
};
