"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Users",
      {
        username: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        role: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        charset: "utf8",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
