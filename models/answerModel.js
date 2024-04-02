'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  
  const Answer = sequelize.define("answer", 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // This makes the 'id' field auto-increment
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
   
      },
      questionId: {
        type: DataTypes.INTEGER,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN
      },
    
   
    })
  return Answer
}