import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const productosCollection = 'productos';

const ProductosSchema = new Schema({
    date: {
		type: Date,
		unique: true,
        require: true
	},
	title: {
		type: String,
		unique: true,
        require: true
	},
	description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
	thumbnail: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
	stock: {
        type: Number,
        require: true
    }
});


export default mongoose.model(productosCollection, ProductosSchema);
