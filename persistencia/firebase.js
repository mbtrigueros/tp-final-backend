import { timeStamp } from 'console';
import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require("../db/ecommerce-firebase-f156b-firebase-adminsdk-u1r4e-6bdd56aaf3.json");


export default class Firebase {
    constructor(){
	this.connection = admin;
    }
	funcionIniciarSchemas = async () => {
		let firebase = await admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: "nombre/de/tu/database",
		});

		return console.log(`Conexión exitosa a ${firebase.options.credential.projectId}`);
	};
	funcionCreate = async (objectName, items) => {
		let url = await this.connection.database().ref(objectName + "/" + items.id).push(items);
		return await this.connection.database().ref(url).once('value');
	};
	funcionFind = async (objectName) => {
		let snapshot = await this.connection
			.database()
			.ref(objectName)
			.once('value');
		return snapshot.val();
	};
	funcionFindById = async (objectName, id) => {
		let snapshot = await this.connection
			.database()
			.ref(objectName + "/" + id)
			.once('value');
		return snapshot.val();
	};

	funcionUpdate = async (objectName, id, items) => {
		await this.connection
			.database()
			.ref(objectName + "/" + id)
			.set({id: id, date: new Date().toLocaleString(), title: items.title, description: items.description, price: items.price, thumbnail: items.thumbnail, code: items.code, stock: items.stock });
		let snapshot = await this.connection
			.database()
			.ref(objectName + "/" + id)
			.once('value');
			return snapshot.val();

	};
	funcionDelete = async (objectName, id) => {
		await this.connection
			.database()
			.ref(objectName)
			.child(id)
			.remove();
		return 1;
	};
}
