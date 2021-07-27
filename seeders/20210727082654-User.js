"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        name: "Administrator",
        email: "admin@crypto.com",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user1",
        name: "User Person1",
        email: "user1@crypto.com",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user2",
        name: "User Person2",
        email: "user2@crypto.com",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
