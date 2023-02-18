const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');
const functionFiltroPorPrecio  = require('../functionRoutes/functionFilter')


// GET /apiv1/anuncios
// Devuelve una lista de anuncios
router.get('/', async (req, res, next)=>{
    try {
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
        
        res.json({results: anuncios});

    } catch (error) {
        next(error);
        
    }
});



// GET /apiv1/anuncios/tags 
// devuelve una json de tags
router.get('/tags', function(req, res, next) {
    tags=['work',' lifestyle', 'motor','mobile']
    res.json({Tags: tags});
  
  });


//POST /apiv1/anuncios (body)
// Crea un anuncio
router.post('/',async(req,res,next)=>{
    try {
        const anuncioData = req.body;
        // creamos una instancia de Anuncio
        const anuncio = new Anuncio(anuncioData);

        // la persistimos(guardar) en la BD
        const anuncioGuardado = await anuncio.save();
        // Retornamos anuncio nuevo
        res.json({ result: anuncioGuardado });
       
    } catch (error) {
        next(error); 
    }
});



module.exports = router;