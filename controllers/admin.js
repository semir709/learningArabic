const db = require("../config/database.js");
const custom = require("../config/custom.js");

const multer = require('multer');


module.exports = {
    getLogin: function(req, res) {
        res.render('login.ejs');
    },
    getAdmin: async function(req, res) {
        const con = db.getCon();

        const name_category = await con.promise().query('SELECT _name FROM category');
        const grammar = await con.promise().query('SELECT grammar FROM words');

        const data = {
            all_category: name_category[0],
            all_grammar: grammar[0]
        }

        res.render('admin.ejs', data);
    },

    getAll: async function(req, res) {
        const con = db.getCon();
        const name_category = await con.promise().query('SELECT _name FROM category');

        //const words = await con.promise().query('SELECT arabic, bosnian, english, grammar FROM words WHERE category_id = ')

        const data = {
            all_category: name_category[0]
        }


        res.render('all_words_admin.ejs', data);
    },

    getData: async function(req, res) {
        const con = db.getCon();
        const category_name = req.query.name;

        console.log(category_name, 'category');

        const category = await con.promise().query('SELECT id FROM category WHERE _name = ?', [category_name]).then(db_data => {

            if(db_data[0].length <= 0) {
                return 'none';
            }
            else {
                return db_data[0][0].id;
            }
        });

        const id = category;
        let obj;    

        if(id === 'none') {
            obj = 'empty';
        } else {
            const data = await con.promise().query("SELECT id, arabic, bosnian, english, grammar, grammar_meaning FROM words WHERE category_id = ?", [id]);
            obj = data[0];
        }

        console.log(obj);

        res.render('partials/list_words.ejs', {data:obj});
    },

    delete: async function(req, res) {
        const con = db.getCon();
        const category_name = req.query.name;

        await con.promise().query('DELETE FROM category WHERE _name = ?', [category_name]);

        
        res.send('/admin/allWords');
    },

    deleteModal: async function(req, res) {
        const con = db.getCon();
        const id = req.body.id;
        let isDelete;

        console.log(id);

        await con.promise().query("DELETE FROM words WHERE id = ? ", [id])
        .then(d => {
            if(d) isDelete = true;
        })
        .catch(err => {
            if(err) isDelete = false;
        });

        res.send(isDelete);

    },

    save_admin: async function(req, res) {
        const data = req.body;
        const con = db.getCon();


        let msg;

 
        if(typeof req.multerErr === 'undefined') {
            const check_category = await con.promise().query('SELECT id FROM category WHERE _name = ?', [data.category]);
            let category;
            let category_id;
    
            if(check_category[0].length < 1) {
                category = await con.promise().query('INSERT INTO category VALUES(0, ?, ?)', [
                data.category,
                0
                ]);
    
                category_id = category[0].insertId;
            }
            else {
                console.log(check_category[0][0]);
                category_id = check_category[0][0].id;
            }
    
            const save = await con.promise().query("INSERT INTO words VALUES(0, ?, ?, ?, ?, ?, ?, ?)",
            [
                category_id,
                data.arabic,
                data.bos_lang,
                data.eng_lang,
                data.grammar,
                data.grammar_meaning,
                data.page
            ]);

            msg = 'You made new save......';
        } 
        else {
            msg = req.multerErr;    
        }

        console.log(msg);


        res.render('partials/messages.ejs', {msg});
    },

    imgUplode: function(req, res, cb) {
        const upload = multer({storage:custom.folderDest()}).single('img');

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              req.multerErr = "Error while uploding the image";
            } else if (err) {
              req.multerErr = "An unknown error occurred when uploading";
            }

          })

          cb();
    }
}