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

        const category = await con.promise().query('SELECT id FROM category WHERE _name = ?', [category_name]);

        const id = category[0][0].id;
        let obj;

        if(id === 'undefined') {
            obj = 'empty';
        } else {
            const data = await con.promise().query("SELECT arabic, bosnian, english, grammar FROM words WHERE category_id = ?", [id]);
            obj = data[0];
        }

        res.render('partials/list_words.ejs', {data:obj});
    },

    delete: async function(req, res) {
        const con = db.getCon();
        const category_name = req.query.name;

        await con.promise().query('DELETE FROM category WHERE _name = ?', [category_name]);

        
        res.send('/admin/allWords');
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