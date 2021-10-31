// Importo express
//const express = require('express');
import express from 'express';
import {Router} from 'express';
import { db } from './persistencia/DBconnection.js';
// SERVER

const app = express();
const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
    db.funcionIniciarSchemas()
});
server.on('error', error=>console.log('Error en servidor', error));

// ROUTERS PRODUCTOS Y CARRITO

const routerProductos = Router();
const routerCarrito = Router();

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);

// IMPORTO LAS RUTAS DESPUES DEL ROUTER 

import RutasCarrito  from './routes/RutasCarrito.js';
import RutasProductos from './routes/RutasProductos.js';

const rutasCarrito = new RutasCarrito();
const rutasProductos = new RutasProductos();

// PROGRAMA

// RUTAS PRODUCTOS
routerProductos
    .get(rutasProductos.listar, rutasProductos.funcionListar)
    .get(rutasProductos.listarNombre, rutasProductos.funcionListarNombre)
    .post(rutasProductos.agregar, rutasProductos.funcionAgregar)
    .put(rutasProductos.actualizar, rutasProductos.funcionActualizar)
    .delete(rutasProductos.borrar, rutasProductos.funcionBorrar);


// RUTAS CARRITO
routerCarrito
    .get(rutasCarrito.listar, rutasCarrito.funcionListar)
    .post(rutasCarrito.agregarID, rutasCarrito.funcionAgregarID)
    .delete(rutasCarrito.borrar, rutasCarrito.funcionBorrar);


