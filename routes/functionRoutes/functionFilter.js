'use strict';

var express = require('express');
var router = express.Router();

module.exports = function filtrarPorPrecio (filterByprecio){
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