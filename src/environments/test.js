module.exports = {
  production: false,
  mode: "test",
  port: 3100,
  DBConfig: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "crypto_test",
    dialect: "mysql",
  },
};
