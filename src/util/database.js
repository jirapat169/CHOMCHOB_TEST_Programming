import Sequelize from "sequelize";
const env = require(`../environments/${process.env.APP_ENV}`);

const sequelize = new Sequelize(
  env.DBConfig.DB,
  env.DBConfig.USER,
  env.DBConfig.PASSWORD,
  {
    host: env.DBConfig.HOST,
    dialect: env.DBConfig.dialect,
  }
);

const DB = { sequelize, Sequelize };

export default DB;
