const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.club = require("./club.model.js")(sequelize, Sequelize);
db.coach = require("./coach.model.js")(sequelize, Sequelize);
db.player = require("./player.model.js")(sequelize, Sequelize);

// One to One relationship
db.club.hasOne(db.coach);
db.coach.belongsTo(db.club);

// One to Many relationship
db.club.hasMany(db.player);
db.player.belongsTo(db.club);

// Many to Many relationship

module.exports = db;