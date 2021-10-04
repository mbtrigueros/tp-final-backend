// Importo los modulos y librerias necesarixs

const { Producto, Carrito } = require("./productos");
const fs = require('fs');

// Establezco variable administrador como true o false
let administrador = false;

// constante de mensaje error para cuando administrador es false
const msgError = { error: "Necesitas ser administrador para acceder a este metodo" }

// creo productos

const escuadra = new Producto( 0, new Date().toLocaleString(), "Escuadra", "Esto es una escuadra", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", Math.floor((Math.random() * (5000 - 1 + 1 )) + 1), 10);

const calculadora = new Producto( 1, new Date().toLocaleString(), "Calculadora", "Esto es una calculadora", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png", Math.floor((Math.random() * (5000 - 1 + 1 )) + 1), 10);

// declaro array listaProductos y array carrito; creo un archivo de texto que persiste en la carpeta persistencia

let listaProductos = [escuadra, calculadora];
fs.writeFileSync('./persistencia/listaProductos.txt', JSON.stringify(listaProductos), 'utf-8');

const carrito = new Carrito(new Date().toLocaleString(), 1, []);
fs.writeFileSync('./persistencia/carrito.txt', JSON.stringify(carrito), 'utf-8');

// RUTAS PARA PRODUCTOS

class RutasProductos{
    constructor(){
        this.listar = '/listar/:id?' 
        this.agregar = '/agregar'
        this.actualizar = '/actualizar/:id'
        this.borrar = '/borrar/:id'
    }

    // funcion listar: muestra la lista de productos, y de poner un id, muestra el producto con ese id. De no haber productos en la lista, muestra error. De solicitar un producto con un id que no esta en la lista, muestra error. 
    funcionListar = (req, res) => {
        if(listaProductos <= 0) {
            res.send("Error: Productos no encontrados")
        }
        else {
            const { id } = req.params;
            const producto = listaProductos.find((producto) => producto.id == id);
            if (producto){
                res.json(producto);
            }
            else if(listaProductos.id != id){
                const noProductoID = { error: "No existe un producto con ese ID" }
                res.json( noProductoID );
            }
            else {
                res.json( listaProductos );
            }
        }
    
    }

    // funcion agregar: permite al administrador agregar un producto a la lista de productos con los parametros propuestos en el body. si administrador es false, da un msj de error y no permite acceder al metodo. 
    funcionAgregar = (req, res) => {
        if(administrador == true){
            let body = req.body;
            const nuevoProducto = new Producto (listaProductos.length, new Date().toLocaleString(), body.title, body.description, body.price, body.thumbnail, Math.floor((Math.random() * (5000 - 1 + 1 )) + 1), body.stock);
            listaProductos.push(nuevoProducto);
            fs.writeFileSync('./persistencia/listaProductos.txt', JSON.stringify(listaProductos), 'utf-8');
            res.status(201).json(nuevoProducto);
            console.log("Nuevo producto agregado: ", nuevoProducto);
        }
        else {
            res.json( msgError );
            console.log(msgError);
        }

    }

    // funcion actualizar: permite al administrador actualizar un producto de la lista de productos con los parametros propuestos en el body. si administrador es false, da un msj de error y no permite acceder al metodo. 
    funcionActualizar = (req, res) => {
        if(administrador == true){
            const { id } = req.params;
            const { title, description, price, thumbnail, stock } = req.body;
            const producto = listaProductos.find((producto) => producto.id == id);
                if (producto) {
                    listaProductos[id].date = new Date().toLocaleString();
                    listaProductos[id].title = title;
                    listaProductos[id].description = description;
                    listaProductos[id].price = price;
                    listaProductos[id].thumbnail = thumbnail;
                    listaProductos[id].stock = stock;
                    console.log('Producto actualizado');
                    res.send(`Se ha modificado el producto ${listaProductos[id].title}`);
                    fs.writeFileSync('./persistencia/listaProductos.txt', JSON.stringify(listaProductos), 'utf-8');
                }
                else {
                    console.log('Producto no encontrado');
                    res.send({ error: `No hay producto con el id: ${id}`});
                }
            }
            else {
                res.json( msgError );
                console.log(msgError);
            }
        }

    // funcion borrar: permite al administrador borrar un producto de acuerdo al id solicitado. si administrador es false, da un msj de error y no permite acceder al metodo. 
    funcionBorrar = (req, res) => {
        if(administrador == true){
        const { id } = req.params;
        const producto = listaProductos.find((producto) => producto.id == id);
        if (producto){
        listaProductos = listaProductos.filter(producto => producto.id != id);
        res.send(`Se ha borrado exitosamente el producto`);
        fs.writeFileSync('./persistencia/listaProductos.txt', JSON.stringify(listaProductos), 'utf-8');
        }
        else {
            res.send("Error: Producto no encontrado");
        }
    }
    else {
        res.json( msgError );
        console.log(msgError);
        }
    }
}

// RUTAS PARA EL CARRITO

class RutasCarrito{
    constructor(){
        this.listar = '/listar/:id?' 
        this.agregarID = '/agregar/:id'
        this.borrar = '/borrar/:id'
    }
    
    // funcion listar: muestra la lista de productos en el carrito, y de poner un id, muestra el producto con ese id. De no haber productos en la lista, muestra error. De solicitar un producto con un id que no esta en la lista, muestra error. 
    funcionListar = (req, res) => {
        if(carrito.productos <= 0) {
            res.send("No tienes productos en tu carrito")
        }
        else {
            const { id } = req.params;
            const producto = carrito.productos.find((producto) => producto.id == id);
            if (producto){
                res.json(producto);
            }
            else if(carrito.productos.id != id){
                const noProductoID = { error: "No existe un producto con ese ID" }
                res.json( noProductoID );
            }
            else {
                res.json( carrito.productos );
                fs.writeFileSync('./persistencia/carrito.txt', JSON.stringify(carrito), 'utf-8');
            }
        }
    }

    // funcion agregarID: permite agregar un producto al carrito de acuerdo al ID solicitado. si no existe un producto con ese id, da un msj de error.
    funcionAgregarID = (req, res) => {
        const { id } = req.params;
        const producto = listaProductos.find((producto) => producto.id == id);
        carrito.productos.push(producto);
        fs.writeFileSync('./persistencia/carrito.txt', JSON.stringify(carrito), 'utf-8');
        res.status(201).json(producto);
        console.log(`Nuevo producto agregado al carrito con el ID: ${id} `, producto);
    }

    // funcion borrar: permite borrar un producto del carrito de acuerdo al id solicitado. si no existe un producto con ese id, da un msj de error.
    funcionBorrar = (req, res) => {
        const { id } = req.params;
        const producto = carrito.productos.find((producto) => producto.id == id);
        if (producto){
        carrito.productos = carrito.productos.filter(producto => producto.id != id);
        fs.writeFileSync('./persistencia/carrito.txt', JSON.stringify(carrito), 'utf-8');
        res.send(`Se ha borrado exitosamente el producto del carrito`);
        }
        else {
            res.send("Error: Producto no encontrado en el carrito");
        }
    }
}


// le agrego un alias a las clases y las exporto.
const rutasCarrito = new RutasCarrito();
const rutasProductos = new RutasProductos();
module.exports = { rutasCarrito, rutasProductos }