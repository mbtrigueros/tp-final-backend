import pkg from 'uuid'; //uuid sirve para poder generar un id unico de una manera mas facil
const { v4: uuidv4 } = pkg;
// CLASE CARRITO

export default class Carrito {
    constructor(){
        this.date = new Date().toLocaleString();
        this.id = uuidv4();
        this.productos = [];
    }
}
