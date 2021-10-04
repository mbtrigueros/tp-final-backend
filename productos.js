// CLASE PRODUCTO

class Producto {
    constructor(id, date, title, description, price, thumbnail, code, stock){
        this.id = id;
        this.date = date;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

// CLASE CARRITO

class Carrito {
    constructor(date, id, productos){
        this.date = date;
        this.id = id;
        this.productos = productos;
    }
}

module.exports = {Producto, Carrito}