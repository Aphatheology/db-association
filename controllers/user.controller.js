const db = require("../models");
const User = db.user;

exports.userController = {
    create: (req, res) => {
        // const { firstname, lastname, email, username } = req.body;
        // if (!firstname || !lastname || !email || !username) {
        //     res.status(400).send({
        //         message: "Field can not be empty!",
        //     });
        //     return;
        // }
    
        // Create a User
        const user = req.body;
    
        // Save User in the database
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

    findAll: (req, res) => {
        User.findAll()
            .then((data) => res.send(data))
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while creating the User.",
                });
            });
    },

    findOne: (req, res) => {
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
    },

    update: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: "Field can not be empty!",
            });
            return;
        }
    
        const id = req.params.id;
    
        User.update(req.body, { where: { id } })
            .then((feedbackArray) => {
                if (feedbackArray[0] == 1) {
                    User.findByPk(id)
                        .then((data) => {
                            res.send({
                                message: "User was updated successfully.",
                                user: data,
                            });
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: "Error retrieving User with id=" + id,
                            });
                        });
                } else {
                    res.status(400).send({
                        message: "User with id=" + id + " does not exist!",
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error updating User with id=" + id,
                });
            });
    },

    delete: (req, res) => {
        const id = req.params.id;
    
        User.destroy({
            where: { id: id },
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: "User was deleted successfully!",
                    });
                } else {
                    res.send({
                        message: `User with id=${id} not found!`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Internal Error. Could not delete User with id=" + id,
                });
            });
    }
}
