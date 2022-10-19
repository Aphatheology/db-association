module.exports = (sequelize, Sequelize) => {
    const Coach = sequelize.define("coach", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        coach_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        coach_country: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    })
    return Coach;
}