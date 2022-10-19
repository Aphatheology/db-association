const db = require("../models");
const Coach = db.coach;

exports.coachController = {
    create: (req, res) => {
        const { coach_name, coach_country } = req.body;
        if (!coach_name || !coach_country ) {
            res.status(400).send({
                message: "Field can not be empty!",
            });
            return;
        }
    
        // Create a Coach
        const coach = {
            ...req.body
        };
    
        // Save Coach in the database
        Coach.create(coach)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while creating the Coach.",
                });
            });
    },

    findAll: (req, res) => {
        Coach.findAll()
            .then((data) => res.send(data))
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while creating the Coach.",
                });
            });
    },

    findOne: (req, res) => {
        const id = req.params.id;
    
        Coach.findByPk(id)
            .then((data) => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find Coach with id=${id}.`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error retrieving Coach with id=" + id,
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
    
        Coach.update(req.body, { where: { id } })
            .then((feedbackArray) => {
                if (feedbackArray[0] == 1) {
                    Coach.findByPk(id)
                        .then((data) => {
                            res.send({
                                message: "Coach was updated successfully.",
                                user: data,
                            });
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: "Error retrieving Coach with id=" + id,
                            });
                        });
                } else {
                    res.status(400).send({
                        message: "Coach with id=" + id + " does not exist!",
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error updating Coach with id=" + id,
                });
            });
    },

    delete: (req, res) => {
        const id = req.params.id;
    
        Coach.destroy({
            where: { id: id },
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: "Coach was deleted successfully!",
                    });
                } else {
                    res.send({
                        message: `Coach with id=${id} not found!`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Internal Error. Could not delete Coach with id=" + id,
                });
            });
    }
}
