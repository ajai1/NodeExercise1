const express = require('express');
const app = express();
const config = require('config');
const Joi = require('joi');
const home = require('./routes/home');
const users = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');
app.set('view engine', 'pug');
app.set('views', './views');

console.log(config.get('name'));
console.log(config.get('mail.host'));
console.log(config.get('mail.password'));


app.use('/', home);
app.use('/api/users', users);


const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Listening to the port ${port}`);
});