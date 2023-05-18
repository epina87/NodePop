const mongoose = require('mongoose'); // objeto de conexión EVENTEMITER

mongoose.set('strictQuery',false); //quitar el error 

mongoose.connection.on('error',err=>{
    console.log('Error de conexión',err);
})

mongoose.connection.once('open',()=>{
    console.log('Conectado a MongoDB en', mongoose.connection.name)
}) //la primera vez que salga open 


mongoose.connect(process.env.MOGODB_CONNECTION_STR)//Algunos sistemas operativos localhost lo traduce a 127.0.0.1

module.exports = mongoose.connection; 
