const Router = require('express');
const router = new Router();
const EventController = require('../controller/event.controller');

router.post('/createEvent', EventController.createEvent);
router.get('/events', EventController.getEvents);
router.get('/deletePost/:id', EventController.deleteEvent);
router.put('/updatePost/:id', EventController.updateEvent);

module.exports = router;