"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define("exam", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  Exam.associate = (models) => {
    Exam.hasMany(models.question);
    Exam.hasMany(models.form);
  };
  return Exam;
};
