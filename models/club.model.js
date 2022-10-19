module.exports = (sequelize, Sequelize) => {
    const Club = sequelize.define("club", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        club_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        club_country: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    })
    return Club;
}

// insert into clubs (club_name, club_country, createdAt, updatedAt) value("anon fc", "nigeria", "2022-10-17", "2022-10-17");