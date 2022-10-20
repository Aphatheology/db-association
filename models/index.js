require('dotenv').config()

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(`${process.env.DB_URI}`)

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