"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Wallets",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "Users",
            key: "username",
          },
        },
        crypto_name: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "Cryptos",
            key: "name",
          },
        },
        amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
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
    await queryInterface.addIndex("Wallets", ["username", "crypto_name"], {
      unique: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Wallets");
  },
};
