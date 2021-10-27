import pkg from 'uuid';
const { v4: uuidv4 } = pkg;
// CLASE CARRITO

export default class Carrito {
    constructor(){
        this.date = new Date().toLocaleString();
        this.id = uuidv4();
        this.productos = [];
    }
}

// module.exports = {Carrito}