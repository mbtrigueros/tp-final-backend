import knex from 'knex';

export default class Sql {
    constructor(options) {
	this.connection = knex(options);
    }
	funcionIniciarSchemas = async () => {
		try {
			await this.connection.schema.dropTableIfExists('productos');
			await this.connection.schema.createTable('productos', (table) => {
				table.string('id'),
					table.timestamp('date'),
					table.string('title'),
					table.string('description'),
                    table.decimal('price', 8, 2),
                    table.string('thumbnail'),
					table.string('code'),
					table.integer('stock');
			});
			await this.connection.schema.dropTableIfExists('carrito');
			await this.connection.schema.createTable('carrito', (table) => {
				table.string('id'), table.json('productos');
			});
			return console.log("Tablas inicializadas en: ", this.connection.client.config.client);
		} catch (error) {
			await this.connection.destroy();
			throw new Error(error.message);
		}
	};
	funcionCreate = async (tablename, items) => {
		try {
			await this.connection(tablename).insert(items);
			return await this.funcionFindById(tablename, items.id);
		} catch (error) {
			throw new Error(error.message);
		}
	};
	funcionFind = (tablename) => this.connection.from(tablename).select('*');
	funcionFindById = async (tablename, id) => {
		try {
			let found = await this.connection
				.from(tablename, id)
				.select('*')
				.where('id', '=', id);
			return found.length ? found : false;
		} catch (error) {
			throw new Error(error.message);
		}
	};
	funcionUpdate = async (tablename, id, items) => {
		try {
			let updated = await this.connection
				.from(tablename, id)
				.select('*')
				.where('id', '=', id)
				.update(items);
			if (updated) return await this.funcionFindById(tablename, id);
			return false;
		} catch (error) {
			throw new Error(error.message);
		}
	};

	funcionDelete = async (tablename, id) => {
		try {
			let removed = await this.connection
				.from(tablename, id)
				.select('*')
				.where('id', '=', id)
				.del();
                return removed || false;
		} catch (error) {
			throw new Error(error.message);
		}
	};
}