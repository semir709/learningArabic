const db = require("../config/database.js");
const custom = require("../config/custom.js");

const multer = require('multer');
const { response } = require("express");


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

        const data = {
            all_category: name_category[0]
        }

        res.render('all_words_admin.ejs', data);
    },

    reload_category: async function(req, res) {
        const con = db.getCon();
        const name_category = await con.promise().query('SELECT _name FROM category');

        const data = {
            all_category: name_category[0]
        }

        res.send(data);
    },


    getData: async function(req, res) {
        const con = db.getCon();
        const category_name = req.query.name;

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
            
            const data = await con.promise().query(`SELECT words.id, words.arabic, words.bosnian, words.english,
            words.grammar, words.grammar_meaning, category._name FROM words
            INNER JOIN category ON category.id = ? AND category.id = words.category_id`, [id]);
            obj = data[0];
        }


        res.render('partials/list_words.ejs', {data:obj});
    },

    reload_category: async function(req, res) {

        const con = db.getCon();
        const category = req.query;

        const category_new = await con.promise().query(`UPDATE category  INNER JOIN words ON category.id = words.category_id
        SET category._name = ?
        WHERE words.id = ?`,[
            category.name,
            category.id
        ]);

        const name_category = await con.promise().query('SELECT _name FROM category');

        const data = {
            all_category: name_category[0],
            category_new: category.name
        }

        res.send(data);

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



        await con.promise().query("DELETE FROM words WHERE id = ? ", [id])
        .then(d => {
            if(d) isDelete = true;
        })
        .catch(err => {
            if(err) isDelete = false;
        });

        res.send(isDelete);

    },


    updateModal: async function(req, res) {
        const data = req.body;
        const con = db.getCon();
        let isUpdate;

        const img_data = req.file;
            
        const id_category = await con.promise().query(`UPDATE category INNER JOIN words ON words.category_id = category.id SET category._name = ?
        WHERE words.id = ?`,
        [
            data.category,
            data.id
        ]).then(r => {isUpdate = true}).catch(err => {if(err) isUpdate = false});

        if (!img_data) {

            await con.promise().query('UPDATE words SET bosnian = ?, english = ?, grammar = ?, grammar_meaning = ? WHERE id = ?',
        [
            data.bosnian,
            data.english,
            data.grammar,
            data.grammar_m,
            data.id
            //page
        ]).then(r => isUpdate = true).catch(err => {if(err) isUpdate = false});
            
        } else {
            const imgPath = "/img/" + img_data.filename;

            await con.promise().query('UPDATE words SET arabic = ?, bosnian = ?, english = ?, grammar = ?, grammar_meaning = ? WHERE id = ?',
            [
                imgPath,
                data.bosnian,
                data.english,
                data.grammar,
                data.grammar_m,
                data.id
                //page
            ]).then(r => isUpdate = true).catch(err => {if(err) isUpdate = false});
          
        }

        res.send(isUpdate);

    },


    save_admin: async function(req, res) {
        const data = req.body;
        const con = db.getCon();

        const img_data = req.file;

        console.log(req.file);

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
                
                category_id = check_category[0][0].id;
            }

            if (!img_data) {

                const save = await con.promise().query("INSERT INTO words VALUES(0, ?, ?, ?, ?, ?, ?, ?)",
                [
                    category_id,
                    "/img/none.png",
                    data.bos_lang,
                    data.eng_lang,
                    data.grammar,
                    data.grammar_meaning,
                    data.page
                ]);

                msg = 'You made new save......';
            
            } else {
                const imgPath = "/img/" + img_data.filename;

                const save = await con.promise().query("INSERT INTO words VALUES(0, ?, ?, ?, ?, ?, ?, ?)",
                [
                    category_id,
                    imgPath,
                    data.bos_lang,
                    data.eng_lang,
                    data.grammar,
                    data.grammar_meaning,
                    data.page
                ]);

                msg = 'You made new save......';

              
          }
        } 
        else {
            msg = req.multerErr;    
        }


        res.render('partials/messages.ejs', {msg});
    },
}