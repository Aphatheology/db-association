var express = require('express');
var router = express.Router();
const { clubController } = require('../controllers/club.controller');


router.get('/', clubController.findAll);

router.get('/:id', clubController.findOne);

router.put('/:id', clubController.update);

router.delete('/:id', clubController.delete)

router.post('/', clubController.create)

module.exports = router;
