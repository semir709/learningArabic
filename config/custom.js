const multer = require('multer');

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
                cb(null, file.originalname);
            }
        });

        return storage;
    }
}