const multer = require('multer');
// const custom = require('../config/custom')
// const upload = multer({storage:custom.folderDest()});

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

router.get('/admin/allWords', admin.getAll);
router.get("/admin/allWords/category_reload", admin.reload_category);
router.get('/admin/allWords/getData', admin.getData);
router.get('/admin/allWords/getCategory', admin.reload_category);
router.delete('/admin/allWords/delete', admin.delete);

router.delete('/admin/allWords/modal/delete', admin.deleteModal);
router.post('/admin/allWords/modal/update', admin.updateModal);

module.exports = router;