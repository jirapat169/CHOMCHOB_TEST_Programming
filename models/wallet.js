"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Crypto, { foreignKey: "crypto_name" });
      this.belongsTo(models.User, { foreignKey: "username" });
    }
  }
  Wallet.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      crypto_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Wallet",
      indexes: [
        {
          unique: true,
          fields: ["username", "crypto_name"],
        },
      ],
    }
  );
  return Wallet;
};
