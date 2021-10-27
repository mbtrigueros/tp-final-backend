//import * as path from 'path';

const options = {
    client: 'sqlite3',
    connection: {
		filename: './db/ecommerce.sqlite',
    },
    useNullAsDefault: true
}

console.log('Conectando a la base de datos Sqlite3...');

export default options;