const Router = require('express');
const router = new Router();
const bloodTypeController = require('../controller/bloodType.controller');

router.get('/bloodTypes/:id', bloodTypeController.getBloodTypes);

module.exports = router;