"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define(
    "exam",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // This makes the 'id' field auto-increment
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        // //   notNull: { msg: 'User must have a name' },
        // //   notEmpty: { msg: 'Name must not be empty' },
        // },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          //   notNull: { msg: 'User must have a email' },
          //   notEmpty: { msg: 'email must not be empty' },
          //   isEmail: { msg: 'Must be a valid email address' },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          //   notNull: { msg: 'User must have a role' },
          //   notEmpty: { msg: 'role must not be empty' },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          //   notNull: { msg: 'User must have a role' },
          //   notEmpty: { msg: 'role must not be empty' },
        },
      },
      length: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          //   notNull: { msg: 'User must have a role' },
          //   notEmpty: { msg: 'role must not be empty' },
        },
      },
    }
    // {
    //   sequelize,
    //   tableName: 'exams',
    //   modelName: 'Exam',
    // }
  );
  Exam.associate = (models) => {
    Exam.hasMany(models.question);
  };
  return Exam;
};
