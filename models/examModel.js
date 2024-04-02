'use strict'
const { Exam, Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  // class Exam extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate({ Post }) {
  //     // define association here
  //     this.hasMany(Post, { foreignKey: 'examId', as: 'questions' })
  //   }

  //   toJSON() {
  //     return { ...this.get(), id: undefined }
  //   }
  // }
  const Exam = sequelize.define("exam", 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // This makes the 'id' field auto-increment
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
    },
      // {
      //   sequelize,
      //   tableName: 'exams',
      //   modelName: 'Exam',
      // }
  )
  return Exam
}