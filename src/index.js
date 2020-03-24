const express = require('express');
const app = express();
const { Pool } = require('pg');
const { config } = require('../src/db.json');

pool = new Pool(config); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//action type 
app.use(require('./routes/seguridad/actionType'));

//option
app.use(require('./routes/seguridad/option'));

//rol
app.use(require('./routes/seguridad/rol'));

//rol option
app.use(require('./routes/seguridad/rolOption'));

//rol account
app.use(require('./routes/seguridad/rolAccount'));

//action
app.use(require('./routes/seguridad/action'));

//account
app.use(require('./routes/seguridad/account'));

//artist
app.use(require('./routes/app/artist'));

//artist
app.use(require('./routes/app/album'));

app.listen(3000);
console.log('listening localhost:3000');