"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Wallet }) {
      this.hasMany(Wallet, { foreignKey: "username" });
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["admin", "user"]],
            msg: "Must be Admin or User",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      indexes: [
        {
          unique: true,
          fields: ["username"],
        },
      ],
    }
  );
  return User;
};
