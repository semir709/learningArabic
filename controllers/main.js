
module.exports = {
    home: function (req, res) {
        res.render('home.ejs')
    },
    all_words: function(req, res) {
        res.render('all_words.ejs');
    }
}