module.exports = {
    getLogin: function(req, res) {
        res.render('login.ejs');
    },
    getAdmin: function(req, res) {
        res.render('admin.ejs');
    },
    getAllWords: function(req, res) {
        res.render('all_words_admin.ejs');
    }
}