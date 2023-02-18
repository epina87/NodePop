const mongoose = require('mongoose'); // objeto de conexión EVENTEMITER

mongoose.set('strictQuery',false); //quitar el error 

mongoose.connection.on('error',err=>{
    console.log('Error de conexión',err);
})

mongoose.connection.once('open',()=>{
    console.log('Conectado a MongoDB en', mongoose.connection.name)
}) //la primera vez que salga open 

//mongoose.connect('mongodb://localhost:27017')//cadena de conexión 
mongoose.connect('mongodb://127.0.0.1:27017/nodepop')//Algunos sistemas operativos localhost lo traduce a 127.0.0.1

module.exports = mongoose.connection; 
