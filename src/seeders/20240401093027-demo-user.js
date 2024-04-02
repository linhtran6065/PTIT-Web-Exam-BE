"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("12345678", 10);
    return queryInterface.bulkInsert("users", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "1@gmail.com",
        password: hashedPassword,
        isAdmin: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
