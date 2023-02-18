const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

// GET /apiv1/anuncios
router.get('/', async (req, res, next)=>{
    try {
        // filtros
        const filterBytag     = req.query.tag;
        const filterByventa   = req.query.venta;
        const filterBynombre  = req.query.nombre;
        const filterByprecio = req.query.precio;
        // paginación 
        const start  = req.query.start;
        const limit  = req.query.limit;
        // Ordenar
        const sort   = req.query.sort;

        const filtro = {};

        if (filterByName){filtro.tag = filterByName;}
        if (filterByage){filtro.venta = filterByage;}
        if (filterByage){filtro.nombre = filterByage;}

        //const agentes = await Agente.lista(filtro,skip,limit,sort,fields);
        const anuncios = await Anuncio.find(objectFilter)

        res.json({results: anuncios});

    } catch (error) {
        next(error);
        
    }
});

module.exports = router;