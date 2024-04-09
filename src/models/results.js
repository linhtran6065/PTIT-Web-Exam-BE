"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define(
    "result",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      formId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      answerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  Result.associate = (models) => {
    Result.belongsTo(models.form, {
      onDelete: "CASCADE",
    });
    Result.belongsTo(models.question, {
      onDelete: "CASCADE",
    });
    Result.belongsTo(models.answer, {
      onDelete: "CASCADE",
    });
  };
  return Result;
};
