import DB from "./../util/database";

const Crypto = DB.sequelize.define("crypto", {
  name: {
    type: DB.Sequelize.STRING(10),
    allowNull: false,
    primaryKey: true,
    comment: "name_of_cryptocurrency",
  },
  rate_to_btc: {
    type: DB.Sequelize.FLOAT,
    allowNull: false,
    comment: "exchange_rate_to_BTC",
  },
});

export default Crypto;
