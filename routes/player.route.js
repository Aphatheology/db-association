var express = require('express');
var router = express.Router();
const { playerController } = require('../controllers/player.controller');


router.get('/', playerController.findAll);

router.get('/:id', playerController.findOne);

router.put('/:id', playerController.update);

router.delete('/:id', playerController.delete)

router.post('/', playerController.create)

module.exports = router;
