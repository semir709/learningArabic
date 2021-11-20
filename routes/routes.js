const express = require('express');
const router = express.Router();
const main = require('../controllers/main');

router.get('/', main.home);

module.exports = router;