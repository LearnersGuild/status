const router = require('express').Router();
const dashboard = require('./dashboard');

router.use('/', dashboard);

module.exports = router;

