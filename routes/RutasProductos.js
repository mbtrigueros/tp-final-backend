// Importo los modulos y librerias necesarixs

// const { Producto } = require("./ecommerce/Producto");
// const { Carrito } = require("./ecommerce/Carrito");
// const fs = require('fs');
import Producto from '../ecommerce/Producto.js';
import fs from 'fs';
import {db} from '../persistencia/DBconnection.js';

// Establezco variable administrador como true o false
let administrador = true;

// constante de mensaje error para cuando administrador es false
const msgError = { error: "Necesitas ser administrador para acceder a este metodo" }

// creo productos

// export const escuadra = new Producto( 0, "Escuadra", "Esto es una escuadra", 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", Math.floor((Math.random() * (5000 - 1 + 1 )) + 1), 10);

// export const calculadora = new Producto( 1, "Calculadora", "Esto es una calculadora", 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png", Math.floor((Math.random() * (5000 - 1 + 1 )) + 1), 10);

// // declaro array listaProductos y array carrito; creo un archivo de texto que persiste en la carpeta persistencia

// export let listaProductos = [escuadra, calculadora];
// fs.writeFileSync('./persistencia/listaProductos.txt', JSON.stringify(listaProductos), 'utf-8');


// RUTAS PARA PRODUCTOS

 class RutasProductos{
    constructor(){
        this.listar = '/listar/:id?' 
        this.agregar = '/agregar'
        this.actualizar = '/actualizar/:id'
        this.borrar = '/borrar/:id'
    }
 
    // funcion listar: muestra la lista de productos, y de poner un id, muestra el producto con ese id. De no haber productos en la lista, muestra error. De solicitar un producto con un id que no esta en la lista, muestra error. 
    funcionListar = async (req, res) => {
        const {id} = req.params;
		let respuesta = id
			? await db.funcionFindById('productos', id)
			: await db.funcionFind('productos');
		!respuesta && id
			? res
					.status(404)
					.send(respuesta, 'Producto no encontrado')
			: res.send(respuesta);
            }
        

    // funcion agregar: permite al administrador agregar un producto a la lista de productos con los parametros propuestos en el body. si administrador es false, da un msj de error y no permite acceder al metodo. 
    funcionAgregar = async (req, res) => {
        
            let {title, description, price, thumbnail, code, stock} = req.body;
            const nuevoProducto = new Producto(			
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            );
    
            let respuesta = await db.funcionCreate('productos', nuevoProducto);
            res.send(respuesta);
            console.log("Nuevo producto agregado: ", nuevoProducto);
        
    }
    



    // // funcion actualizar: permite al administrador actualizar un producto de la lista de productos con los parametros propuestos en el body. si administrador es false, da un msj de error y no permite acceder al metodo. 
    funcionActualizar = async (req, res) => {
        const {id} = req.params;
        const propiedades = [
			'title',
            'description',
            'price',
            'thumbnail',
			'code',
			'stock',
		];
		let items = {};
		for (const key in req.body) {
			if (propiedades.includes(key)) {
				items[key] = req.body[key];
			}
		}
		let respuesta = await db.funcionUpdate('productos', id, items)
        respuesta
			? res.send(respuesta)
			: res
					.status(404)
					.send('Producto no encontrado');
        }

    // // funcion borrar: permite al administrador borrar un producto de acuerdo al id solicitado. si administrador es false, da un msj de error y no permite acceder al metodo. 
    funcionBorrar = async (req, res) => {
        const {id} = req.params;
        try {
            let response = await db.funcionDelete('productos', id);
            response
                ? res.send(response)
                : res
                        .status(404)
                        .send('Producto no encontrado');
        } catch (error) {
            res.send('error')
        }
        }
    };




// le agrego un alias a las clases y las exporto.
// const rutasCarrito = new RutasCarrito();
// const rutasProductos = new RutasProductos();
// module.exports = { rutasCarrito, rutasProductos }

export default RutasProductos 