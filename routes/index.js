var express = require('express');
var router = express.Router();

const Anuncio = require('../models/Anuncio');
const rutImg = "../images/anuncios/"

/* GET home page. */
router.get('/',async function(req, res, next) {
  try{
        
    const anuncios = await Anuncio.find();
    
    anuncios.forEach(function(anuncio) {
      anuncio.foto = rutImg + anuncio.foto
      if(anuncio.venta){
        anuncio.tipo = "Venta"
      }else{
        anuncio.tipo = "Busqueda"
      }
    }); 

    res.locals.anuncios = anuncios;      
    res.render('index')

  }catch(err){
    next(err)
  }
});



// GET /tags 
router.get('/tags', function(req, res, next) {
  res.locals.tags = ['work',' lifestyle', 'motor','mobile'];

  res.render('tags');
});



module.exports = router;


