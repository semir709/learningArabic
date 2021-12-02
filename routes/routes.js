const express = require('express');
const router = express.Router();
const main = require('../controllers/main');
const admin = require('../controllers/admin');

router.get('/', main.home);
router.get('/home', main.home);
router.get('/all', main.all_words);

router.get('/login', admin.getLogin);
router.get('/admin', admin.getAdmin);
router.get('/admin/allWords', admin.getAllWords);

module.exports = router;