const db = require("../models");
const Player = db.player;

exports.playerController = {
    create: (req, res) => {
        const { player_name, player_country } = req.body;
        if (!player_name || !player_country ) {
            res.status(400).send({
                message: "Field can not be empty!",
            });
            return;
        }
    
        // Create a Player
        const player = {
            ...req.body
        };
    
        // Save Player in the database
        Player.create(player)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while creating the Player.",
                });
            });
    },

    findAll: (req, res) => {
        Player.findAll()
            .then((data) => res.send(data))
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while creating the Player.",
                });
            });
    },

    findOne: (req, res) => {
        const id = req.params.id;
    
        Player.findByPk(id)
            .then((data) => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find Player with id=${id}.`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error retrieving Player with id=" + id,
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
    
        Player.update(req.body, { where: { id } })
            .then((feedbackArray) => {
                if (feedbackArray[0] == 1) {
                    Player.findByPk(id)
                        .then((data) => {
                            res.send({
                                message: "Player was updated successfully.",
                                user: data,
                            });
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: "Error retrieving Player with id=" + id,
                            });
                        });
                } else {
                    res.status(400).send({
                        message: "Player with id=" + id + " does not exist!",
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error updating Player with id=" + id,
                });
            });
    },

    delete: (req, res) => {
        const id = req.params.id;
    
        Player.destroy({
            where: { id: id },
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: "Player was deleted successfully!",
                    });
                } else {
                    res.send({
                        message: `Player with id=${id} not found!`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Internal Error. Could not delete Player with id=" + id,
                });
            });
    }
}
