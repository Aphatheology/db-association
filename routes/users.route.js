var express = require('express');
var router = express.Router();
const {userController} = require('../controllers/user.controller');

router.get('/', userController.findAll);

router.get('/:id', userController.findOne);

router.put('/:id', userController.update);

router.delete('/:id', userController.delete)

router.post('/', userController.create)

module.exports = router;
