module.exports = {
  production: true,
  mode: "prod",
  port: 3100,
  DBConfig: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "crypto",
    dialect: "mysql",
  },
};
