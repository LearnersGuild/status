const router = require('express').Router();
const { getProjects } = require('./dashboard');

router.use('/dashboard', getProjects);

module.exports = router;

