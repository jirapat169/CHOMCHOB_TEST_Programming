"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Cryptos", [
      {
        name: "BTC",
        rate_to_btc: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ETH",
        rate_to_btc: 0.05,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "XRP",
        rate_to_btc: 0.001,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Cryptos", null, {});
  },
};
