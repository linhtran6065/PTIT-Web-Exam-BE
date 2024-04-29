"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define(
    "form",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      studentMsv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      examId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      isFinish: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
  Form.associate = (models) => {
    Form.belongsTo(models.student, {
      onDelete: "CASCADE",
    });
    Form.belongsTo(models.exam, {
      onDelete: "CASCADE",
    });
    Form.hasMany(models.result);
  };
  return Form;
};
