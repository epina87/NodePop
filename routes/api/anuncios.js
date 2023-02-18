const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

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
        if (filterByprecio){filtro.precio = filtrarPorPrecio(filterByprecio)}

    
        const anuncios = await Anuncio.lista(filtro,skip,limit,sort);


        
        res.json({results: anuncios});

    } catch (error) {
        next(error);
        
    }
});

function filtrarPorPrecio (filterByprecio){
    if (filterByprecio.includes("-")){
        const position = filterByprecio.indexOf("-")
        if (position===0){
            
            const filterByprecioSlice = filterByprecio.slice(1,filterByprecio.length)            
            return {$lte:filterByprecioSlice}   

        }else{
            if (position===filterByprecio.length-1){
                const filterByprecioSlice = filterByprecio.slice(0,filterByprecio.length-1)
                return {$gte:filterByprecioSlice}
            }else{
                const filterByprecioSliceInit = filterByprecio.slice(0,position)
                const filterByprecioSliceEnd  = filterByprecio.slice(position+1,filterByprecio.length)

                return {$gte: filterByprecioSliceInit, $lte: filterByprecioSliceEnd}
            }   
        }
    }else{
        return filterByprecio
    }    

}

// GET /apiv1/anuncios/tags 
// devuelve una json de tags
router.get('/tags', function(req, res, next) {
    tags=['work',' lifestyle', 'motor','mobile']
    res.json({Tags: tags});
  
  });

module.exports = router;