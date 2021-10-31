import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const carritoCollection = 'carrito';

const CarritoSchema = new Schema({
	timestamp: Date,
	productos: [],
});


export default mongoose.model(carritoCollection, CarritoSchema);