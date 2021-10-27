// import Carrito from '../ecommerce/Carrito.js';
// import fs from 'fs';
// import Producto  from '../ecommerce/Producto.js';

// const carrito = new Carrito(1);
// fs.writeFileSync('./persistencia/carrito.txt', JSON.stringify(carrito), 'utf-8');


// // RUTAS PARA EL CARRITO
//  class RutasCarrito {
//     constructor(){
//         this.listar = '/listar/:id?' 
//         this.agregarID = '/agregar/:id'
//         this.borrar = '/borrar/:id'
//     }
    
//     // funcion listar: muestra la lista de productos en el carrito, y de poner un id, muestra el producto con ese id. De no haber productos en la lista, muestra error. De solicitar un producto con un id que no esta en la lista, muestra error. 
//     funcionListar = (req, res) => {
//         if(carrito.productos <= 0) {
//             res.send("No tienes productos en tu carrito")
//         }
//         else {
//             const { id } = req.params;
//             const producto = carrito.productos.find((producto) => producto.id == id);
//             if (producto){
//                 res.json(producto);
//             }
//             else if(carrito.productos.id != id){
//                 const noProductoID = { error: "No existe un producto con ese ID" }
//                 res.json( noProductoID );
//             }
//             else {
//                 res.json( carrito.productos );
//                 fs.writeFileSync('./persistencia/carrito.txt', JSON.stringify(carrito), 'utf-8');
//             }
//         }
//     }

//     // funcion agregarID: permite agregar un producto al carrito de acuerdo al ID solicitado. si no existe un producto con ese id, da un msj de error.
//     funcionAgregarID = (req, res) => {
//         const { id } = req.params;
//         const producto = listaProductos.find((producto) => producto.id == id);
//         carrito.productos.push(producto);
//         fs.writeFileSync('./persistencia/carrito.txt', JSON.stringify(carrito), 'utf-8');
//         res.status(201).json(producto);
//         console.log(`Nuevo producto agregado al carrito con el ID: ${id} `, producto);
//     }

//     // funcion borrar: permite borrar un producto del carrito de acuerdo al id solicitado. si no existe un producto con ese id, da un msj de error.
//     funcionBorrar = (req, res) => {
//         const { id } = req.params;
//         const producto = carrito.productos.find((producto) => producto.id == id);
//         if (producto){
//         carrito.productos = carrito.productos.filter(producto => producto.id != id);
//         fs.writeFileSync('./persistencia/carrito.txt', JSON.stringify(carrito), 'utf-8');
//         res.send(`Se ha borrado exitosamente el producto del carrito`);
//         }
//         else {
//             res.send("Error: Producto no encontrado en el carrito");
//         }
//     }
// }

// export default RutasCarrito;