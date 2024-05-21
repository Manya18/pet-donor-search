const Router = require('express');
const router = new Router();
const AdviseController = require('../controller/advise.controller')

router.post('/createAdvise', AdviseController.createAdvise);
router.get('/advise', AdviseController.getAdvises);
router.get('/deleteAdvise/:id', AdviseController.deleteAdvise);
router.put('/updateAdvise/:id', AdviseController.updateAdvise);

module.exports = router;