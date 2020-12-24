const mongoose = require('mongoose');

//Pasando la conexion a la BD
const URI = process.env.MONGOBD_URI 
    ? process.env.MONGOBD_URI 
    : 'mongodb://localhost/vehiculosAlquiler';


mongoose.connect(URI, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}); 


const connection = mongoose.connection;


connection.once('open', () => { 
    console.log('DB is connected');
});