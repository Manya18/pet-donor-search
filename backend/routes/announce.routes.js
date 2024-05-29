const Router = require('express');
const router = new Router();
const AnnounceController = require('../controller/announce.controller');

router.get('/announcements', AnnounceController.getAnnounceSearch);
router.get('/announcement/:id', AnnounceController.getAnnouncement);
router.get('/types', AnnounceController.getTypes);
router.get('/animaltypes', AnnounceController.getAnimalTypes);
router.get('/bloodtypes/:pet_type_id', AnnounceController.getBloodTypes);
router.get('/urgency', AnnounceController.getUrgency);
router.post('/createAnnounce', AnnounceController.createAnnounce);
router.delete('/deleteAnnounce/:id', AnnounceController.deleteAnnounce);

module.exports = router;