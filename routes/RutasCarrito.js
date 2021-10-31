import Carrito from '../ecommerce/Carrito.js';
import {db} from '../persistencia/DBconnection.js';

const carrito = new Carrito();

// RUTAS PARA EL CARRITO
 class RutasCarrito {
    constructor(){
        this.listar = '/listar/:id?' 
        this.agregarID = '/agregar/:id'
        this.borrar = '/borrar/:id'
    }
    
    // funcion listar: muestra la lista de productos en el carrito, y de poner un id, muestra el carrito con ese id. De no haber productos en la lista, muestra un array vacio. De solicitar un carrito con un id que no existe, indica que el carrito no ha sido encontrado.
    funcionListar = async (req, res) => {
        const {id} = req.params;
		let respuesta = id
			? await db.funcionFindById('carrito', id)
			: await db.funcionFind('carrito');
		!respuesta && id
			? res
					.status(404)
					.send('Carrito no encontrado')
			: res.send({id: carrito.id, date: carrito.date, productos: carrito.productos});
            }
    // funcion agregarID: permite agregar un producto al carrito de acuerdo al ID solicitado. si no existe un producto con ese id, lo indica.
    funcionAgregarID = async (req, res) => {
            const {id} = req.params;
            let nuevoProducto = await db.funcionFindById('productos', id);
            if (!nuevoProducto){
                await res.send('No existe un producto con el id solicitado');
            }
            else {
                await db.funcionCreate('carrito', {id: carrito.id, date: carrito.date, productos: carrito.productos.push(nuevoProducto)});
                await res.send({id: carrito.id, date: carrito.date, productos: carrito.productos});
                console.log("Nuevo producto agregado: ", nuevoProducto); 
            }
        }
    // funcion borrar: permite borrar un producto del carrito de acuerdo al id solicitado. si no existe un producto con ese id, lo indica.
    funcionBorrar =  async (req, res) => {
        const { id } = req.params;
        const index = carrito.productos.findIndex((p) => p.id == id);
        if (!index){
            carrito.productos.splice(index, 1);
            return await res.send("Producto borrado exitosamente");
        }
        else {
            return await res.send('No existe un producto con el id solicitado');    
            }
        }   
    }

export default RutasCarrito;