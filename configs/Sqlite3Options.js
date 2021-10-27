//import * as path from 'path';

const options = {
    client: 'sqlite3',
    connection: {
		filename: './db/ecommerce.sqlite',
    },
    useNullAsDefault: true
}


export default options;