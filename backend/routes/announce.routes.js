const Router = require('express');
const router = new Router();
const AnnounceController = require('../controller/announce.controller');

router.get('/announce', AnnounceController.getAnnounceSearch);
router.get('/announce/:id', AnnounceController.getAnnouncement);
router.get('/animaltypes', AnnounceController.getAnimalTypes);
router.get('/urgency', AnnounceController.getUrgency);




module.exports = router;