// Importo los modulos y librerias necesarixs

// const { Producto } = require("./ecommerce/Producto");
// const { Carrito } = require("./ecommerce/Carrito");
// const fs = require('fs');
import Producto from '../ecommerce/Producto.js';
import {db} from '../persistencia/DBconnection.js';


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
			: await db.funcionFind('productos') 
            !respuesta && id 
            ?
            res.send(respuesta)
            :
			res
					.status(404)
					.send('Producto no encontrado');
            }
            

    // funcion agregar: permite agregar un producto a la lista de productos con los parametros propuestos en el body. 
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
    



    // // funcion actualizar: permite actualizar un producto de la lista de productos con los parametros propuestos en el body. si el id no coincide con ningun producto, lo indica.
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

    // // funcion borrar: permite borrar un producto de acuerdo al id solicitado. si el id no coincide con ningun producto, lo indica.
    funcionBorrar = async (req, res) => {
        const {id} = req.params;
            await db.funcionDelete('productos', id)
                ? res.send('Producto borrado exitosamente de su carrito')
                : res
                        .status(404)
                        .send('Producto no encontrado');
        }
    };


export default RutasProductos 