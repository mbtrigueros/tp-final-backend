// Importo express
const express = require('express');

// SERVER

const app = express();
const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));



// ROUTERS PRODUCTOS Y CARRITO

const routerProductos = express.Router();
const routerCarrito = express.Router();

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);

// IMPORTO LAS RUTAS DESPUES DEL ROUTER 

const { rutasProductos, rutasCarrito } = require("./rutas");

// PROGRAMA

// RUTAS PRODUCTOS
    routerProductos.get(rutasProductos.listar, rutasProductos.funcionListar);
    routerProductos.put(rutasProductos.actualizar, rutasProductos.funcionActualizar);
    routerProductos.post(rutasProductos.agregar, rutasProductos.funcionAgregar);
    routerProductos.delete(rutasProductos.borrar, rutasProductos.funcionBorrar);

// RUTAS CARRITO
    routerCarrito.get(rutasCarrito.listar, rutasCarrito.funcionListar);
    routerCarrito.post(rutasCarrito.agregarID, rutasCarrito.funcionAgregarID);
    routerCarrito.delete(rutasCarrito.borrar, rutasCarrito.funcionBorrar);


