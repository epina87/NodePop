const mongoose = require('mongoose');

// Definir esquema anuncios
const anuncioShema = mongoose.Schema({
    nombre:String,
    venta:Boolean,
    precio:Number,
    foto:String,
    tags:[String]
});

const Anuncio = mongoose.model('anuncios',anuncioShema)

module.exports = Anuncio;
