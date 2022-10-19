module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("player", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        player_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        player_number: {
            type: Sequelize.INTEGER
        }
    })
    return Player;
}