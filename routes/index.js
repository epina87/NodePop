var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');
const rutImg = "http://127.0.0.1:3000/images/anuncios/"

/* GET home page. */
router.get('/',async function(req, res, next) {
  try{
        
    const anuncios = await Anuncio.find();
    
    anuncios.forEach(function(anuncio) {
      anuncio.foto = rutImg + anuncio.foto
    }); 

    console.log(anuncios)

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


