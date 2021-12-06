const db = require("../config/database.js");

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
    getAllWords: function(req, res) {
        res.render('all_words_admin.ejs');
    },

    save_admin: async function(req, res) {
        const data = req.body;
        const con = db.getCon();

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

        
        res.render('partials/messages.ejs');
    }
}