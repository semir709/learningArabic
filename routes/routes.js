const express = require('express');
const router = express.Router();
const main = require('../controllers/main');
const admin = require('../controllers/admin');

router.get('/', main.home);
router.get('/home', main.home);
router.get('/all', main.all_words);

router.get('/login', admin.getLogin);

router.get('/admin', admin.getAdmin);
router.post('/admin/save', admin.save_admin);

router.get('/admin/allWords', admin.getAllWords);
router.get('/admin/allWords/getData', admin.getData);
router.delete('/admin/allWords/delete', admin.delete);

module.exports = router;