const Router = require('express');
const router = new Router();
const breedController = require('../controller/breed.controller');

router.get('/breeds/:id', breedController.getBreeds);

module.exports = router;