import sqlite3Options from '../configs/Sqlite3Options.js';
import Sql from './Sql.js';
const sql = new Sql(sqlite3Options);

export const db = sql;