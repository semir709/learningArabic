const mysql = require('mysql2');

module.exports = {
    getCon: function() {
        let con = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'scneogjaurnc7a82647',
            database: "arabic-words"
        });

        con.connect((err) => {
            if (err) throw err.message
        });

        return con;
    }
}