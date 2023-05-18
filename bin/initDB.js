"use strict";
require('dotenv').config();

const Anuncio = require("../models/Anuncio");
const Usuario = require("../models/Usuario");
const connection = require("../lib/connectMongoose");



main().catch((err) => console.log("Hubo un error inesperado", err));

async function main() {
  // inicializamos colección de agentes
  await initAnuncios();

  await initUsuarios();

  connection.close();
}

async function initAnuncios() {
  // borrar todos los documentos de la colección de anuncios
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crear agentes iniciales
  const inserted = await Anuncio.insertMany([
    {
      nombre: "Bicicleta",
      venta: true,
      precio: 230.15,
      foto: "bici.jpg",
      tag: ["lifestyle", "motor"],
    },
    {
      nombre: "iPhone 3GS",
      venta: false,
      precio: 50.0,
      foto: "iphone.jpg",
      tag: ["lifestyle", "mobile"],
    },
    {
      nombre: "Samsung 2GS",
      venta: false,
      precio: 30.0,
      foto: "samsung.jpg",
      tag: ["lifestyle", "mobile"],
    },
    {
      nombre: "Samsungmini 2GS",
      venta: false,
      precio: 60.0,
      foto: "samsungmini.jpg",
      tag: ["lifestyle", "mobile"],
    },
    {
      nombre: "Moto",
      venta: true,
      precio: 450.25,
      foto: "moto.jpg",
      tag: ["lifestyle", "motor"],
    },
    {
      nombre: "Avión",
      venta: true,
      precio: 670.9,
      foto: "avion.jpg",
      tag: ["work", "motor"],
    },
  ]);
  console.log(`Creados ${inserted.length} anuncios`);
}

async function initUsuarios() {
  // borrar todos los documentos de la colección de usuarios
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear usuarios iniciales
  const inserted = await Usuario.insertMany([
      { email: "user@example.com", password: await  Usuario.hashPassword( "1234" )},
      { email: "admin@example.com", password: await  Usuario.hashPassword( "1234" )},
  ]);

  console.log(`Creados ${inserted.length} usuarios`);
}
