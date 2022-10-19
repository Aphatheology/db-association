module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [4, 15],
                msg: "Username must be minimum of 4 Chars and max of 15"
                } 
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            
        },
        phone_number: {
            type: Sequelize.STRING
        }
    });
    return User;
};

// validate: {
//     len: {
//         args: [7, 15],
//         msg: "Password must be minimum of 7 Chars and maximum 15"
//     } 
// }