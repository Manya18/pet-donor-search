const Router = require('express');
const router = new Router();
const AnnounceController = require('../controller/announce.controller');

router.get('/announce/:id', AnnounceController.getAnnounceSearch);

module.exports = router;