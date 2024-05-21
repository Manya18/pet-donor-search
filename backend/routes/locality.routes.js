const Router = require('express');
const router = new Router();
const localityController = require('../controller/locality.controller');

router.get('/localities', localityController.getLocalities);

module.exports = router;