const express = require('express');

require('dotenv').config();
app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/images'));

app.use('/', require('./routes/routes'));

app.listen(3000);
