"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Wallets", [
      {
        username: "user1",
        crypto_name: "BTC",
        amount: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user1",
        crypto_name: "ETH",
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user2",
        crypto_name: "ETH",
        amount: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Wallets", null, {});
  },
};
