import pkg from 'uuid'; //uuid sirve para poder generar un id unico de una manera mas facil
const { v4: uuidv4 } = pkg;

// CLASE PRODUCTO

export default class Producto {
    constructor(title, description, price, thumbnail, code, stock){
        this.id = uuidv4();
        this.date = new Date().toLocaleString();
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

