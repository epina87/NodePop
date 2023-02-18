const mongoose = require('mongoose');

// Definir esquema anuncios
const anuncioShema = mongoose.Schema({
    nombre:String,
    venta:Boolean,
    precio:Number,
    foto:String,
    tag:[String]
});

anuncioShema.statics.lista = function(filtro,skip,limit,sort){
    const query = Anuncio.find(filtro); // methodos thenables
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);

    return query.exec();
}



const Anuncio = mongoose.model('anuncios',anuncioShema)

module.exports = Anuncio;
