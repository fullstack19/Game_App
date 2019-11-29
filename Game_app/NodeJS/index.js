const express = require('express');
const bodyParser = require('body-parser');
//install cors using CLI inside the NodeJS, to connect Angualar and NodeJS for communication
//call the cors here
const cors = require('cors');  //cors-origin resource sharing

//destructuring syntax
const { mongoose } = require('./db.js');
var playerController = require('./controller/playerController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors('hhtp://localhost:4200'));  // allows request from any port number or domain,u can specify any port number u wnt

app.listen(3000, ()=> console.log('Server stared at port 3000'));

app.use('/players',playerController);