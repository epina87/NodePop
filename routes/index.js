var express = require('express');
var router = express.Router();

const Anuncio = require('../models/Anuncio');
const functionFiltroPorPrecio  = require('./functionRoutes/functionFilter')

const rutImg = "../images/anuncios/"


/* GET home page. */
router.get('/',async function(req, res, next) {
  try{

      // filtros
      const filterBytag     = req.query.tag;
      const filterByventa   = req.query.venta;
      const filterBynombre  = req.query.nombre;
      const filterByprecio = req.query.precio;
      // paginación 
      const skip  = req.query.start;
      const limit  = req.query.limit;
      // Ordenar
      const sort   = req.query.sort;

      const filtro = {};

      if (filterBytag){filtro.tag = {$in:[filterBytag]};}
      if (filterByventa){filtro.venta = filterByventa;}
      if (filterBynombre){filtro.nombre = new RegExp('^' + filterBynombre, "i");}
      if (filterByprecio){filtro.precio = functionFiltroPorPrecio(filterByprecio)}

      const anuncios = await Anuncio.lista(filtro,skip,limit,sort);


    
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
   res.render('tags');
});






module.exports = router;


