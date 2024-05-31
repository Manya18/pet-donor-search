const Router = require('express');
const router = new Router();
const petController = require('../controller/pet.controller');

router.post('/pet', petController.createPet);
router.get('/pets/:id', petController.getPets);
router.get('/pet/:id', petController.getPet);
router.put('/pet/:id', petController.updatePet);
router.delete('/pet/:id', petController.deletePet);

module.exports = router;