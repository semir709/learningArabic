const mysql = require('mysql2');

module.exports = {
    getCon: function() {
        let con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: "arabic-words"
        });

        con.connect((err) => {
            if (err) throw err.message
        });

        return con;
    }
}