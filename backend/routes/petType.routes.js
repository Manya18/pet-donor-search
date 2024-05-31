const Router = require('express');
const router = new Router();
const petTypeController = require('../controller/petType.controller');

router.get('/petTypes', petTypeController.getPetTypes);

module.exports = router;