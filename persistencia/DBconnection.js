import sqlite3Options from '../configs/Sqlite3Options.js';
import mySqlOptions from '../configs/mySqlOptions.js';
import Sql from './Sql.js';
import Memoria from './Memoria.js';
const sql = new Memoria();

export const db = sql;