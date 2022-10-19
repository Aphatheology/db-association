const db = require("../models");
const Club = db.club;

exports.clubController = {
    create: (req, res) => {
        const { club_name, club_country } = req.body;
        if (!club_name || !club_country ) {
            res.status(400).send({
                message: "Field can not be empty!",
            });
            return;
        }
    
        // Create a Club
        const club = {
            club_name,
            club_country
        };
    
        // Save Club in the database
        Club.create(club)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while creating the Club.",
                });
            });
    },

    findAll: (req, res) => {
        Club.findAll()
            .then((data) => res.send(data))
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while creating the Club.",
                });
            });
    },

    findOne: (req, res) => {
        const id = req.params.id;
    
        Club.findByPk(id)
            .then((data) => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find Club with id=${id}.`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error retrieving Club with id=" + id,
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
    
        Club.update(req.body, { where: { id } })
            .then((feedbackArray) => {
                if (feedbackArray[0] == 1) {
                    Club.findByPk(id)
                        .then((data) => {
                            res.send({
                                message: "Club was updated successfully.",
                                user: data,
                            });
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: "Error retrieving Club with id=" + id,
                            });
                        });
                } else {
                    res.status(400).send({
                        message: "Club with id=" + id + " does not exist!",
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error updating Club with id=" + id,
                });
            });
    },

    delete: (req, res) => {
        const id = req.params.id;
    
        Club.destroy({
            where: { id: id },
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: "Club was deleted successfully!",
                    });
                } else {
                    res.send({
                        message: `Club with id=${id} not found!`,
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
