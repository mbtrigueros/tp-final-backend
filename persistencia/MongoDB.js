import mongoose from 'mongoose';
import Productos from './models/productos.js';
import Carrito from './models/carrito.js';

export default class MongoDb {
    constructor(url, options){
        this.connection = mongoose;
		this.url = url;
		this.options = options; 
        this.validateId = async (id) => await mongoose.Types.ObjectId.isValid(id);
    }
	funcionIniciarSchemas = async () => {
		let data = await mongoose.connect(this.url, this.options);
		await Productos.deleteMany({});
		await Carrito.deleteMany({});
		return console.log(`Schemas inicializados en ${data.connections[0].name}`);
	};
	funcionCreate = async (collection, items) => {
		let Collection = collection === 'productos' ? Productos : Carrito;

		if (collection === 'productos') {
			const {title} = items;
			let existe = await Collection.exists({title});
			if (existe) return 'El producto ya existe';
		}
		const created = new Collection(items);
		await created.save();
		return created;
	};
	funcionFind = (collection) => {
		let Collection = collection === 'productos' ? Productos : Carrito;
		return Collection.find();
	};
	funcionFindById = async (collection, id) => {
		let Collection = collection === 'productos' ? Productos : Carrito;

		if (this.validateId(id)) {
			let found = await Collection.findById(id);
			return found || false;
		} else {
			return 'El ID no es valido.';
		}
	};
	funcionUpdate = async (collection, id, items) => {
		let Collection = collection === 'productos' ? Productos : Carrito;

		if (this.validateId(id)) {
			let updated = await Collection.findByIdAndUpdate({_id: id}, items);

			if (updated) return await Collection.findById(id);
			return false;
		} else {
			return 'El ID no es valido.';
		}
	};
	funcionDelete = async (collection, id) => {
		let Collection = collection === 'productos' ? Productos : Carrito;

		if (this.validateId(id)) {
			let removed = await Collection.findByIdAndDelete(id);
			if (removed) return 1;
			return false;
		} else {
			return 'El ID no es valido.';
		}
	};
}
