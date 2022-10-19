const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

const db = require("../models");
const User = db.user;

exports.authController = {
    signUp: (req, res) => {
        const user = req.body;

        user.password = bcrypt.hashSync(user.password, 10)
        
        User.create(user)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(400).send({
                    message:
                        err.message ||
                        "Some error occurred while creating the User.",
                });
            });
    },

    signIn: (req, res) => {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then((user) => {
                if(!user) {
                    return res.status(401).send({
                        message: "Invalid username of password"
                    })
                }

                let isValidPassword = bcrypt.compareSync(req.body.password, user.password);

                if(!isValidPassword) {
                    return res.status(401).send({
                        message: "Invalid username of password"
                    })
                }
                let payLoad = {
                    id: user.id,
                    username: user.username
                }
                let token = sign(payLoad, authConfig.secretKey, {
                    expiresIn: 36000
                });

                res.status(200).send({
                    accessToken: token 
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while creating the User.",
                });
            });
    },

    forgotPassword: (req, res) => {
        const id = req.params.id;
    
        User.findByPk(id)
            .then((data) => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find User with id=${id}.`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error retrieving User with id=" + id,
                });
            });
    }
}
