const router = require('express').Router();
const { getProjects } = require('./dashboard');

router.use('/', getProjects);

module.exports = router;

