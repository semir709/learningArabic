const multer = require('multer');
const path = require('path');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

module.exports = {
    isEmpty: function(object) {
        let isEmpty = true;
        for (keys in object) {
           isEmpty = false;
           break; 
        }
        return isEmpty;
    },

    folderDest: function() {
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, './public/images/');
            },
            filename: function(req, file, cb) {
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
            }
        });

        return storage;
    }
}