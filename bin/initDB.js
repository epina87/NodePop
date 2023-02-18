'use strict';

const Anuncio = require('../models/Anuncio');
const connection = require('../lib/connectMongoose');

main().catch(err => console.log('Hubo un error inesperado', err));

async function main() {

  // inicializamos colección de agentes
  await initAnuncios();

  connection.close();

}

async function initAnuncios() {
  // borrar todos los documentos de la colección de agentes
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} agentes.`);

  // crear agentes iniciales
  const inserted = await Anuncio.insertMany([
    {
        "nombre": "Bicicleta",
        "venta": true,
        "precio": 230.15,
        "foto": "bici.jpg",
        "tag": [ "lifestyle", "motor"]
    },
    {
        "nombre": "iPhone 3GS",
        "venta": false,
        "precio": 50.00,
        "foto": "iphone.jpg",
        "tag": [ "lifestyle", "mobile"]
    },
    {
        "nombre": "Samsung 2GS",
        "venta": false,
        "precio": 30.00,
        "foto": "samsung.jpg",
        "tag": [ "lifestyle", "mobile"]
    },
    {
        "nombre": "Samsungmini 2GS",
        "venta": false,
        "precio": 60.00,
        "foto": "samsungmini.jpg",
        "tag": [ "lifestyle", "mobile"]
    },{
        "nombre": "Moto",
        "venta": true,
        "precio": 450.25,
        "foto": "moto.jpg",
        "tag": [ "lifestyle", "motor"]
    },
    {
        "nombre": "Avión",
        "venta": true,
        "precio": 670.90,
        "foto": "avion.jpg",
        "tag": [ "work", "motor"]
    }
  ]);
  console.log(`Creados ${inserted.length} anuncios`);
}