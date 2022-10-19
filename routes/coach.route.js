var express = require('express');
var router = express.Router();
const { coachController } = require('../controllers/coach.controller');


router.get('/', coachController.findAll);

router.get('/:id', coachController.findOne);

router.put('/:id', coachController.update);

router.delete('/:id', coachController.delete)

router.post('/', coachController.create)

module.exports = router;
