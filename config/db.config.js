module.exports = {
    HOST: "localhost",
    USER: "cwallet",
    PASSWORD: "123456789",
    DB: "cwallettest",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};