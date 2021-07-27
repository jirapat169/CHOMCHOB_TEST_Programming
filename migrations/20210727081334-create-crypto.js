"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Cryptos",
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        rate_to_btc: {
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Cryptos");
  },
};
