const Router = require('express');
const router = new Router();
const organisationController = require('../controller/organisation.controller');

router.get('/organisationID/:id', organisationController.getOrganisationForUser);

module.exports = router;