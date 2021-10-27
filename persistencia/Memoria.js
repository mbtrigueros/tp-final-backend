export default class Memoria{
    constructor(){
	this.connection = [];
    }
	funcionIniciarSchemas = async () => {
		this.connection.productos = [];
		this.connection.carrito = [];
		return 'Arrays en memoria inicializados';
	};
	funcionCreate = (objectName, productos) => {
		this.connection[objectName].push(productos);
		return productos;
	};
	funcionFind = (objectName) => this.connection[objectName];
	funcionFindById = (objectName, id) =>
		this.connection[objectName].find((p) => p.id == id) || false;

	funcionUpdate = (objectName, id, productos) => {
		let index = this.connection[objectName].findIndex((el) => el.id == id);
		let producto = this.findById(objectName, id);
		index && (this.connection[objectName][index] = {id: producto.id, ...productos});
		return this.findById(objectName, id);
	};
	funcionDelete = (objectName, id) => {
		let index = this.connection[objectName].findIndex((el) => el.id == id);
		if (index > -1) {
			this.connection[objectName].splice(index, 1);
			return 'Removed';
		} else {
			return false;
		}
	};
}