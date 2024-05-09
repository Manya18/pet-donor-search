const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

router.post('/user', userController.creatUser);
router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;