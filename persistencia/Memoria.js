export default class Memoria{
    constructor(){
	this.connection = [];
    }
	funcionIniciarSchemas = async () => {
		this.connection.productos = [];
		this.connection.carrito = [];
		return console.log('Arrays en memoria inicializados');
	};
	funcionCreate = (objectName, productos) => {
		this.connection[objectName].push(productos);
		return productos;
	};
	funcionFind = (objectName) => this.connection[objectName];
	funcionFindById = (objectName, id) =>
		this.connection[objectName].find((p) => p.id == id) || false;
	// funcionFindByName = (objectName, title) =>
	// 	this.connection[objectName].find((p) => p.title == title) || false;
	// funcionFindByCode = (objectName, code) =>
	// 	this.connection[objectName].find((p) => p.code == code) || false;

	// funcionLower = (objectName, el) => {
	// const min = Math.min(...this.connection[objectName].map(({ el }) => el));
	// 	this.connection[objectName].filter(({ el }) => e === min);
	// 	}

	// funcionGreater = (objectName, el) => {
	// 	const max = Math.max(...this.connection[objectName].map(({ el }) => el));
	// 	this.connection[objectName].filter(({ el }) => e === max);
	// 		}

	funcionUpdate = (objectName, id, productos) => {
		let index = this.connection[objectName].findIndex((el) => el.id == id);
		let producto = this.funcionFindById(objectName, id);
		this.connection[objectName][index] = {id: producto.id, date: producto.date, ...productos};
		return this.connection[objectName][index];
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