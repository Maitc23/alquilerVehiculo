const express = require('express'); 
const cors = require('cors'); 
const morgan = require('morgan'); 
const bodyParser = require('body-parser');

const app = express();


//Settings 
app.set('port', process.env.PORT || 8080); 


//Middlewares 
app.use(cors()); 
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); 

//Static Files

app.use('/public', express.static(`${__dirname}/storage/imgs`));

//Routes
app.use('/api', require('./routes')); 


module.exports = app; 
